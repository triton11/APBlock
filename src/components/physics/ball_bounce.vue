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
        <h4>Time elapsed: {{timer / 10}}</h4>
        <canvas id="myCanvas" width="400" height="400">
        </canvas>
        <h5>y_position:{{200-y}}, x_position {{x}}</h5>
        <h5>y_velocity: {{-1*dy}}, x_velocity {{dx}}</h5>
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

export default {
  name: 'app',

  components: {
    BlocklyComponent
  },
  data() {
    return {
      program: '',
      ctx: null,
      canvas: null,
      x: 0,
      y: 0,
      ddy: 1,
      ddx: 0,
      dx: 5,
      dy: 5,
      timer: 0,
      max_time: 50,
      timeout: null
    }
  },
  methods: {

    print_out() {
      console.log('asdas')
    },
    drawGrid() {
      this.ctx.moveTo(this.canvas.width/2, 0);
      this.ctx.lineTo(this.canvas.width/2, this.canvas.height);
      this.ctx.moveTo(0,this.canvas.height/2);
      this.ctx.lineTo(this.canvas.width, this.canvas.height/2);
      this.ctx.strokeStyle = "black";
      this.ctx.stroke();
    },
    drawBall() {
      this.ctx.beginPath();
      this.ctx.fillStyle="#0000ff";
      // Draws a circle of radius 20 at the coordinates 100,100 on the canvas
      this.ctx.arc(this.x,this.y,20,0,Math.PI*2,true);
      this.ctx.closePath();
      this.ctx.fill();
    },
    draw() {
      // console.log(this.inner_loop_content)
      this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height)
      this.drawGrid();
      // if(this.y + this.dy > this.canvas.height-20 || this.y + this.dy < 20) {
      //   this.ddy = 0
      //   this.dy = 0
      // }
      if (this.timer > this.max_time*10 - 2) {
        console.log(this.timer)
        console.log(this.max_time*10 - 2)
        clearTimeout(this.timeout)
      }
      this.timer += 1
      console.log(this.timeout)
      // this.dy += this.ddy;
      // this.dx += this.ddx;
      // this.y+=this.dy;
      // this.x+=this.dx
    },
    initFunc: function(interpreter, globalObject) {
      var draw = function() {
        Vue.prototype.$ctx.clearRect(0,0, Vue.prototype.$canvas.width, Vue.prototype.$canvas.height)
        Vue.prototype.$ctx.beginPath();
        Vue.prototype.$ctx.fillStyle="#0000ff";
        // Draws a circle of radius 20 at the coordinates 100,100 on the canvas
        Vue.prototype.$ctx.arc(0,0,20,0,Math.PI*2,true);
        Vue.prototype.$ctx.closePath();
        Vue.prototype.$ctx.fill();
        Vue.prototype.$timee += 1
        // this.drawGrid();
        // // if(this.y + this.dy > this.canvas.height-20 || this.y + this.dy < 20) {
        // //   this.ddy = 0
        // //   this.dy = 0
        // // }
        // if (this.timer > this.max_time*10 - 2) {
        //   console.log(this.timer)
        //   console.log(this.max_time*10 - 2)
        //   clearTimeout(this.timeout)
        // }
        // this.timer += 1
        // console.log(this.timeout)
      }

      var drawWrapper = function() {
        // setInterval(draw(), 200);
        // console.log("out")
        draw()
      };
      interpreter.setProperty(globalObject, 'draw',
          interpreter.createNativeFunction(drawWrapper));
    },
    evalCode() {
      clearTimeout(this.timeout)
      this.program = BlocklyJS.workspaceToCode(this.$refs["bounce"].workspace);
      console.log(this.program)
      this.timer = Vue.prototype.$timee
      Vue.prototype.$timee += 1
      // this.x = this.canvas.width/2
      // this.y = this.canvas.height/2
      // // this.ddy = 1
      // // this.ddx = 0
      // // this.dx = 3
      // // this.dy = -20
      // this.timer = 0
      // // var self = this;
      // var myInterpreter = new JSInterpreter.Interpreter(this.code, this.initFunc);
      // var runToCompletion = function() {
      //   if (myInterpreter.step()) {
      //     // Ran until an async call.  Give this call a chance to run.
      //     // Then start running again later.
      //     setTimeout(runToCompletion, 2);
      //   }
      // };
      // runToCompletion();

      // And then show generated code in an alert.
      // In a timeout to allow the outputArea.value to reset first.
      var program = this.program
      var runner = null
      // Begin execution
      var myInterpreter = new JSInterpreter.Interpreter(program, this.initFunc);
      runner = function() {
        if (myInterpreter) {
          var hasMore = myInterpreter.run();
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
    this.ctx = this.canvas.getContext('2d');
    Vue.prototype.$canvas = document.getElementById("myCanvas");
    Vue.prototype.$ctx = this.canvas.getContext('2d');
    Vue.prototype.$timee = 0
    this.x = this.canvas.width/2;
    this.y = this.canvas.height/2;
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