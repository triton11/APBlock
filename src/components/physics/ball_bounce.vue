<template>
  <div>
    <h1>Ball Bounce</h1>
    <div class="row">
      <div class="col-8">
        <BlocklyComponent id="blockly1" ref="bounce">
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

export default {
  name: 'app',

  components: {
    BlocklyComponent
  },
  data() {
    return {
      code: '',
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
    innerLoop: function(inner_loop_content) {
      // console.log(this.inner_loop_content)
      this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height)
      this.drawGrid();
      // if(this.y + this.dy > this.canvas.height-20 || this.y + this.dy < 20) {
      //   this.ddy = 0
      //   this.dy = 0
      // }
      if (this.timer > this.max_time*10 - 2) {
        clearTimeout(this.timeout)
      }
      this.timer += 1
      eval(inner_loop_content)
      // this.dy += this.ddy;
      // this.dx += this.ddx;
      // this.y+=this.dy;
      // this.x+=this.dx
    },
    evalCode() {
      clearTimeout(this.timeout)
      this.code = BlocklyJS.workspaceToCode(this.$refs["bounce"].workspace);
      console.log(this.code)
      this.x = this.canvas.width/2
      this.y = this.canvas.height/2
      // this.ddy = 1
      // this.ddx = 0
      // this.dx = 3
      // this.dy = -20
      this.timer = 0
      eval(this.code)
      // this.timeout = setInterval(this.innerLoop("hello"), 100)
    }
  },
  mounted: function() {
    this.canvas = document.getElementById("myCanvas");
    this.ctx = this.canvas.getContext('2d');
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