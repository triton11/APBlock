<template>
  <div>
    <h1>Playground</h1>
    <BlocklyComponent id="blockly1" ref="foo">
      <block type="controls_ifelse"></block>
      <block type="logic_compare"></block>
      <block type="logic_operation"></block>
      <block type="controls_repeat_ext">
          <value name="TIMES">
              <shadow type="math_number">
                  <field name="NUM">10</field>
              </shadow>
          </value>
      </block>
      <block type="logic_operation"></block>
      <block type="logic_negate"></block>
      <block type="logic_boolean"></block>
      <block type="logic_null" disabled="true"></block>
      <block type="logic_ternary"></block>
      <block type="text_charAt">
          <value name="VALUE">
              <block type="variables_get">
                  <field name="VAR">text</field>
              </block>
          </value>
      </block>
      <block type="text"></block>
      <block type="text_length"></block>
      <block type="text_print"></block>
      <block type="math_number"></block>
    </BlocklyComponent>
    <p id="code">
      <button v-on:click="evalCode()">Run Code</button>
    </p>
  </div>
</template>

<script>
import BlocklyComponent from '../BlocklyComponent.vue'

import BlocklyJS from 'blockly/javascript';

export default {
  name: 'app',
  components: {
    BlocklyComponent
  },
  data(){
    return {
      code: '',
    }
  },
  methods: {
    print_out() {
      console.log(this.code)
    },
    evalCode() {
      // function print_out(stuff) {
      //   return stuff;
      // }
      function parse(str) {
        document.getElementById("header");
        return Function(`'use strict'; return (${str})`)()
      }
      this.code = BlocklyJS.workspaceToCode(this.$refs["foo"].workspace);
      try {
        parse(this.code);
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
</style>