<template>
  <div id="view-port">
    <form action="">
      <div class="profile-info">
        <img src="/Logo.png" alt="" />
        <h2>Imran Abubakar</h2>
      </div>
      <input type="text" name="" id="post-title" placeholder="Heading..." />
      <textarea
        name="create-post"
        id="create-post"
        cols="35"
        rows="10"
        placeholder="What's on your mind?"
        required
      ></textarea>
      <div class="post-cover">
        <label for="">Select Cover Image</label>
        <input type="file" accept="image/*" id="image-input" required />
      </div>
      <button class="post-btn">POST</button>
    </form>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#view-port {
  display: flex;
  justify-content: center;
  align-items: center;
}

form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
}

.profile-info {
  display: flex;
  align-items: center;
  margin: 1rem 0 1rem -4rem;
}

.profile-info img {
  height: 5rem;
  width: 5rem;
  border-radius: 50%;
  margin-right: 0.5rem;
}

#post-title {
  margin-left: -9rem;
  margin-bottom: 1rem;
}

textarea,
#post-title {
  background: #ebebeb;
  border: 2px solid #cfcccc;
  border-radius: 10px;
  outline: none;
  padding: 0.5rem;
}

.post-cover {
  display: flex;
  flex-direction: column;
}

.post-btn {
  width: 21rem;
  margin: 1rem 0 1rem 0;
  padding: 0.5rem 0 0.5rem 0;
  border: none;
  background: #fdb924;
  font-weight: bold;
}

@media (max-width: 576px) {
  #post-title {
    margin-left: -6rem;
  }
}
</style>
