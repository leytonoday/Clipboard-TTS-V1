<template>
  <div>
    <vs-button id="navButton" @click="$router.back()">
      <i class="fas fa-arrow-left" style="margin-right: 0.5em;"></i> Back
    </vs-button>
    <h1 class="title">Help</h1>
    <br />

    <div class="infoBoxOuter">
      <div class="infoBoxHeader">
        General Usage
      </div>
      <div class="infoBoxBody">
        Clipboard TTS is here to do the hard work for you, and read aloud any text you want! This application will wait for changes int he clipboard, 
        and read it out. Simply <b>copy the text and it will be read aloud</b>. You can also screenshot the text, or even copy an image containing text, and it will also be read 
        aloud almost instantly (depending upon your internet speed).
        It works with <b>52</b> languages, so almost all literature is suitable for this application. 
        You have full control over the settings of the TTS using the Controls on the Home page. Ensure to make use of the nifty shortcuts that make
        using this application much easier when studying. 
        An internet connection and API keys are required to use this application. See the section below for more information. 
        <br /> <br />
        Once you have the API keys, you are good to go. Switch the "Enable" switch, and the program will start detecting changes
        in your clipboard. Once a change is detected, it will scan for text. If an image is provided, it will scan the image for text also.
        This text will then be read aloud for you to hear. You can switch the language, gender, speed and, volume of the voice. 
        <br /> <br />
        There are two modes in which this application runs: "Default TTS" and "Dictionary TTS". Default TTS will just read out any text it finds in the 
        clipboard, and Dictionary TTS will look up the meaning of a selected word, and read it aloud. 
      </div>
    </div>

    <br />
    <br />

    <div class="infoBoxOuter">
      <div class="infoBoxHeader">
        API Keys
      </div>
      <div class="infoBoxBody">
        To use this application, you must aquire API Keys to both the Google Cloud Text-To-Speech API (https://cloud.google.com/text-to-speech), and 
        the Google Cloud Vision API (https://cloud.google.com/vision). 
        <br/>
        Simply input your API keys into the Settings page, and the application will work like magic.
      </div>
    </div>

    <br />
    <br />

    <div class="infoBoxOuter">
      <div class="infoBoxHeader">
        Shortcuts
      </div>
      <div class="infoBoxBody">
        <b>Toggle TTS:</b> Control + [
        <br/>
        <b>Toggle between "Default TTS" and "Dictionary TTS":</b> Control + ]
      </div>
    </div>

    <br />
    <br />

    <div class="infoBoxOuter">
      <div class="infoBoxHeader">
        Creds
      </div>
      <div class="infoBoxBody">
      <b>Author:</b> Leyton O'Day
      <br/>
      <b>Github:</b> https://github.com/leytonoday
      <br/>
      <b>Email:</b> leytonodayabc123@gmail.com
      </div>
    </div>
  </div>
</template>

<script>
"use strict"

export default {
  name: "Help",
}
</script>

<style scoped>
.infoBoxOuter {
  border: grey 1px solid;
  border-radius: 0.8em;
  color: white;
  -webkit-box-shadow: 0px 10px 13px -7px #000000,
  0px 0px 18px 8px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 10px 13px -7px #000000, 0px 0px 18px 8px rgba(0, 0, 0, 0.3);
}

.infoBoxHeader {
  background: rgb(65, 64, 64);
  border-top-right-radius: 0.6em;
  border-top-left-radius: 0.6em;
  padding: 0.3em;
  font-weight: 700;
  font-size: 1.2em;
}

.infoBoxBody {
  padding: 1em;
  text-align: left;
}

</style>