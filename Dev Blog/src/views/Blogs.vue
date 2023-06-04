<template>
  <div>
    <div class="card mb-1" v-for="post in posts" :key="post.id">
      <div class="card-header">Posted by {{ post.author }}</div>
      <div class="card-body">
        <div class="card-contents">
          <div class="card-img">
            <img src="/Logo.png" alt="" />
          </div>
          <div class="cont">
            <h2 class="card-title">{{ post.title }}</h2>
            <p class="card-text text-muted">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus
              cupiditate commodi dolorum nesciunt id deleniti saepe magnam
              voluptatibus necessitatibus culpa?
            </p>
          </div>
        </div>
        <a href="#" class="btn btn-primary">Continue reading...</a>
      </div>
      <div class="card-footer text-muted">2 days ago</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  setup() {
    const posts = [
      {
        id: 1,
        author: "Imran",
        title: "How to create a simple login page using Html & Css",
      },
      {
        id: 2,
        author: "Ameer",
        title: "Simple Vue Project",
      },
      {
        id: 3,
        author: "Mahmud",
        title:
          "How to create a simple login page using React and firebase auth",
      },
      {
        author: "Johnson",
        title: "How to create an E-comerce web app using Html & Css",
      },
      {
        author: "Fati",
        title: "How to create a simple login page using Html & Css",
      },
    ];

    return { posts };
  },
};
</script>

<style scoped>
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
