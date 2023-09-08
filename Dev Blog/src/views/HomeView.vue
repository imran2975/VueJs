<template>
  <div>
    <div class="tiles reverse big-screen">
      <div class="column">
        <h1>WELCOME!</h1>
        <p>
          Weekly blog articles with all things programming including HTML, CSS,
          JavaScript and more. Register today to never miss a post!
        </p>
        <RouterLink to="/" class="nav-link m-2">
          VIEW THE POST <i class="fa-solid fa-arrow-right fa-fade"></i>
        </RouterLink>
      </div>
      <div class="column2">
        <img src="/test.png" alt="" />
      </div>
    </div>
    <div class="tiles reverse small-screen">
      <div class="column">
        <h1>WELCOME!</h1>
        <p>
          Weekly blog articles with all things programming including HTML, CSS,
          JavaScript and more. Register today to never miss a post!
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
    <div class="tiles">
      <div class="column2">
        <img src="/test1.png" alt="" />
      </div>
      <div class="column">
        <h1>Dynamic Page Titles With The Vue Router</h1>
        <p>In this video we take a look at creatin</p>
        <RouterLink to="/login" class="nav-link m-2">
          VIEW THE POST <i class="fa-solid fa-arrow-right fa-fade"></i>
        </RouterLink>
      </div>
    </div>
    <div class="tiles reverse">
      <div class="column">
        <h1>CSS Transform: SkewY | Create A Slanted/Skewed Div</h1>
        <p>In this video we take a look at creatin</p>
        <RouterLink to="/login" class="nav-link m-2">
          VIEW THE POST <i class="fa-solid fa-arrow-right fa-fade"></i>
        </RouterLink>
      </div>
      <div class="column2">
        <img src="/test.png" alt="" />
      </div>
    </div>

    <div class="tiles post">
      <div class="more">
        <h2>View More Recent Blogs</h2>
        <div class="cards">
          <div class="card" style="width: 18rem">
            <img src="/Logo.png" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
          </div>
          <div class="card" style="width: 18rem">
            <img src="/Logo.png" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
          </div>
          <div class="card" style="width: 18rem">
            <img src="/Logo.png" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
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
</template>

<script>
import { useStore } from "vuex";
import { computed, ref as vueRef, onMount } from "vue";

export default {
  setup() {
    const store = useStore();
    console.log(store.state.user);

    
    onMount(()=>{
      window.location.reload()
    })
    return { user: computed(() => store.state.user) };
  },
};
</script>

<style scoped>
h1 {
  text-transform: uppercase;
}

h2 {
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

button {
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
    width: 100%;
    height: 30vh;
  }
  .column2 img {
    width: 100%;
    height: 100%;
    object-fit: contain;
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
