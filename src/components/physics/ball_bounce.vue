<template>
  <div>
    <h1>Ball Bounce</h1>
    <div class="row">
      <div class="col-8">
        <BlocklyComponent id="blockly1" ref="bounce">
          <block type="controls_ifelse"></block>
          <block type="logic_compare"></block>
          <block type="logic_operation"></block>
          <block type="math_arithmetic"></block>
          <block type="math_number"></block>
          <block type="set_variable"></block>
          <block type="get_variable"></block>
          <block type="draw_ball"></block>
          <block type="repeat_timer"></block>
        </BlocklyComponent>
      </div>
      <div class="col-4">
        <h4>Time elapsed: {{currentTime}}</h4>
        <canvas id="myCanvas" width="400" height="400">
        </canvas>
        <h5>y_position:{{py}}, x_position {{px}}</h5>
        <h5>y_velocity: {{dy}}, x_velocity {{dx}}</h5>
        <h5>y_acceleration: {{ddy}}, x_acceleration {{ddx}}</h5>
      </div>
    </div>
    <p id="code">
      <b-button size="lg" variant="primary" v-on:click="evalCode()">Run Code</b-button>
    </p>
  </div>
</template>

<script>
import BlocklyComponent from '../BlocklyComponent.vue'

import BlocklyJS from 'blockly/javascript';
import './ball_bounce';
global.acorn = require('../../assets/js/acorn');
const JSInterpreter = require('../../assets/js/interpreter');

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    px: 0,
    py: 0,
    dx: 0,
    dy: 0,
    ddx: 0,
    ddy: 0,
    maxTime: 0,
    currentTime: 0
  },
  getters: {
    getAttr: (state) => (attr) => {
      return state[attr]
    }

  },
  mutations: {
    change (state, payload) {
      state[payload.attr] = payload.amount
    }
  }
})

export default {
  name: 'app',

  components: {
    BlocklyComponent
  },
  data() {
    return {
      program: '',
      max_time: 50,
      timeout: null,
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

      var drawBall = function() {
        Vue.prototype.$ctx.beginPath();
        Vue.prototype.$ctx.fillStyle="#0000ff";
        Vue.prototype.$ctx.arc(store.state.px+Vue.prototype.$canvas.width/2, (-1)*store.state.py+Vue.prototype.$canvas.height/2, 20, 0, Math.PI*2, true);
        Vue.prototype.$ctx.closePath();
        Vue.prototype.$ctx.fill();
      }

      var drawGrid = function() {
        Vue.prototype.$ctx.moveTo(Vue.prototype.$canvas.width/2, 0);
        Vue.prototype.$ctx.lineTo(Vue.prototype.$canvas.width/2, Vue.prototype.$canvas.height);
        Vue.prototype.$ctx.moveTo(0,Vue.prototype.$canvas.height/2);
        Vue.prototype.$ctx.lineTo(Vue.prototype.$canvas.width, Vue.prototype.$canvas.height/2);
        Vue.prototype.$ctx.strokeStyle = "black";
        Vue.prototype.$ctx.stroke();
      }

      var draw = function() {
        Vue.prototype.$ctx.clearRect(0,0, Vue.prototype.$canvas.width, Vue.prototype.$canvas.height)
        drawGrid();
        drawBall();
        
      }

      var drawWrapper = function() {
        draw()
      };

      interpreter.setProperty(globalObject, 'draw',
          interpreter.createNativeFunction(drawWrapper));

      initInterpreterWaitForSeconds(interpreter, globalObject);

      var vueSetWrapper = function(attr, set_value) {
        store.commit({type: 'change', attr: attr, amount: set_value})
      };

      interpreter.setProperty(globalObject, 'vueSet',
          interpreter.createNativeFunction(vueSetWrapper));

      var vueGetWrapper = function(attr) {
        return store.getters.getAttr(attr)
      };

      interpreter.setProperty(globalObject, 'vueGet',
          interpreter.createNativeFunction(vueGetWrapper));

    },
    evalCode() {
      clearTimeout(this.timeout)
      this.program = BlocklyJS.workspaceToCode(this.$refs["bounce"].workspace);
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
  },
  mounted: function() {
    this.canvas = document.getElementById("myCanvas");
    Vue.prototype.$canvas = document.getElementById("myCanvas");
    Vue.prototype.$ctx = this.canvas.getContext('2d');
  },
  computed: {
    px () {
      return store.state.px
    },
    py () {
      return store.state.py
    },
    dx () {
      return store.state.dx
    },
    dy () {
      return store.state.dy
    },
    ddx () {
      return store.state.ddx
    },
    ddy () {
      return store.state.ddy
    },
    maxTime () {
      return store.state.maxTime
    },
    currentTime () {
      return store.state.currentTime
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