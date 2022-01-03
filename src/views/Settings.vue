<template>
  <div>
    <vs-button id="navButton" @click="$router.back()">
      <i class="fas fa-arrow-left" style="margin-right: 0.5em;"></i> Back
    </vs-button>
    <h1 class="title">Settings</h1>

    <br />

    <p class="subtitle">Google Cloud TTS API Key</p>
    <div class="settingsBox">
      <vs-input type="text" primary :vs-theme="theme.name" placeholder="Enter key here..." v-model="apiKeyTTS"/>
    </div>

    <br />

    <p class="subtitle">Google Cloud Vision API Key</p>
    <div class="settingsBox">
      <vs-input type="text" primary :vs-theme="theme.name" placeholder="Enter key here..." v-model="apiKeyVision"/>
    </div>

    <p id="creds">

    </p>
  </div>
</template>

<script>
"use strict"

import { mapGetters } from "vuex"

export default {
  name: "Settings",

  computed: {
    ...mapGetters(["theme"]),
    apiKeyTTS: {
      get() {
        return this.$store.getters.apiKeyTTS;
      },
      set(val) {
        this.$store.dispatch("setApiKeyTTS", val);
      }
    },
    apiKeyVision: {
      get() {
        return this.$store.getters.apiKeyVision;
      },
      set(val) {
        this.$store.dispatch("setApiKeyVision", val);
      }
    },
  }
}
</script>

<style scoped>

.settingsBox {
  display: flex;
  flex-direction: row;
  justify-content: center;
} 

.subtitle {
  margin-bottom: 0.5em;
}

.vs-input-parent >>> .vs-input {
  width: 25em;
}

#creds {
  position: absolute;
  bottom: 0%;
  width: 100%;
  left: 50%;
  transform: translate(-50%, 0%);
  color: rgb(65, 64, 64);
}

</style>