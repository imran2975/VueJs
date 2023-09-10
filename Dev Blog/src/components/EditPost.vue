<template>
  <div class="wrapper">
    <h2>Opps!!! Feature not availabe</h2>

    <div class="control">
      <button class="btn btn-primary" @click="removePopUp">OK</button>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    const deletePost = () => {
      props.removePost();
    };

    const hide = () => {
      props.removePopUp();
    };

    return { deletePost, hide };
  },
  props: {
    removePost: Function,
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
  width: 20rem;
  box-shadow: 2px 2px 5px #000;
  border-radius: 2rem;
  padding: 2rem;
  transition: all 1000ms;
  z-index: 1;
}

.control * {
  width: 100%;
}

@media (min-width: 576px) {
  .wrapper {
    width: 30rem !important;
    height: 12rem;
    left: 35%;
  }
}
</style>
