<template>
  <div class="hi">
    <form action="">
      <marquee behavior="" direction=""
        ><h2>
          Love to hear from you, Get in touch<img
            src="https://user-images.githubusercontent.com/18350557/176309783-0785949b-9127-417c-8b55-ab5a4333674e.gif"
            alt=""
          /></h2
      ></marquee>
      <h2 class="custom-marquee-content">
        Love to hear from you, Get in touch<img
          src="https://user-images.githubusercontent.com/18350557/176309783-0785949b-9127-417c-8b55-ab5a4333674e.gif"
          alt=""
        />
      </h2>
      <div class="form-floating mb-3">
        <input
          type="text"
          class="form-control"
          id="floatingInput"
          placeholder="name"
          required
        />
        <label for="floatingInput">Full name</label>
      </div>
      <div class="form-floating mb-3">
        <input
          type="email"
          class="form-control"
          id="floatingInput"
          placeholder="name@example.com"
          required
        />
        <label for="floatingInput">Email address</label>
      </div>
      <select class="form-select" aria-label="Default select example" required>
        <option selected>Category</option>
        <option value="complaint">Complaint</option>
        <option value="Advice">Advice</option>
        <option value="Report">Report</option>
      </select>
      <div class="form-floating">
        <textarea
          class="form-control"
          placeholder="Leave a comment here"
          id="floatingTextarea"
          style="height: 15rem"
          required
        ></textarea>
        <label for="floatingTextarea">Message...</label>
      </div>
      <button class="contact-btn btn btn-warning my-2">Submit</button>
    </form>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.custom-marquee {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  background-color: lightgray;
  padding: 5px;
}

.custom-marquee-content {
  animation: marquee 10s linear infinite;
  display: none;
}

@keyframes marquee {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}

h2 img {
  height: 1.7rem;
  width: 1.7rem;
}
form {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  overflow: hidden;
}
button {
  font-weight: bold;
}

@media (min-width: 576px) {
  .hi {
    width: 100vw;
    display: flex;
    justify-content: center;
    background: #ebebeb;
    background-image: url("/World Map.svg");
  }
  marquee {
    display: none;
  }
  .custom-marquee-content {
    display: block;
  }
  h2 {
    color: #fdb924;
    text-shadow: 2px 2px #000;
    overflow: hidden;
  }

  form {
    width: 50%;
    border: 1px solid #cac9c9;
  }
}
</style>
