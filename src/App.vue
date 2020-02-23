<template>
  <div id="app">
    <div>
      <b-navbar type="dark" variant="dark">
        <b-navbar-nav>
          <b-nav-item>
            <router-link :to="{ path: '/' }">
              Home
            </router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link :to="{ path: '/instructions' }">
              Instructions
            </router-link>
          </b-nav-item>
          <b-nav-item-dropdown text="physics">
            <b-dropdown-item>
              <router-link :to="{ path: '/physics/ball_bounce' }">
                Ball Bounce
              </router-link>
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-navbar>
      <div id="main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: light;
}
#main {
  margin: 30px;
}
</style>
