<template>
  <div class="wrapper" style="position: relative; top: 0">
    <!-- hero slider -->
    <div
      id="carouselExampleCaptions"
      class="carousel slide"
      data-bs-ride="carousel"
    >
      <div class="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="0"
          class="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active" data-bs-interval="3500">
          <img src="/hero.jpg" class="d-block w-100" alt="..." />
          <div class="carousel-caption d-md-block">
            <h5>Welcome To DEV BLOG</h5>
            <p>
              Weekly blog articles with all necessary things to aid our school
              journey including fun, comedy, comics and more. Register today to
              never miss a post!
            </p>
          </div>
        </div>
        <div class="carousel-item" data-bs-interval="3500">
          <img src="/hero2.jpg" class="d-block w-100" alt="..." />
          <div class="carousel-caption d-md-block">
            <h5>Study Guide and Lecture Notes</h5>
            <p>
              Dev Blog aims to provide students with comprehensive study
              resources and insightful lecture notes, empowering them to excel
              academically and gain a deeper understanding of their subjects.
            </p>
          </div>
        </div>
        <div class="carousel-item" data-bs-interval="3500">
          <img src="/hero3.jpg" class="d-block w-100" alt="..." />
          <div class="carousel-caption d-md-block">
            <h5>Several Quizzes based on your syllabus</h5>
            <p>
              "Explore a variety of quizzes tailored to your syllabus, designed
              to test your knowledge and help you master key concepts
              effectively. Our quiz collection offers an engaging way to
              reinforce your understanding of the material."
            </p>
          </div>
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
    <!-- end hero slider -->

    <div class="container">
      <div class="row" v-for="blog in blogs" :key="blog.id" data-aos="fade-up">
        <div class="col">
          <div class="post-card">
            <div class="image-container" data-aos-delay="900">
              <img :src="blog.img" alt="" />
            </div>

            <h1>{{ blog.title }}</h1>
            <p>
              By: <span>{{ blog.author }}</span>
            </p>
            <p
              class="contents"
              style="padding: 1rem"
              data-aos="zoom-in-right"
              data-aos-delay="500"
            >
              {{ blog.content ? blog.content.slice(0, 190) : "" }}
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
              class="btn btn-dark"
              v-if="user"
              data-aos="fade-down"
            >
              Read more <i class="fa-solid fa-arrow-right fa-fade"></i>
            </RouterLink>
            <RouterLink to="/sign-in" v-if="!user" data-aos="fade-down">
              <button class="btn btn-primary">Sign In to read</button>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>

    <div class="tiles">
      <h1 class="column">
        Never miss a post. Register for your free account today!
      </h1>
      <div class="newsletter">
        <form @submit.prevent="null">
          <input type="text" />
          <button class="btn btn-dark text-white btn-outline-secondary">
            Subscribe to our newsletter
          </button>
        </form>
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
  getDocs,
  updateDoc,
  limit,
  limitToLast,
  collection,
  where,
  writeBatch,
} from "firebase/firestore";
import { postCollection, db, commentsCollection } from "../firebase/config";

export default {
  setup() {
    const store = useStore();
    const user = computed(() => store.state.user);
    const profileInfos = computed(() => store.state.userData);
    const blogs = vueRef(null);
    const recentBlogs = vueRef(null);

    onMounted(async () => {
      const postRefs = query(postCollection, orderBy("sortPostBy", "desc"));
      onSnapshot(postRefs, (snapshot) => {
        let posts = [];
        snapshot.docs.forEach((post) => {
          posts.push({ ...post.data(), postId: post.id });
        });
        blogs.value = posts;
        console.log(blogs.value);
      });
    });

    return {
      user,
      blogs,
      recentBlogs,
    };
  },
};
</script>

<style scoped>
.carousel-item {
  height: 80vh;
}

.carousel-item img {
  height: 100%;
  object-fit: cover;
}

.carousel-caption {
  animation: slide-up 2s;
  background: #00000093;
  padding: 0.5rem;
}

@keyframes slide-up {
  0% {
    transform: translateY(20rem);
  }

  100% {
    transform: translateY(0);
  }
}

.container {
  margin: 3rem 0;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}

.col {
  width: 22.5rem;
  margin: 1rem 0;
}

.image-container {
  width: 100%;
  height: 25rem;
  overflow: hidden;
  border: 1px dotted #000;
}

.col img {
  width: 100%;
  height: 100%;
  margin-bottom: 1rem;
  transition: all 0.5s;
}

.col img:hover {
  transform: scale(2);
}

.col span {
  opacity: 0.5;
  text-transform: capitalize;
}

.col h1,
.col button {
  text-transform: uppercase;
}

@media (min-width: 576px) {
}

.tiles h2 {
  margin-left: 1rem;
}
.tiles {
  display: flex;
  align-items: center;
  width: 100%;
}

.column {
  padding: 1rem;
  width: 40%;
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
  .tiles {
    flex-direction: column;
    height: inherit;
  }

  .column {
    padding: 1rem;
    width: 100%;
  }

  .newsletter {
    width: 100%;
    padding: 1rem;
  }
}
</style>
