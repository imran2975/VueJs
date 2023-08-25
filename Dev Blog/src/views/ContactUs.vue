<template>
  <div class="hi">
    <form action="">
      <h2>Love to hear from you, Get in touch👋</h2>
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
form {
  display: flex;
  flex-direction: column;
  padding: 1rem;
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
  }
  form {
    width: 50%;
    border: 1px solid #cac9c9;
  }
}
</style>
