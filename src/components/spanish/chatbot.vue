<template>
  <div>
    <h1>Chatbot</h1>
    <div class="row">
      <div class="col-8">
        <BlocklyComponent id="blockly1" ref="chatbot">
          <block type="text"></block>
          <block type="dice"></block>
          <block type="pregunta"></block>
          <block type="si"></block>
          <block type="contiene"></block>
          <block type="si_no"></block>
          <block type="y_logic"></block>
          <block type="o_logic"></block>
          <block type="no_logic"></block>
        </BlocklyComponent>
      </div>
      <div class="col-4">
        <div class="card overflow-auto" id="chatScreen">
          <div v-for="item in getMessages" :key="item.message">
            <h4  v-if="item.sender==='bot'" align='left'>
              <b-badge pill variant="primary"> {{ item.text }} </b-badge>
            </h4>
            <h4  v-else align='right'>
              <b-badge pill variant="success"> {{ item.text }} </b-badge>
            </h4>
          </div>
        </div>
        <b-form-textarea v-model="message" placeholder="Type message here..."></b-form-textarea>
        <b-button size="md" variant="primary" v-on:click="evalCode()" id="sendMessage"> 
        Envíe Mensaje</b-button>
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

const store = new Vuex.Store({
  state: {
    messages: [{sender:'bot', text:'¡Hola! Soy Bot.'}]
  },
  getters: {
    getMessages: (state) => {
      return state.messages
    },
    getLastMessageText: (state) => () => {
      var playerMessages = state.messages.filter(function(el) {return el.sender === 'you'})
      return playerMessages[playerMessages.length - 1].text
    }
  },
  mutations: {
    addMessage (state, message) {
      state.messages.push(message)
    }
  }
})

export default {
  name: 'app',
  components: {
    BlocklyComponent
  },
  data(){
    return {
      code: '',
      message: this.message
    }
  },
  methods: {
    initFunc: function(interpreter, globalObject) {

      function initInterpreterWaitForSeconds(interpreter, scope) {
        var wrapper = interpreter.createAsyncFunction(
          function(timeInSeconds, callback) {
            // Delay the call to the callback.
            setTimeout(callback, timeInSeconds * 1000);
          });
        interpreter.setProperty(scope, 'waitForSeconds', wrapper);
      }

      var botMessageWrapper = function(message) {
        store.commit('addMessage', {sender:'bot', text: message})
      }

      interpreter.setProperty(globalObject, 'botMessage',
          interpreter.createNativeFunction(botMessageWrapper));

      var checkContainsWrapper = function(text) {
        return store.getters.getLastMessageText().includes(text);
      }

      interpreter.setProperty(globalObject, 'botMessage',
          interpreter.createNativeFunction(botMessageWrapper));

      interpreter.setProperty(globalObject, 'checkContains',
          interpreter.createNativeFunction(checkContainsWrapper));

      initInterpreterWaitForSeconds(interpreter, globalObject);
    },

    evalCode() {
      this.program = BlocklyJS.workspaceToCode(this.$refs["chatbot"].workspace);
      console.log(this.program)
      store.commit('addMessage', {sender:'you', text: this.message})
      this.message = ''

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
  },
  computed: {
    getMessages () {
      return store.getters.getMessages
    }
  }
}
</script>
<style scoped>
#chatScreen {
  position: relative;
  width: 100%;
  height: 380px;
  padding: 5px;
  margin-bottom: 10px;
}
#sendMessage {
  margin-top: 10px;
}
</style>