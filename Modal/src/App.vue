<template>
  <div>
    <h1>{{ title }}</h1>
    <p>Welcome...</p>
    <div v-if="showModal">
      <Modal theme="sale" :toggle="toggleModal">
        <template v-slot:links>
          <a href="#">sign up now</a>
          <a href="#">more info</a>
        </template>
        <h1>Ninja Giveaway</h1>
        <p>Grab your ninja swag here</p>
      </Modal>
    </div>
    <div v-if="showModal2">
      <Modal :toggle="toggleModal2" no-styles>
        <h1>Sign up for the Newsletter</h1>
        <p>For undates and promo code!</p>
      </Modal>
    </div>
    <button @click="toggleModal">Open Modal</button>
    <button @click="toggleModal2">Open Modal Two</button>
  </div>
</template>

<script>
import Modal from "./components/Modal.vue";

export default {
  name: "App",
  components: {
    Modal,
  },
  data() {
    return {
      title: "Hello Vue 😍",
      showModal: false,
      showModal2: false,
    };
  },
  methods: {
    toggleModal() {
      this.showModal = !this.showModal;
    },
    toggleModal2() {
      this.showModal2 = !this.showModal2;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1 {
  border-bottom: 1px solid #ddd;
  padding: 20px;
  display: inline-block;
}
</style>
