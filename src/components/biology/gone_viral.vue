<template>
  <div>
    <h1>Gone Viral</h1>
    <div class="row">
      <div class="col-8">
        <BlocklyComponent id="blockly1" ref="viral">
          <block type="set_days"></block>
          <block type="meet_people"></block>
          <block type="random_infect"></block>
          <block type="draw_people"></block>
          <block type="repeat_person"></block>
          <block type="repeat_days"></block>

          <!-- <block type="if_person"></block>
          <block type="get_person_attribute"></block>
          <block type="logic_compare"></block>
          <block type="math_number"></block> -->
        </BlocklyComponent>
      </div>
      <div class="col-4">
        <h4>Day {{currentDay}} out of {{maxDays}}</h4> 
        <canvas id="myCanvas" width="400" height="400">
        </canvas>
        <h4>{{totalInfected}} out of 80 infected</h4> 
      </div>
    </div>
    <br>
    <p id="code">
      <b-button size="lg" variant="primary" v-on:click="evalCode()">Run Simulation</b-button>
    </p>

  </div>
</template>

<script>
import BlocklyComponent from '../BlocklyComponent.vue'
import BlocklyJS from 'blockly/javascript';

import './gone_viral.js';

global.acorn = require('../../assets/js/acorn');
const JSInterpreter = require('../../assets/js/interpreter');

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    maxDays: 0,
    currentDay: 0,
    immunity: 50,
    people: [],
    nextInfected: []
  },
  getters: {
    getAttr: (state) => (attr) => {
      return state[attr]
    },
    getImmunity: (state) => () => {
      return state.immunity
    },
    getPeople: (state) => () => {
      return state.people
    },
    getNextInfected: (state) => () => {
      return state.nextInfected
    },
    getPerson: (state) => (ind) => {
      return state.people[ind]
    }


  },
  mutations: {
    resetState(state) {
      state.people = []
      state.nextInfected = []
    },
    initPerson (state, person) {
      state.people.push(person)
    },
    changePersonStatus(state, payload) {
      state.people[payload.age]['condition'] = payload.condition
    },
    change (state, payload) {
      state[payload.attr] = payload.amount
    },
    addNextInfected (state, payload) {
      state.nextInfected.push(payload.age)
    },
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
    }
  },
  methods: {
    initFunc: function(interpreter, globalObject) {

      function initInterpreterWaitForMilliseconds(interpreter, scope) {
        var wrapper = interpreter.createAsyncFunction(
          function(timeInMilliseconds, callback) {
            // Delay the call to the callback.
            setTimeout(callback, timeInMilliseconds * 1);
          });
        interpreter.setProperty(scope, 'waitForMilliseconds', wrapper);
      }

      initInterpreterWaitForMilliseconds(interpreter, globalObject);

      var infectPerson = function(age) {
        store.commit({type: 'changePersonStatus', age: age, condition: 'sick'})
      }

      var randomInfect = function() {
        var randomAge = Math.floor(Math.random() * 80)
        infectPerson(randomAge)
      }

      // var alphaSort = function(a, b){
      //   var nameA=a.condition.toLowerCase(), nameB=b.condition.toLowerCase()
      //   if (nameA < nameB) //sort string ascending
      //       return 1 
      //   if (nameA > nameB)
      //       return -1
      //   return 0 //default return value (no sorting)
      // }

      var drawPeople = function() {
        var peopleSorted = store.getters.getPeople().slice()
        //.sort(alphaSort)
        for (var y = 0; y < peopleSorted.length; y += 8) {
          for (var x = 0; x < 8; x += 1) {
            var i = y + x
            var person = peopleSorted[i]

            if (person.condition == 'sick') {
              Vue.prototype.$ctx.fillStyle="#FF0000";
            } else {
              Vue.prototype.$ctx.fillStyle="#0000ff";
            }
            Vue.prototype.$ctx.beginPath();
            Vue.prototype.$ctx.arc(x*50+20, y*5+10, Math.ceil(person.age/20)+2, 0, Math.PI*2, true);
            Vue.prototype.$ctx.closePath();
            Vue.prototype.$ctx.fill();
          }
        }
      }

      var drawWrapper = function() {
        Vue.prototype.$ctx.clearRect(0,0, Vue.prototype.$canvas.width, Vue.prototype.$canvas.height)
        drawPeople();
      }

      interpreter.setProperty(globalObject, 'draw',
          interpreter.createNativeFunction(drawWrapper));

      var vueGetWrapper = function(attr) {
        return store.getters.getAttr(attr)
      };

      interpreter.setProperty(globalObject, 'vueGet',
          interpreter.createNativeFunction(vueGetWrapper));

      var vueGetPersonWrapper = function(ind, attr) {
        return store.getters.getPerson(ind)[attr]
      };

      interpreter.setProperty(globalObject, 'vueGetPerson',
          interpreter.createNativeFunction(vueGetPersonWrapper));

      var randomInfectWrapper = function() {
        randomInfect();
      };

      interpreter.setProperty(globalObject, 'randomInfect',
          interpreter.createNativeFunction(randomInfectWrapper));

      var vueSetWrapper = function(attr, set_value) {
        store.commit({type: 'change', attr: attr, amount: set_value})
      };

      interpreter.setProperty(globalObject, 'vueSet',
          interpreter.createNativeFunction(vueSetWrapper));

      var meetPeopleWrapper = function(number, age) {
        for (var n = 0; n < number; n++) {
          var randomAgeMeet = Math.floor(Math.random() * 80)
          if (store.getters.getPerson(randomAgeMeet).condition === 'sick') {
            var randomNum = Math.floor(Math.random() * 100)
            if (randomNum < store.getters.getAttr('immunity')) {
              store.commit({type: 'addNextInfected', age: age})
            }
          }
        }
      };

      interpreter.setProperty(globalObject, 'meetPeople',
          interpreter.createNativeFunction(meetPeopleWrapper));

      var updateSickWrapper = function() {
        var sickPeople = store.getters.getNextInfected().slice()
        for (var s = 0; s < sickPeople.length; s += 1) {
          store.commit({type: 'changePersonStatus', age: sickPeople[s], condition: 'sick'})
        }
      };

      interpreter.setProperty(globalObject, 'updateSick',
          interpreter.createNativeFunction(updateSickWrapper));

    },

    evalCode() {
      this.program = BlocklyJS.workspaceToCode(this.$refs["viral"].workspace);
      console.log(this.program)
      store.commit('resetState')
      for (var i = 0; i < 80; i += 1) {
        store.commit('initPerson', {age: i, condition: 'healthy'})
      }

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
            setTimeout(runner, 10);
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
  mounted: function() {
    this.canvas = document.getElementById("myCanvas");
    Vue.prototype.$canvas = document.getElementById("myCanvas");
    Vue.prototype.$ctx = this.canvas.getContext('2d');
  },
  computed: {
    maxDays () {
      return store.state.maxDays
    },
    currentDay () {
      return store.state.currentDay
    },
    totalInfected () {
      return store.state.people.filter((p) => p.condition === 'sick').length
    }
  }
}
</script>