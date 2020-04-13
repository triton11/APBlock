<template>
  <div>
    <h1>Ball Bounce</h1>
    <div class="row">
      <div class="col-8">
        <BlocklyComponent id="blockly1" ref="bounce">
          <block type="set_variable"></block>
          <block type="change_variable"></block>
          <block type="get_variable"></block>
          <!-- <block type="draw_ball"></block> -->
          <block type="repeat_timer"></block>
          <block type="math_arithmetic"></block>
          <block type="math_number"></block>
        </BlocklyComponent>
      </div>
      <div class="col-4">
        <h4>Time elapsed: {{currentTime}}, Timer: {{maxTime}}</h4> 
        <canvas id="myCanvas" width="400" height="400">
        </canvas>
        <h5>y_position: {{py}}, x_position: {{px}}</h5>
        <h5>y_velocity: {{dy}}, x_velocity: {{dx}}</h5>
        <h5>y_acceleration: {{ddy}}, x_acceleration: {{ddx}}</h5>
      </div>
    </div>
    <p id="code">
      <b-button size="lg" variant="primary" v-on:click="evalCode()">Run Code</b-button>
    </p>
    <div class="row">
      <div class="col-12">
        <b-tabs fill>
          <LabTab
            labTitle="1. Setting Up"
            labKey="setup"
            hintText="Use these blocks"
            imgSource="setup.png"
            imgHeight="50"
            imgWidth="150"
          >
            <p>
              Can you set the timer to 10 using the pink "set ... to" block and the blue number block? Check by pressing "Run Code" and see if the Timer in the top right corner gets set to 10.
            </p>
          </LabTab>
          <LabTab
            labTitle="2. Looping"
            labKey="loop"
            hintText="Use these blocks"
            imgSource="loop.png"
            imgHeight="120"
            imgWidth="200"
          >
            <p>
              The "do every second" block will run any blocks inside of it, in order, once every second until the timer runs out. Drag over an "every second do" block and press "Run Code". You should see the time elapsed go up every second.
            </p>
          </LabTab>
          <LabTab
            labTitle="3. Change position"
            labKey="position"
            hintText="Use these blocks"
            imgSource="changepos.png"
            imgHeight="130"
            imgWidth="250"
          >
            <p>
              We can use the "change ... by" block to change any of our variables. Lets add a change block inside our "do every second" loop, and use it to change the x_position by 10. Press "Run Code". Does the ball move across the x-axis of the graph? Each second, our loop is changing the x_position of the ball to be 10 more than it was previously.
            </p>
          </LabTab>
          <LabTab
            labTitle="4. Velocity"
            labKey="velocity1"
            hintText="Use these blocks"
            imgSource="velocity.png"
            imgHeight="300"
            imgWidth="300"
          >
            <p>
              To start, lets set position (both x and y) to <b>0</b> and velocity (both x and y) to <b>5</b>, and set the timer to <b>10</b>. This way, every time we run our code our ball will have the same starting position and velocity. 
              <br>
              <br>
              In physics, the change in position over time is known as the velocity. Make a "do every second" loop, but instead of changing the x position by 10 like we did in the previous lab, lets use a "change ... by" block to change the x position by the x velocity (hint: use the pink block with a dropdown). Does the ball move faster or slower than before? What if you change the "set ... to" block from earlier to set the x velocity to 20?
            </p>
          </LabTab>
          <LabTab
            labTitle="4. More Velocity"
            labKey="velocity2"
            hintText="Use these blocks"
            imgSource="velocity.png"
            imgHeight="300"
            imgWidth="300"
          >
            <p>
              Balls don't just move left and right, they also move up and down. Add a second "change ... by" block to your loop to change the y position by the y velocity. What happens to your ball when you run the code? What happens if you change the y velocity to be negative? Can you think of a case in real life when a ball has a "negative" velocity?
              <br>
              <br>
              Challenge: You can use multiple "every second do" loops by stacking them one on top of the other. Can you make the ball move in a complete square (eg. first it moves right, then up, then left, then down) using the "change ... by" and "set ... to" blocks? 
            </p>
          </LabTab>

          <LabTab
            labTitle="5. Acceleration"
            labKey="acceleration1"
            hintText="Use these blocks"
            imgSource="acceleration.png"
            imgHeight="360"
            imgWidth="300"
          >
            <p>
              To start, lets set position (both x and y) to <b>0</b> and velocity (both x and y) to <b>0</b>, and set the timer to <b>10</b>. Next, set the x and y acceleration to <b>2</b>.
              <br>
              <br>
              Acceleration is the change in velocity over time. Lets make our ball accelerate! Make a "do every second" loop, with a "change ... by" block to change x position by x velocity. Next add a "change ... by" block to change x velocity by x acceleration. What happens when you run the code? Does the ball move faster over time?
            </p>
          </LabTab>
          <LabTab
            labTitle="6. More Acceleration"
            labKey="acceleration2"
            hintText="Use these blocks"
            imgSource="acceleration.png"
            imgHeight="360"
            imgWidth="300"
          >
            <p>
              In real life, one of the most common forms of acceleration is "acceleration due to gravity". When something is in free fall, it is constantly accelerating by 9.81 m/s. Lets try simulating a ball that has just been thrown straight up! To start, set the x velocity to 0 and set the x acceleration to 0, outside of your loop. Next, set the y velocity to 5 and the y acceleration (aka gravity) to -1, outside of your loop. Finally, add a "change ... by" block to your loop to change the y position by the y velocity, and another "change ... by" block to change the y velocity by the y acceleration. What happens when you run the code? Does the ball travel up, then fall down?
              <br>
              <br>
              Challenge: Imagine you are playing catch outside and you toss a ball! What initial values should the x/y velocities and x/y accelerations have? Why?
            </p>
          </LabTab>
          <LabTab
            labTitle="7. Programming challenge"
            labKey="challenge"
            hintText="Its a challenge!"
            imgSource="default.png"
            imgHeight="100"
            imgWidth="200"
          >
            <ol>
              This code that we have assembled runs line by line. Try these interesting challenge problems:
              <li>
                The change by block can be replace entirely by a combination of other blocks. Make an "every second do" loop with a "change ... by" block that changes x position by x velocity. Can you re-write this loop without any "change ... by" blocks? Hint: You will need the "set ... by" and blue "... + ..." block.
              </li>
              <li>
                The order of "change ... by" blocks matters. Make a stack of two change blocks: change y position by y velocity and change y velocity by 10. What happens when you switch the order of these blocks? Why is it important that the change y position block come first?
              </li>
            </ol>
          </LabTab>
        </b-tabs>
      </div>
    </div>
  </div>
  
</template>

<script>
import BlocklyComponent from '../BlocklyComponent.vue'
import LabTab from '../instructions/LabTab.vue'

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
    BlocklyComponent,
    LabTab
  },
  data() {
    return {
      program: '',
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
      this.program = 'draw();' + BlocklyJS.workspaceToCode(this.$refs["bounce"].workspace);
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
<style scoped>
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
</style>