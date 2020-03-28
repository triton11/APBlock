<template>
  <div>
    <h1>Welcome to AP Block</h1>
    <h2> {{greeting}}, {{name}} </h2>
    <div class="row">
      <div class="col-8">
        <BlocklyComponent id="blockly1" ref="foo">
          <block type="set_greeting"></block>
          <block type="set_name"></block>
        </BlocklyComponent>
      </div>
      <div class="col-4" align="center">
        <p id="code">
          <b-button size="lg" variant="primary" v-on:click="evalCode()">Run Code</b-button>
        </p>
      </div>
    </div>
    <br>
    <div class="row">
      <div class="col-12">
        <h2>Instructions</h2>
      </div>
    </div>
    <br>
    <div class="row">
      <div class="col-10 offset-1">
        <ol align="left">
          <li>
            Each lab has a "block library" on the left where all the blocks for the lab are stored. You can use any block multiple times!
          </li>
          <br>
          <li>
            Directly to the right of the "block library" is the "workspace". Drag blocks here and connect them like puzzle pieces to make stacks of code! The code is always read in order from top to bottom, and gets run whenever the lab's "run code" button is pressed (this button may look different depending on the lab).
          </li>
          <br>
          <li>
            Try it out! Drag over the "set greeting to ..." and "set name to ..." blocks from the block library into the workspace and press run code!
          </li>
          <br>
          <li>
            The lab instructions can be found at the bottom of the lab. Each lab has multiple sections. Please follow each lab instructions in order, and if you run into any bugs or problems send me an email (tristrumtuttle@gmail.com)
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
import BlocklyComponent from './BlocklyComponent.vue'

import BlocklyJS from 'blockly/javascript';
import './blockcomponents/print';
import './blockcomponents/set_greeting';

export default {
  name: 'app',
  components: {
    BlocklyComponent
  },
  data(){
    return {
      code: '',
      greeting: "Greeting",
      name: "Name"
    }
  },
  methods: {
    
    evalCode() {
      // function parse(str) {
      //   return Function(`'use strict'; return (${str})`)()
      // }
      this.code = BlocklyJS.workspaceToCode(this.$refs["foo"].workspace);
      try {
        eval(this.code);
      } catch (e) {
        alert(e);
      }
    }
  }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
html, body {
  margin: 0;
}

#blockly1 {
  position: relative;
  width: 100%;
  height: 300px;
}
#blockly2 {
  position: relative;
  width: 100%;
  height: 500px;
}
#monitor {
  height: 500px;
}
</style>