<template>
  <div id="app" :style="themeStyle">
    <transition mode="out-in" name="fade">
      <router-view />
    </transition>
  </div>
</template>

<script>
"use strict"

import { mapGetters } from "vuex"

export default {
  name: "App", //AIzaSyBG6bZdJIi5FPQb0GzChTXtNPMjNCNjDcM //AIzaSyC5geMNG5GRgdEyep0MeHCpQt5gavB5aX4

  methods: {
    dynamicScrollbarWorkaround(trackColour, thumbColour) {
      let link = document.createElement("style");
      link.id = "custom-scroll";
      link.innerHTML = `::-webkit-scrollbar {background: ${trackColour};} ::-webkit-scrollbar-thumb {background: ${thumbColour};};`;
      let curID = document.getElementById("custom-scroll");
      if (curID == undefined) document.head.append(link);
      else curID.innerHTML = link.innerHTML;
    },
  },

  computed: {
    ...mapGetters(["theme"]),

    themeStyle() {
      document.body.style = `background: ${this.theme.background};`;
      this.$vs.setColor("primary", this.theme.accent);
      this.dynamicScrollbarWorkaround(this.theme.background, this.theme.accent);
      return {
        "--themeBackground": this.theme.background,
        "--themeText": this.theme.text,
        "--buttonText": "white",
        "--titleColour": "white",
        "--accentColour": this.theme.accent
      };
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  padding: 2em;
}

#navButton {
  position: absolute;
}

html { overflow-y: hidden !important; } /* removes second scrollbar bug on custom-electron-titlebar */

</style>
