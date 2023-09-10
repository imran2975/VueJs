<template>
  <div class="wrapper">
    <h2>
      Are you sure you want to <span class="text-danger">DELETE</span> post.
    </h2>

    <div class="control">
      <button class="btn btn-primary" @click="removePopUp">NO</button>
      <button class="btn btn-danger" @click="removePost">YES</button>
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
  padding: 2rem;
  transition: all 1000ms;
  z-index: 1;
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
