<template>
  <div>
    <h1>Chatbot</h1>
    <div class="row">
      <div class="col-8">
        <BlocklyComponent id="blockly1" ref="chatbot">
          <block type="math_arithmetic"></block>
          <block type="math_number"></block>
        </BlocklyComponent>
      </div>
      <div class="col-4">
        Chat Screen
      </div>
    </div>
  </div>
</template>
<script>
import BlocklyComponent from '../BlocklyComponent.vue'

import BlocklyJS from 'blockly/javascript';
import './chatbot';
global.acorn = require('../../assets/js/acorn');
const JSInterpreter = require('../../assets/js/interpreter');

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

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
    evalCode() {
      this.program = BlocklyJS.workspaceToCode(this.$refs["chatbot"].workspace);
      console.log(this.program)

      var program = this.program
      var runner = null

      // Begin execution
      var myInterpreter = new JSInterpreter.Interpreter(program, this.initFunc);
      runner = function() {
        if (myInterpreter) {
          var hasMore = myInterpreter.run(this);
          if (hasMore) {
            // Execution is currently blocked by some async call.
            // Try again later.
            setTimeout(runner, 1000);
          } else {
            // Program is complete.
            console.log("Complete")
          }
        }
      };
      runner();
      return;
    }

  }
}
</script>