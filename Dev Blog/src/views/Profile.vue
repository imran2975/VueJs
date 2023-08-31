<template>
  <div>
    <div class="view">
      <h1 class="fa-fade">Account Setting</h1>
      <form>
        <div class="profile-img">
          <img :src="profileImage" alt="" />
        </div>
        <div class="form-details">
          <label for="first-name">First Name:</label>
          <input type="text" id="first-name" />
          <label for="last-name">Last Name:</label>
          <input type="text" id="last-name" />
          <label for="username">Username:</label>
          <input type="text" id="username" />
          <label for="email">Email:</label>
          <input type="email" id="email" />
        </div>

        <button class="btn btn-warning">SAVE CHANGES</button>
      </form>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
export default {
  setup() {
    const store = useStore();
    const profileImage = computed(() => store.state.img);

    return { profileImage };
  },
};
</script>

<style scoped>
.view {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url("/World Map.svg");
}

h1 {
  color: #fff;
  text-shadow: 2px 2px 2px #000;
}

form {
  width: 35%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #eeeeeed7;
  padding: 1rem;
  border-radius: 0 2rem 0 2rem;
  box-shadow: 5px 5px 10px #000;
}

.form-details {
  width: 100%;
}

.profile-img img {
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  border: 1px solid #fdb924;
}

label {
  display: block;
  margin-top: 1rem;
}

input {
  width: 100%;
  border: none;
  outline: none;
  background: #fdb8247a;
  padding: 0.5rem;
  border-radius: 5px;
}

button {
  margin-top: 1rem;
  font-weight: bold;
}

@media (max-width: 576px) {
  form {
    width: 90%;
  }
}
</style>
