<template>
  <div>
    <h1>Programming with Pointilism</h1>
    <div class="row">
      <div class="col-6">
        <BlocklyComponent id="blockly1" ref="draw_dots">
          <block type="set_size"></block>
          <block type="set_row"></block>
          <block type="set_column"></block>
          <block type="set_color"></block>
          <block type="draw_dot"></block>
          <block type="draw_random_dot"></block>
          <block type="repeat_column"></block>
          <block type="repeat_row"></block>
        </BlocklyComponent>
      </div>
      <div class="col-6">
        <!-- <input type="file" id="fileinput" accept = "image/*" @change="onFileChange" /> -->
        <input type="file" id="selectedFile" style="display: none;" accept = "image/*" @change="onFileChange" />
        <b-button size="sm" variant="primary" onclick="document.getElementById('selectedFile').click();">Select Background</b-button> &nbsp; &nbsp;
        <b-button size="sm" variant="primary" v-on:click="clearScreen()">Clear Background</b-button> &nbsp; &nbsp;
        <b-button size="sm" variant="primary" v-on:click="clearDots()">Clear Dots</b-button>

        <!-- <h4>
          Size {{getSize}} 
          <input type="range" min="0" max="100" :value=getSize @input="updateSize">
          Color {{getColor}}
          <input type="range" min="0" max="5" :value=getColor @input="updateColor">
        </h4> -->
        <canvas id="myCanvas" width="400" height="400" v-on:click="drawOnCanvas" style="border:1px solid #000000; margin-top: 5px">
        </canvas>
        <br>
        Row: {{getRow}}
        Column: {{getColumn}}
        <h4>{{totalDots}} total dots</h4>
      </div>
    </div>
    <br>
    <div id="code">
      <b-button size="lg" variant="primary" v-on:click="evalCode()">Run Simulation</b-button>
    </div>
    <div class="mt-3">
      <b-button v-b-toggle.sidebar size="md" variant="secondary">Instructions</b-button>
    </div>
    <div class="instruction-nav">
      <b-button v-b-toggle.sidebar class="side-button" size="md" variant="secondary">Instructions</b-button>
    </div>
    <div class="row">
      <div class="col-12">
        <b-sidebar
          id="sidebar"
          right
        >
          <b-button v-if="tabIndex > 0" class="m-1" size="sm" @click="tabIndex--">Previous</b-button>
          <b-button v-if="tabIndex < 7" class="m-1" size="sm" @click="tabIndex++">Next</b-button>

          <LabSideTab
            labTitle="1. Set up"
            labKey="setup"
            hintText=""
            imgSource="setup.png"
            imgHeight="50"
            imgWidth="150"
            :index="0"
            :tabIndex.sync="tabIndex"
          >
            <p>
              Since the invention of computers, computer aided design has been an important part of commercial art forms. Computers have been incorporated into almost every artistic medium, from animated television shows to virtual reality sculptures at museums.
            </p>
          </LabSideTab>
          <LabSideTab
            labTitle="2. First point"
            labKey="point1"
            hintText="Use these blocks"
            imgSource="point1.png"
            imgHeight="120"
            imgWidth="200"
            :index="1"
            :tabIndex="tabIndex"
          >
            <p>
              One reason computers are so helpful for art is that they can be very very accurate. They can help us draw lines that are perfectly straight, circles that are perfectly round, and more. 
            </p>
            <p>
              When making art on a computer, the computer needs to know how to draw things. Lets start by using the computer to draw a dot for us. We can use the "set ___ " block to set a whole bunch of different variables.
            </p>
            <p>
              In our first program, lets tell our program to draw a green dot that is size 20 on our computer canvas (the square on the right with the black outline). 
              Did you figure it out?
            </p>
          </LabSideTab>
          <LabSideTab
            labTitle="3. Coordinates"
            labKey="point2"
            hintText="Use these blocks"
            imgSource="point2.png"
            imgHeight="225"
            imgWidth="175"
            :index="2"
            :tabIndex="tabIndex"
          >
            <p>
              In computer graphics, we use a coordinate system to tell the computer where to draw items on the screen. 
            </p>
            <p>
              Imagine our drawing screen is covered by 400 rows and 400 columns of little dots. The dot in the top left part of our screen is in row 1, column 1. The dot to the right of that first dot is in row 1, column 2. A dot in the top right part of the screen is in row 1, column 400. 
            </p>
            <p>
              Lets use the "set row" and "set column" fields to specify where to draw a dot specifically. 
            </p>
            <p>
              Can you draw a dot in the center of the screen?
              How about in the top left corner?
              Bottom right corner?
            </p>
          </LabSideTab>
          <LabSideTab
            labTitle="4. Coordinate Challenge"
            labKey="point2"
            hintText=""
            imgSource="point2.png"
            imgHeight="225"
            imgWidth="175"
            :index="3"
            :tabIndex="tabIndex"
          >
            <p>
              Challenge time! Can you draw dots on the screen in the shape of a smiley face?
            </p>  
          </LabSideTab>
          <LabSideTab
            labTitle="5. Loops!"
            labKey="point3"
            hintText="Try this!"
            imgSource="point3.png"
            imgHeight="150"
            imgWidth="225"
            :index="4"
            :tabIndex="tabIndex"
          >
            <p>
              But wait... this isn't art! Its just a bunch of dots!
              You know who else said that? Every art critic in the 1800s that met famous Pointillist artist Georges Seurat.
            </p>
            <p>
              Pointillism is a technique of painting in which small, distinct dots of color are applied in patterns to form an image. And it was originally intended to be an insult! However, the Impressionists like Georges Seurat and Paul Signet persevered and created incredible pictures using tons of small dots and splotches of paint on canvas.
            </p>
            <p>
              Drawing tons of dots on our computer canvas may be tough, but we can use loops to make it easier! The "repeat" loops will help us draw multiple dots, without needing to manually change the row and column each time.          
            </p>
            <p>
              Lets try it out! Using a single repeat loop, can you draw a line of dots across the center of the screen? Here is a hint: try using the "repeat for every column" block.
            </p>
          </LabSideTab>
          <LabSideTab
            labTitle="6. Loops 2!"
            labKey="point4"
            hintText="Try this!"
            imgSource="point4.png"
            imgHeight="175"
            imgWidth="225"
            :index="5"
            :tabIndex="tabIndex"
          >
            <p>
              Using two repeat loops nested inside one another, can you cover the entire surface of our computer canvas with dots?
            </p>
          </LabSideTab>
          <LabSideTab
            labTitle="7. Pointilism!"
            labKey="point5"
            hintText="Try this!"
            imgSource="point5.png"
            imgHeight="200"
            imgWidth="300"
            :index="6"
            :tabIndex="tabIndex"
          >
            <p>
              Being able to draw dots over the whole canvas is neat. But the Pointilism painters became famous because their drawings of dots looked like real landscapes and people. They would spend hours outside, soaking in the scenery of the world around them, then transfer that vision onto the canvas. We can use code to do something similar!
            </p>
            <p>
              To start, choose a background with the "select background" button. This will add an image to our computer canvas that we can turn into a Pointilist masterpiece. 
            </p>
            <p>
              Next, lets use our repeat loops nested in one another to generate our grid of dots. HOWEVER, this time instead of setting a color at the beginning, lets set the color to "current color at row and column" right before we draw each dot. This way, our dot will represent the color from the same point in our background image.
            </p>
            <p>
              Finally, to reveal your Pointilism masterpiece, click the "clear background" button. You can save your image by right clicking it with your mouse and selecting "Save Image As...".
            </p>
          </LabSideTab>
          <LabSideTab
            labTitle="8. Try it!"
            labKey="point4"
            hintText=""
            imgSource="point4.png"
            imgHeight="175"
            imgWidth="225"
            :index="7"
            :tabIndex="tabIndex"
          >
            <p>
              Can you become a computer Pointilism expert? Try experimenting with different sized dots, and different values in your loops.
            </p>
          </LabSideTab>
        </b-sidebar>
      </div>
    </div>
  </div>
</template>

<script>
import BlocklyComponent from '../BlocklyComponent.vue'
import BlocklyJS from 'blockly/javascript';
import LabSideTab from '../instructions/LabSideTab.vue'

import './random_dots.js';

global.acorn = require('../../assets/js/acorn');
const JSInterpreter = require('../../assets/js/interpreter');

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    row: 200,
    column: 200,
    size: 5,
    color: 0,
    maxTime: 0,
    dots: [],
  },
  getters: {
    getAttr: (state) => (attr) => {
      return state[attr]
    },
    getColor: (state) => {
      if (state.color == 0) {
        return '#FF0000'
      } else if (state.color == 1) {
        return '#FFFF00'
      } else if (state.color == 2) {
        return '#008000'
      } else if (state.color == 3) {
        return '#0000FF'
      } else if (state.color == 4) {
        return '#800080'
      } else if (state.color == 5) {
        return '#000000'
      } else {
        return undefined
      }
    },
    getDot: (state) => (ind) => {
      return state.dots[ind]
    }
  },
  mutations: {
    resetState(state) {
      state.dots = []
    },
    saveDot (state, payload) {
      state.dots.push([payload.x, payload.y, payload.size, payload.color])
    },
    change (state, payload) {
      state[payload.attr] = payload.amount
    }
  }
})

export default {
  name: 'app',
  components: {
    BlocklyComponent,
    LabSideTab
  },
  data(){
    return {
      code: '',
      background: '',
      tabIndex: 0
    }
  },
  methods: {
    onFileChange: function(event) {
      if (event.target.files) {
        this.background = event.target.files[0];
        this.loadImage();
      }
    },
    loadImage: function() {
      if (this.background !== "") {
        var reader  = new FileReader();
        reader.onloadend = function (e) {
          var image = new Image();
          image.src = e.target.result;
          image.onload = function() {
            console.log("loading");
            var canvas = document.getElementById('myCanvas');
            var ctx = canvas.getContext('2d');
            ctx.drawImage(image,0,0);
          }
        }
        reader.readAsDataURL(this.background);
      }
    },
    drawOnCanvas: function(event) {
      const color = store.getters.getColor;
      const size = store.getters.getAttr('size');
      this.drawDot(event.offsetX, event.offsetY, size, color)
    },
    rgbToHex(r, g, b) {
      if (r > 255 || g > 255 || b > 255)
          throw "Invalid color component";
      return ((r << 16) | (g << 8) | b).toString(16);
    },
    drawDot(x, y, size, color) {
      var finalColor = color;
      if (color === undefined) {
        const p = Vue.prototype.$ctx.getImageData(x, y, 1, 1).data;
        finalColor = "#" + ("000000" + this.rgbToHex(p[0], p[1], p[2])).slice(-6);
      }
      Vue.prototype.$ctx.fillStyle = finalColor;
      Vue.prototype.$ctx.beginPath();
      Vue.prototype.$ctx.arc(x, y, size, 0, Math.PI*2, true);
      Vue.prototype.$ctx.closePath();
      Vue.prototype.$ctx.fill();
    },
    updateSize (e) {
      store.commit({type: 'change', attr: 'size', amount: e.target.value})
    },
    updateColor (e) {
      store.commit({type: 'change', attr: 'color', amount: e.target.value})
    },
    clearScreen() {
      Vue.prototype.$ctx.clearRect(0, 0, Vue.prototype.$canvas.width, Vue.prototype.$canvas.height);
      this.background = "";
      for (var z = 0; z < this.totalDots; z++) {
        const dot = store.getters.getDot(z);
        this.drawDot(dot[0], dot[1], dot[2], dot[3]);
      }
    },
    clearDots() {
      Vue.prototype.$ctx.clearRect(0, 0, Vue.prototype.$canvas.width, Vue.prototype.$canvas.height);
      this.loadImage();
      store.commit('resetState');
    },
    evalCode() {
      this.program = BlocklyJS.workspaceToCode(this.$refs["draw_dots"].workspace);
      //this.clearDots();
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
    },
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

      function rgbToHex(r, g, b) {
        if (r > 255 || g > 255 || b > 255)
            throw "Invalid color component";
        return ((r << 16) | (g << 8) | b).toString(16);
      }

      var drawWrapper = function() {
        // const x = Math.floor(Math.random() * Vue.prototype.$canvas.width);
        // const y = Math.floor(Math.random() * Vue.prototype.$canvas.height);
        const x = store.getters.getAttr('column');
        const y = store.getters.getAttr('row');
        const color = store.getters.getColor;
        const size = store.getters.getAttr('size');
        var finalColor = color;
        if (color === undefined) {
          const p = Vue.prototype.$ctx.getImageData(x, y, 1, 1).data;
          finalColor = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
        }
        store.commit({type: 'saveDot', color: finalColor, size: size, x: x, y: y});
        Vue.prototype.$ctx.fillStyle = finalColor;
        Vue.prototype.$ctx.beginPath();
        Vue.prototype.$ctx.arc(x, y, size, 0, Math.PI*2, true);
        Vue.prototype.$ctx.closePath();
        Vue.prototype.$ctx.fill();
      }

      interpreter.setProperty(globalObject, 'draw',
          interpreter.createNativeFunction(drawWrapper));

      var vueSetWrapper = function(attr, set_value) {
        store.commit({type: 'change', attr: attr, amount: set_value})
      };

      interpreter.setProperty(globalObject, 'vueSet',
          interpreter.createNativeFunction(vueSetWrapper));

      var drawRandomWrapper = function() {
        const row = Math.floor(Math.random() * Vue.prototype.$canvas.width);
        const column = Math.floor(Math.random() * Vue.prototype.$canvas.height);
        const color = Math.floor(Math.random() * 5);
        const size = Math.floor(Math.random() * 100);
        vueSetWrapper('row', row);
        vueSetWrapper('column', column);
        vueSetWrapper('color', color);
        vueSetWrapper('size', size);
        drawWrapper();
      };

      interpreter.setProperty(globalObject, 'drawRandom',
          interpreter.createNativeFunction(drawRandomWrapper));
    }
  },
  mounted: function() {
    this.canvas = document.getElementById("myCanvas");
    Vue.prototype.$canvas = document.getElementById("myCanvas");
    Vue.prototype.$ctx = this.canvas.getContext('2d');
  },
  computed: {
    getSize () {
      return store.state.size;
    },
    getColumn () {
      return store.state.column;
    },
    getRow () {
      return store.state.row;
    },
    getColor () {
      return store.state.color;
    },
    totalDots () {
      return store.state.dots.length;
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
.instruction-nav {
  position: fixed;
  top: 150px;
  right: -30px;
  z-index: 1030;
}
.side-button {
  -ms-transform: rotate(270deg); /* IE 9 */
  -webkit-transform: rotate(270deg); /* Chrome, Safari, Opera */
  transform: rotate(270deg);
}
</style>