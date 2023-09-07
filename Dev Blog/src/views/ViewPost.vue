<template>
  <main>
    <div class="wrapper">
      <h1>{{ post.title }}</h1>
      <!-- for the span tag containing post author i mght use it to show author's profile -->
      <p>
        Posted by <span class="text-primary">{{ post.author }}</span> on
        September 07, 2023
      </p>
      <img :src="post.img" alt="" />

      <p>
        {{ post.content }}
      </p>
      <div class="post-">
        <!-- in the future i might make this functionable by editting and deleting in the component with vuex aid but only firebase  -->
        <button class="btn btn-primary">Edit Post</button>
        <button class="btn btn-danger">Edit Post</button>
      </div>
    </div>
  </main>
</template>

<script>
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const post = store.state.viewPost;

    return { post };
  },
};
</script>

<style scoped>
main {
  display: flex;
  justify-content: center;
  padding: 1rem;
}

.wrapper {
  width: 100%;
}

.wrapper * {
  width: 100%;
}

span {
  font-style: italic;
  font-weight: bold;
}

button {
  margin-top: 0.5rem;
}
</style>
