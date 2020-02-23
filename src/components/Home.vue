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
      <div>
        <p id="code">
          <b-button size="lg" variant="primary" v-on:click="evalCode()">Run Code</b-button>
        </p>
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
  height: 500px;
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