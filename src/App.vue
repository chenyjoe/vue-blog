<template>
  <div id="app">
	<blog-nav></blog-nav>
	<router-view></router-view>
  </div>
</template>

<script>
import BlogNav from './components/Nav.vue'

export default {
  name: 'App',
  components: {
	BlogNav
  }
}
</script>

<style>
.tm{
	font-size: 10px;
	color: #AAAAAA;
}
.showtit{
	text-align: center;
	line-height: 60px;
}
</style>
