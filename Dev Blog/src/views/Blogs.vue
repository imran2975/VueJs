<template>
  <div>
    <div class="card mb-1" v-for="post in posts" :key="post.id">
      <div class="card-header">
        Posted by {{ post.author }} on {{ post.date }}
      </div>
      <div class="card-body">
        <div class="card-contents">
          <div class="card-img" v-if="post.img">
            <RouterLink
              :to="{
                name: 'view-post',
                params: {
                  postId: post.postId,
                  coverImageRef: post.coverImageRef,
                },
              }"
              v-if="user"
            >
              <img :src="post.img" alt="" />
            </RouterLink>
          </div>
          <div class="cont">
            <h2 class="card-title">{{ post.title }}</h2>
            <p class="card-text text-muted">
              {{ post.content ? post.content.slice(0, 90) : ""
              }}<span class="fa-fade">.....</span>
            </p>
          </div>
        </div>
        <RouterLink
          :to="{
            name: 'view-post',
            params: { postId: post.postId, coverImageRef: post.coverImageRef },
          }"
          v-if="user"
        >
          <button class="btn btn-primary">Continue reading...</button>
        </RouterLink>

        <RouterLink to="/sign-in" v-if="!user">
          <button class="btn btn-primary">Sign In to read</button>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { onSnapshot, query, orderBy } from "firebase/firestore";
import { postCollection } from "../firebase/config";

export default {
  name: "Blogs",
  setup() {
    const store = useStore();
    const posts = computed(() => store.state.posts);

    onMounted(() => {
      const postRefs = query(postCollection, orderBy("sortPostBy", "desc"));
      onSnapshot(postRefs, (snapshot) => {
        let posts = [];
        snapshot.docs.forEach((post) => {
          posts.push({ ...post.data(), postId: post.id });
        });
        store.commit("setPosts", posts);

        console.log(posts, store.state.viewPost);
      });
    });

    return { posts, user: computed(() => store.state.user) };
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
  justify-content: flex-start;
  margin-bottom: 0.5rem;
  line-height: 2rem;
}

.card-title {
  text-transform: capitalize;
}

.card-img {
  width: 300px !important;
  height: 200px !important;
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
