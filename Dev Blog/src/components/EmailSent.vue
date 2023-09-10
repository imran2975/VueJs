<template>
  <div class="wrapper">
    <h2>Reset Link Sent</h2>
    <marquee>Check inbox</marquee>
    <button class="btn btn-primary" @click="removePopUp">close</button>
  </div>
</template>

<script>
export default {
  setup() {
    const hide = () => {
      props.removePopUp();
    };

    return { hide };
  },
  props: {
    removePopUp: Function,
  },
};
</script>

<style scoped>
.wrapper {
  background: #ebebeb;
  width: 20.5rem !important;
  height: 10rem;
  position: fixed;
  top: 40%;
  left: 1rem;
  width: 20rem;
  box-shadow: 2px 2px 5px #000;
  padding: 2rem;
  transition: all 1000ms;
  z-index: 1;
}

marquee {
  margin-top: rem;
}
button {
  margin-left: 6rem;
}

h2 {
  text-align: center;
}

.control {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

@media (min-width: 576px) {
  .wrapper {
    width: 30rem !important;
    height: 12rem;
    left: 35%;
  }
}
</style>
