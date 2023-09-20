<template>
  <div class="wrapper" style="position: relative; top: 0">
    <div>
      <!-- use nth-child and animation to display the cover images side by side with the post text  -->
      <div class="container">
        <div class="row">
          <div class="col">Column</div>
          <div class="col">Column</div>
          <div class="col">Column</div>
        </div>
      </div>

      <div class="small d-lg-none">
        <div class="tiles reverse small-screen">
          <div class="column">
            <h1>WELCOME!</h1>
            <p>
              Weekly blog articles with all things programming including HTML,
              CSS, JavaScript and more. Register today to never miss a post!
            </p>

            <RouterLink class="nav-link m-2" to="/sign-in" v-if="!user">
              <button class="btn btn-warning">
                LOGIN/REGISTER
                <i class="fa-solid fa-arrow-right fa-fade"></i>
              </button>
            </RouterLink>
            <RouterLink to="/" class="nav-link m-2" v-if="user">
              VIEW THE POST <i class="fa-solid fa-arrow-right fa-fade"></i>
            </RouterLink>
          </div>
          <div class="column2">
            <img src="/test.png" alt="" />
          </div>
        </div>

        <div class="tiles" v-for="blog in blogs" :key="blog.id">
          <div class="column2">
            <img :src="blog.img" alt="" />
          </div>
          <div class="column" v-if="blogs">
            <h1>{{ blog.title }}</h1>
            <p>
              {{ blog.content ? blog.content.slice(0, 90) : "" }}
              <span class="fa-fade">....</span>
            </p>
            <RouterLink
              :to="{
                name: 'view-post',
                params: {
                  postId: blog.postId,
                  coverImageRef: blog.coverImageRef,
                },
              }"
              class="nav-link m-2"
            >
              VIEW THE POST <i class="fa-solid fa-arrow-right fa-fade"></i>
            </RouterLink>
          </div>
        </div>
      </div>

      <!-- recent posts -->
      <div class="tiles post">
        <div class="more">
          <h2>View More Recent Blogs</h2>
          <div class="cards" v-for="blog in recentBlogs" :key="blog.id">
            <div class="card" style="width: 18rem">
              <img :src="blog.img" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">{{ blog.title }}</h5>
                <p class="card-text">
                  {{ blog.content ? blog.content.slice(0, 90) : "" }}
                  <span class="fa-fade">....</span>
                </p>
                <RouterLink
                  :to="{
                    name: 'view-post',
                    params: {
                      postId: blog.postId,
                      coverImageRef: blog.coverImageRef,
                    },
                  }"
                  class="btn btn-primary"
                >
                  Read more <i class="fa-solid fa-arrow-right fa-fade"></i>
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="tiles">
        <h1 class="column">
          never miss a post. Register for your free account today!
        </h1>
        <div class="newsletter">
          <form>
            <input type="text" />
            <button class="btn btn-dark text-white btn-outline-secondary">
              Subscribe to our newsletter
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, ref as vueRef, onMounted } from "vue";
import {
  onSnapshot,
  query,
  doc,
  orderBy,
  limit,
  limitToLast,
} from "firebase/firestore";
import { postCollection } from "../firebase/config";

export default {
  setup() {
    const store = useStore();
    const blogs = vueRef(null);
    const recentBlogs = vueRef(null);

    onMounted(() => {
      const postRefs = query(
        postCollection,
        orderBy("sortPostBy", "desc"),
        limitToLast(3)
      );
      onSnapshot(postRefs, (snapshot) => {
        let posts = [];
        snapshot.docs.forEach((post) => {
          posts.push({ ...post.data(), postId: post.id });
        });
        blogs.value = posts;
        console.log(blogs.value);
      });

      // for displaying recents posts
      const recentPosts = query(
        postCollection,
        orderBy("sortPostBy", "desc"),
        limit(4)
      );
      onSnapshot(recentPosts, (snapshot) => {
        let posts = [];
        snapshot.docs.forEach((post) => {
          posts.push({ ...post.data(), postId: post.id });
        });
        recentBlogs.value = posts;
      });
    });

    return {
      user: computed(() => store.state.user),
      blogs,
      recentBlogs,
    };
  },
};
</script>

<style scoped>
h1 {
  text-transform: uppercase;
}

.tiles h2 {
  margin-left: 1rem;
}
.tiles {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100vh;
}

.column {
  padding: 1rem;
  width: 40%;
}

.column2 {
  width: 60%;
  height: 100vh;
}

.column2 img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.post {
  background: #ebebeb;
  width: 100%;
  height: 100vh;
}

.card {
  margin-left: 1rem;
}

.cards {
  display: flex;
}

.newsletter {
  width: 60%;
  padding: 1rem;
}

form input {
  display: block;
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #000;
  border-radius: 20px;
}

form button {
  margin-top: 1rem;
  border-radius: 50px;
  padding: 0.5rem;
}

@media (max-width: 576px) {
  .big-screen {
    display: none;
  }
  /*.small-screen {
    display: block;
  } */
  .tiles {
    flex-direction: column;
    height: inherit;
  }

  .reverse {
    flex-direction: column-reverse;
  }

  .column {
    padding: 1rem;
    width: 100%;
  }

  .column2 {
    width: 100vw;
    height: 30vh;
  }
  .column2 img {
    width: 100vw;
    height: 100%;
    object-fit: cover;
    border-top: 2px solid #fdb924;
    border-bottom: 2px solid #fdb924;
  }

  .cards {
    flex-direction: column;
    justify-content: left;
    align-items: left;
  }
  .card {
    margin: 0;
    margin-bottom: 1rem;
    width: 100%;
  }

  .newsletter {
    width: 100%;
    padding: 1rem;
  }
}

@media (min-width: 576px) {
  .small-screen {
    display: none;
  }
}
</style>
