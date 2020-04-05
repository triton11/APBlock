<template>
  <div>
    <h1>Gone Viral</h1>
    <div class="row">
      <div class="col-8">
        <BlocklyComponent id="blockly1" ref="viral">
          <block type="set_days"></block>
          <block type="set_immunity"></block>
          <block type="meet_people"></block>
          <block type="random_infect"></block>
          <!-- <block type="draw_people"></block> -->
          <block type="repeat_person"></block>
          <block type="repeat_days"></block>
          <block type="if_person"></block>
         <!--  <block type="get_person_attribute"></block>
          <block type="logic_compare"></block>
          <block type="math_number"></block> -->
        </BlocklyComponent>
      </div>
      <div class="col-4">
        <h4>Day {{currentDay}} out of {{maxDays}}</h4>
        <h4>Transmission Rate: {{immunity}}%</h4> 
        <canvas id="myCanvas" width="400" height="400">
        </canvas>
        <h4>{{totalInfected}} out of 80 infected</h4> 
      </div>
    </div>
    <br>
    <p id="code">
      <b-button size="lg" variant="primary" v-on:click="evalCode()">Run Simulation</b-button>
    </p>
    <div class="row">
      <div class="col-12">
        <b-tabs fill>
          <LabTab
              labTitle="1. Set Up"
              labKey="setup"
              hintText="Use these blocks"
              imgSource="setupviral.png"
              imgHeight="50"
              imgWidth="150"
            >
            In these labs, we will run simulations to help us understand the spread of viruses across a population. To start, lets pull over a "random_infect" block. This block will randomly choose one of the people in our simulation and 'infect' them with the virus. When you run the simulation, you should see 1 red infected dot, and 79 blue healthy dots.
          </LabTab>
          <LabTab
              labTitle="2. Viral Spread"
              labKey="spread"
              hintText="Use these blocks"
              imgSource="viralspread.png"
              imgHeight="110"
              imgWidth="170"
            >
            When a virus infects a population, it spreads when people come in contact with one another. Lets add an "every person do ..." block below the "random_infect" block. Inside this loop, lets add the "meet ... people" block and set the number of people met to 20. What happens when you run the simulation? Did the number of infected people increase? What happens when you increase or decrease the number of people met? Note: You should run the simulation 3-5 times with the same factors to get a sense for how different factors impact the virus spread, because each simulation is influenced by randomness.
          </LabTab>
          <LabTab
              labTitle="3. Transmission"
              labKey="transmission"
              hintText="Use these blocks"
              imgSource="transmission.png"
              imgHeight="120"
              imgWidth="210"
            >
            Another factor that controls how a virus spreads in a population is the transmission rate. In this simulation, we define the transmission rate as the likelihood that a healthy person that meets an infected person will contract the virus. The transmission rate defaults to 50%, which means that if a healthy person "meets" an infected person, they have a 50% chance of becoming infected as well. Add a "set transmission rate to ..." block to the top of your stack of blocks and try setting it to 20%. Does the average number of infected people decrease? What happens if you set the transmission rate to 80%?
          </LabTab>
          <LabTab
              labTitle="4. Reduce Spread"
              labKey="reduce"
              hintText="Use these blocks"
              imgSource="transmission.png"
              imgHeight="120"
              imgWidth="210"
            >
            Try changing the transmission rate and number of people met per person. Based on these factors, do you think it would be a good idea to limit the number of people you meet if a virus turned up in your community? Can you think of any ways we reduce the "transmission rate" of a virus in real life?
          </LabTab>
          <LabTab
              labTitle="5. Day by Day"
              labKey="day"
              hintText="Use these blocks"
              imgSource="daybyday.png"
              imgHeight="190"
              imgWidth="210"
          >
          One reason that viruses spread quickly is that newly infected people can infect others without realizing it. This can lead to the number of infected people increasing "exponentially".
          <br>
          <br>
          Lets see how a virus can spread over the course of several days. Drag over an "every day do ..." loop. Put your "every person do meet 20 people" block INSIDE of the "every day loop", but make sure to leave the initial conditions ("set transmission rate" and "random_infect") outside both loops at the top of the stack. Finally, to make the simulation simulate multiple days, we will need to set the number of days initially to 5 with the "set number of days to ..." block. If everything is working, you should see the number of infected people change, along with the day.
          <br>
          <br>
          How many days does it take for everyone to become infected? Can you reduce or increase this number by changing the transmission rate and the number of people met?
          </LabTab>
          <LabTab
              labTitle="6. Challenge"
              labKey="challenge"
              hintText="Use these blocks:"
              imgSource="viralchallenge.png"
              imgHeight="200"
              imgWidth="220"
            >
            Each person in our simulation has an age, indicated by the size of their circle, from 1 to 80. The larger the circle, the older the person. Currently, everyone has the same transmission rate, and meets the same number of people. To make our simulation more interesting, we can use the "if person age ... " block to change the number of people met and transmission rate based on age. Using two of these blocks inside of your "every person do" block, can you make people over the age of 40 meet 0 people and people under the age of 40 meet 10 people? Does this slow the spread of the virus? Any "meet ... people" blocks outside of the "if person age" blocks will still run for people of all ages, so any "meet ... people" block should specifically be inside "if person age" blocks.
            <br>
            <br>
            Similarly, we can imagine that people of a certain age may have a lower or higher transmission rate than others. Add a "set transmission rate to" block inside of each "if" block (before the "meet ... people") block to vary the transmission rate by age. Can you make people younger than 20 have a high transmission rate? What happens to the simulation?
          </LabTab>
        </b-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import BlocklyComponent from '../BlocklyComponent.vue'
import BlocklyJS from 'blockly/javascript';
import LabTab from '../instructions/LabTab.vue'

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
    currentPerson: undefined,
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
    },
    getCurrentPerson: (state) => () => {
      return state.currentPerson
    }


  },
  mutations: {
    resetState(state) {
      state.people = []
      state.nextInfected = []
      state.currentPerson = undefined
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
    }
  }
})

export default {
  name: 'app',
  components: {
    BlocklyComponent,
    LabTab
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

      var drawPeople = function(currentPerson) {
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
            if (currentPerson !== undefined && currentPerson === i) {
              Vue.prototype.$ctx.fillStyle="#00FF00";
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
        var currentPerson = store.getters.getCurrentPerson()
        drawPeople(currentPerson);
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
      this.program = 'draw();' + BlocklyJS.workspaceToCode(this.$refs["viral"].workspace);
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
    },
    immunity () {
      return store.state.immunity
    },
  }
}
</script>

<style scoped>
#blockly1 {
  position: relative;
  width: 100%;
  height: 500px;
}
</style>