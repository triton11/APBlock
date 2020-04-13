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
          <b-nav-item-dropdown text="Physics">
            <router-link :to="{ path: '/physics/ball_bounce' }" tag="b-dropdown-item">
              Ball Bounce
            </router-link>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown text="Spanish">
            <router-link :to="{ path: '/spanish/chatbot' }" tag="b-dropdown-item">
              Chatbot
            </router-link>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown text="Biology">
            <router-link :to="{ path: '/biology/viral' }" tag="b-dropdown-item">
              Gone Viral
            </router-link>
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
