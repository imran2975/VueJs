<template>
  <Signup />
</template>

<script>
import Signup from "./components/Signup.vue";
export default {
  name: "App",
  components: { Signup },
};
</script>

<style>
#app {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  max-width: 1280px;
  margin: 20px;
  text-align: center;
  color: #2c3e50;
}
body {
  margin: 0;
  background: #eee;
}
</style>
