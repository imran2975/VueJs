<template>
  <div>
    <div class="card mb-1" v-for="post in posts" :key="post.id">
      <div class="card-header">Posted by {{ post.author }}</div>
      <div class="card-body">
        <div class="card-contents">
          <div class="card-img">
            <img :src="post.img" alt="" />
          </div>
          <div class="cont">
            <h2 class="card-title">{{ post.title }}</h2>
            <p class="card-text text-muted">
              {{ post.content }}
            </p>
          </div>
        </div>
        <RouterLink to="/view-post" v-if="user">
          <button class="btn btn-primary" @click="getPost(post.id)">
            Continue reading...
          </button>
        </RouterLink>
        <RouterLink to="/sign-in" v-if="!user">
          <button class="btn btn-primary">Sign In to read</button>
        </RouterLink>
      </div>
      <div class="card-footer text-muted">2 days ago</div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { onSnapshot } from "firebase/firestore";
import { postCollection } from "../firebase/config";

export default {
  name: "Blogs",
  setup() {
    const store = useStore();
    const posts = computed(() => store.state.posts);

    const getPost = (postId) => {
      try {
        store.dispatch("filterPost", postId);
      } catch (err) {
        console.log(err.message);
      }
    };

    onMounted(() => {
      onSnapshot(postCollection, (snapshot) => {
        let posts = [];
        snapshot.docs.forEach((post) => {
          posts.push({ ...post.data() });
        });
        store.commit("setPosts", posts);
        console.log(posts);
      });
    });

    return { posts, getPost, user: computed(() => store.state.user) };
  },
};
</script>

<style scoped>
.card {
  width: 100vw;
}
.card-contents {
  display: flex;
  gap: 1rem;
  justify-content: space-around;
  margin-bottom: 0.5rem;
  line-height: 2rem;
}

.card-title {
  text-transform: capitalize;
}

.card-img {
  width: 300px;
  height: 200px;
}
.card-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 576px) {
  .card-contents {
    display: block;
  }
}
</style>
