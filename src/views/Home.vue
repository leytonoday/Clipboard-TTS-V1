<template>
    <div>
    <vs-button id="navButton" @click="$router.push('/settings')">
      <i class="fas fa-cog" style="margin-right: 0.5em;"></i> Settings
    </vs-button>
    <vs-button id="helpNavButton" @click="$router.push('/help')">
      <i class="fas fa-question-circle" style="margin-right: 0.5em; right: 0;"></i> Help
    </vs-button>
    <h1 class="title">Clipboard TTS</h1>

    <div v-if="!apiKeyTTS || !apiKeyVision" style="text-align: left" >
      <vs-alert color="warn">
        <template #title>
        Notice: Set your API Keys
        </template>
        Before you can use this application, you must provide your API keys. Go to the Help page to get started.
      </vs-alert>
      <br/>
    </div>

    <!-- Left Box: Controls -->
    <div class="pageBox" style="float: left">
      <p class="subtitle">Controls</p>
      <div class="controlsBox">

        <!-- Enabled and Stop Inputs -->
        <div>
          <p>Enable / Disable / Stop Clipboard TTS</p>
          <div class="innerControlBox">
            <vs-switch class="centre" style="width: 45%; padding: 1.05em" :disabled="!apiKeyTTS || !apiKeyVision" square :vs-theme="theme.name" v-model="enabledChoice">
              <template #off> DISABLED </template>
              <template #on> ENABLED </template>
              <template #circle>
                <i v-if="!enabledChoice" class="fas fa-times"></i>
                <i v-else class="fas fa-check"></i>
              </template>
            </vs-switch>
            <vs-button class="centre" style="width: 45%" :disabled="!currentlySpeaking" @click="stopSay">
              Stop Speech
            </vs-button>
          </div>
        </div>

        <!-- Language and Speed Settings --> 
        <div class="controlBox">
          <div class="innerControlBox">
            <div>
              <p style="margin-bottom: 0.3em">Language</p>
              <vs-select :disabled="!enabledChoice || currentlySpeaking" v-model="languageCode" :vs-theme="theme.name">
                <vs-option v-for="lang in Object.keys(languageCodes)" :key="lang" :label="languageCodes[lang]" :value="lang">
                  {{ languageCodes[lang] }}
                </vs-option>
              </vs-select>
            </div>
            <div>
              <p style="margin-bottom: 0.3em">Speed</p>
              <vs-select :disabled="!enabledChoice || currentlySpeaking" v-model="speedSlider" :vs-theme="theme.name">
                <vs-option v-for="speed in Object.keys(speedSliderMarks)" :key="speed" :label="speed" :value="speedSliderMarks[speed]">
                  {{ speed }}
                </vs-option>
              </vs-select>
            </div>
          </div>
        </div>
        
        <!-- Volume Settings --> 
        <div class="controlBox">
          <p>Volume</p> 
          <vue-slider :dragOnClick="true" tooltip="none" :disabled="!enabledChoice || currentlySpeaking" v-model="volumeSlider" :marks="true" :data="volumeSliderMarks"/>
        </div>

        <!-- Mode Settings --> 
        <div class="controlBox">
          <p>Mode</p>
          <div class="innerControlBox">
            <vs-radio :disabled="!enabledChoice || currentlySpeaking" v-model="modeRadioValue" val="1">
              Default TTS
            </vs-radio>
            <vs-radio :disabled="!enabledChoice || currentlySpeaking" v-model="modeRadioValue" val="2">
              Dictionary TTS
            </vs-radio>
          </div>
        </div>

        <!-- Gender Settings --> 
        <div class="controlBox">
          <p>Gender</p>
          <div class="innerControlBox">
            <vs-radio :disabled="!enabledChoice || currentlySpeaking" v-model="genderRadioValue" val="MALE">
              Male
            </vs-radio>
            <vs-radio :disabled="!enabledChoice || currentlySpeaking" v-model="genderRadioValue" val="FEMALE">
              Female
            </vs-radio>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Box: Output -->
    <div class="pageBox" style="float: right">
      <p class="subtitle">Output</p>
      <div class="clipboardBox">
        <p>{{ loadingTTS ? "Loading..." : outputText }}</p>
      </div>
    </div>
    </div>
</template>

<script>
"use strict"

import { languageCodes }from "../data/commonData.json"
import { ipcRenderer }  from "electron"
import { mapGetters }   from "vuex"
import { clipboard }    from "electron"
import VueSlider        from "vue-slider-component"
import axios            from "axios"

import "vue-slider-component/theme/antd.css"

export default {
  name: "Home",

  components: {
    "vue-slider": VueSlider,
  },

  // Load the api keys from the electron-store, initiate the checkForClipboardChanges recursive function, and set the handlers for shortcuts
  created() { 
    this.$store.dispatch("loadApiKeyTTS")
    this.$store.dispatch("loadApiKeyVision")
    this.checkForClipboardChanges()
    ipcRenderer.on("EnableToggled", this.toggleEnabled)
    ipcRenderer.on("ModeToggled", this.toggleMode)
  },

  // Remove shortcut handles on leave. They are re-added when you re-enter this page. So only shortcuts can be used on the Home page
  beforeDestroy() {
    ipcRenderer.removeListener("EnableToggled", this.toggleEnabled)
    ipcRenderer.removeListener("ModeToggled", this.toggleMode)
  },
  
  watch: { 
    enabledChoice(value) {
      if (value)
        this.readInitClipboardData()
    }
  },

  computed: {
    ...mapGetters(["theme", "apiKeyTTS", "apiKeyVision"]),
  },

  // TTS is disabled upon going to the settings or help pages
  beforeRouteLeave(to, from, next) { 
    this.enabledChoice = false;
    next();
  },

  data() {
    return {
      currentlySpeaking: false,
      enabledChoice: false,
      loadingTTS: false,
      outputText: "",
      audio: null,
      oldClipboardData: null, 

      modeRadioValue: "1",
      genderRadioValue: "MALE",
      
      speedSlider: 1,
      speedSliderMarks: {"x0.25": 0.25, "x0.5": 0.5, "x0.75": 0.75, "Normal": 1, "x1.25": 1.25, "x1.5": 1.5, "x1.75": 1.75, "x2": 2},
      
      volumeSlider: "100%",
      volumeSliderMarks: {"25%": -10, "50%": -3, "100%": 0, "150%": 6, "200%": 12},
      
      languageCode: "en-US",
      languageCodes,

      CLIPBOARD_CHECK_INTERVAL: 1000
    }
  },

  methods: {
    // Called only when the shortcuts are pressed
    toggleEnabled() {
      this.enabledChoice = !this.enabledChoice
      this.say(this.enabledChoice ? "Enabled": "Disabled", true)
    },

    // Called only when the shortcuts are pressed
    toggleMode() {
      this.modeRadioValue = this.modeRadioValue == "1" ? "2" : "1"; 
      this.say(this.modeRadioValue == "1" ? "Default Mode": "Dictionary Mode", true)
    },

    async getWordDefinition(word) {
      try {
        const reply = (await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/${this.languageCode.split("-")[0]}/${word}`)).data[0].meanings
        let output = ""
        for(let meaning of reply) 
          output += `${meaning.partOfSpeech ? meaning.partOfSpeech + ":" : ""} ${meaning.definitions[0].definition}\n`
      return output;
      } catch (e) { // undefined
        return null;
      }
    },

    // audioContent is the data returned from the call to the google tts api
    playSayAudioContent(audioContent) {
      this.audio = new Audio("data:audio/ogg;base64," + audioContent)
      this.audio.addEventListener("ended", () => {
        this.currentlySpeaking = false
        this.outputText = ""
      })
      this.audio.play()
    },

    handleInvalidAPIKey() {
      this.$vs.notification({ sticky: true, duration: 5000, color: "danger", progess: "auto", position: "bottom-right", text: "Invalid TTS API Key", icon: '<i class="fas fa-bug"></i>'})
      this.loadingTTS = false
      this.currentlySpeaking = false
      this.outputText = ""
    },

    // Removes all punctuation from a piece of text. This is to prevent punctuation from receiving a word definition
    removePunctuation(text) { 
      return text.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");
    },

    // Says/Speaks the text
    async say(text, isAnnouncement) {
      if (!text) return
      text = text.trim()

      if (text.length > 2000) 
        text = "Error: Character limit of 2000 exceeded"

      if (this.modeRadioValue === "2" && !isAnnouncement) {
        if (text.split(" ").length > 3) {
          text = "Error: In dictionary mode 3 word limit exceeded"
        }
        else 
          text = `${this.removePunctuation(text)}: ${ await this.getWordDefinition(this.removePunctuation(text)) || "Could not find a definition"}`
      }
      
      try {
        this.loadingTTS = true

        const audioReply = await axios.post(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${this.apiKeyTTS}`, {
            input: { text},
            voice: { languageCode: this.languageCode, ssmlGender: this.genderRadioValue },
            audioConfig: {
              audioEncoding: "OGG_OPUS",
              speakingRate: this.speedSlider,
              volumeGainDb: this.volumeSliderMarks[this.volumeSlider]
            },
          }
        )
        this.outputText = text
        this.currentlySpeaking = true

        this.loadingTTS = false

        this.playSayAudioContent(audioReply.data.audioContent)

      } catch (e) {
        console.log(e)
        // usually occurs when an invalid API key is provided
        this.handleInvalidAPIKey()
      }
    },

    async imageToText(input) {
      try {
        this.loadingTTS = true
        const reply = await axios.post(`https://vision.googleapis.com/v1/images:annotate?key=${this.apiKeyVision}`, {
        requests: [{
            image: {content: input.substring(22)}, // remove the data:image/png;base64 from the beginning of the base64 encoded image data
            features: {
              type: "TEXT_DETECTION",
              maxResults: 1
            }},
          ]
        })
        return reply.data.responses[0].fullTextAnnotation.text
      } catch (e) {
        console.log(e)
        this.$vs.notification({ sticky: true, duration: 5000, color: "danger", progess: "auto", position: "bottom-right", text: "Invalid Vision API Key", icon: '<i class="fas fa-bug"></i>'})
        this.loadingTTS = false
      }
    },

    readInitClipboardData() { // used so it doesn't read out whatever is in the clipboard upon clicking enable
      this.oldClipboardData = clipboard.read("clipboard")
      switch (clipboard.availableFormats("clipboard")[0]) {
        case "text/plain": {
          this.oldClipboardData = clipboard.readText("clipboard")
          break
        }
        case "image/png": {
          this.oldClipboardData = clipboard.readImage("clipboard").toDataURL()
          break
        }
        default:
          break
      }
    },

    stopSay() {
      this.audio.pause()
      this.audio.currentTime = 0
      this.outputText = ""
      this.currentlySpeaking = false
    },

    // Read the data from the clipboard, either image to base64 string, or to string. This then calls say
    async readClipboardData() {
      let newClipboardData = undefined
      let textToSay = undefined

      if (clipboard.availableFormats("clipboard").includes("text/plain")) {
        newClipboardData = clipboard.readText("clipboard")
        if (this.oldClipboardData === newClipboardData)
          return
        
        textToSay = newClipboardData
      }
      else if (clipboard.availableFormats("clipboard").includes("image/png")) {
        newClipboardData = clipboard.readImage("clipboard").toDataURL()
        if (this.oldClipboardData === newClipboardData)
          return

        textToSay = await this.imageToText(newClipboardData)
      }

      await this.say(textToSay)
      this.oldClipboardData = newClipboardData
    },

    async checkForClipboardChanges() {
      if (this.enabledChoice && !this.currentlySpeaking)
        await this.readClipboardData()
      setTimeout(() => this.checkForClipboardChanges(), this.CLIPBOARD_CHECK_INTERVAL)
    },
  }
}
</script>

<style scoped>
.pageBox {
  width: 48%;
  height: 24em;
}

.clipboardBox {
  border-radius: 0.8em;
  background: rgb(65, 64, 64);
  padding: 2em;
  color: white;
  text-align: left;
  border: grey 1px solid;
  overflow-wrap: break-word;
  height: 33.5em;
  overflow-y: auto;
  -webkit-box-shadow: 0px 10px 13px -7px #000000,
    0px 0px 18px 8px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 10px 13px -7px #000000, 0px 0px 18px 8px rgba(0, 0, 0, 0.3);
  margin-bottom: 2em;
}

.controlsBox {
  border: grey 1px solid;
  padding: 2em;
  border-radius: 0.8em;
  height: 33.5em;
  -webkit-box-shadow: 0px 10px 13px -7px #000000,
    0px 0px 18px 8px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 10px 13px -7px #000000, 0px 0px 18px 8px rgba(0, 0, 0, 0.3);
  color: white !important;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 2em;
}

.controlBox {
  width: 100%;
}

.innerControlBox {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.vs-radio__label {
  color: white !important;
}

.vue-slider >>> .vue-slider-process {
  background-color: var(--accentColour);
}

.vue-slider >>> .vue-slider-dot-handle {
  border: 2px solid var(--accentColour);
}

.vs-input-parent >>> .vs-input {
  width: 25em;
}

#helpNavButton {
  position: absolute;
  right: 2em;
}

</style>