<template>
  <div>
    <h1>Chatbot</h1>
    <div class="row">
      <div class="col-8">
        <BlocklyComponent id="blockly1" ref="chatbot">
          <block type="dice"></block>
          <block type="pregunta"></block>
          <block type="si"></block>
<!--           <block type="text"></block> -->      
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
    <br>
    <div class="row">
      <div class="col-12">
        <b-tabs pills card vertical>
          <b-tab title="Part Uno" active>
            <div align="left">
              <b>Primero</b>
              <br>
              <ol>
                <li>
                  To start, lets make a simple chatbot that just responds with "hola!" by dragging over the 'dice' block into the workspace. Try typing a message and sending it by pressing the "Envie Mensaje". Does the bot respond with "hola"?
                </li>
                <li>
                  Next, lets drag over a 'pregunta' block and connect it to the bottom of the 'dice' block. The bot should now always respond with "hola" and then ask you "que?".
                </li>
              </ol>
            </div>
          </b-tab>
          <b-tab title="Part Dos">
            <div align="left">
              <b>Segundo</b>
              <br>
              <ol>
                <li>
                  Lets make our bot a little smarter. Drag over the "si ... entonces" block. This block lets us respond to messages that meet the conditions specified inside the block. We can use the `contiene ...` block to check if the sent message contains a phrase, and respond accordingly. Using the 'si ... entonces' block, the 'contiene ...' block, and the 'dice' block, make a bot that responds with "hola" only if the sent message contains "hola".
                </li>
                <li>
                  Next lets try the 'si ... entonces ... si no ...' block. This block lets us respond in one way if the si condition is met, and another way in any other case. Lets use this block to make a bot that responds with "hola" only if the sent message contains "hola", and in any other case responds "que?".
                </li>
              </ol>
            </div>
          </b-tab>
          <b-tab title="Part Tres">
            <div align="left">
              <b>Tercero</b>
              <br>
              <ol>
                <li>
                  We can use the '... y ...' as the condition in a 'si ... entonces' block with two 'contiene ...' blocks to respond only if the sent message contains two words. For example, with the code 'si contiene "gato" y contiene "perro" entonces dice "me gustan los dos"', your bot will respond to any message that contains "gato" and "perro". Go ahead and try it now, using any two words!
                </li>
                <li>
                  We can use the '... o ...' as the condition in a 'si ... entonces' block with two 'contiene ...' blocks to respond only if the sent message contains either word. For example, with the code 'si contiene "verde" o contiene "rojo" entonces dice "mi color favorito"', your bot will respond to any message that contains "verde" or "rojo". Go ahead and try it now, using any two words! What happens if you use both the words in a message?
                </li>
                <li>
                  The 'no ...' block used with the 'contiene ...' block lets us respond to messages that do not contain certain words. Using the same strategy as before, can you make a bot that responds with "odio las papas" to everything except a message that contains "papas". 
                </li>
              </ol>
            </div>
          </b-tab>
          <b-tab title="Part Cuatro">
            <div align="left">
              <b>Finalmente</b>
              <br>
              <ol>
                <li>
                  Desafío: You can use multiple 'si ... entonces' blocks to make a really complicated bot. Can you make a bot that can respond to multiple different messages? How realistic a bot can you make?
                </li>
                <li>
                  Desafío: You can nest the different logic blocks ("y", "o", and "no") to respond to more conditions. How would you make a 'si ... entonces' block that only responds if a message is sent that doesn't contain "país", OR contains "ciudad" and "pueblo"?
                </li>
              </ol>
            </div>
          </b-tab>
        </b-tabs>
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
#blockly1 {
  position: relative;
  width: 100%;
  height: 500px;
}
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