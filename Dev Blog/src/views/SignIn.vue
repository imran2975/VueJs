<template>
  <div class="view">
    <form @submit.prevent="handleSubmit">
      <div class="logo">
        <h1 class="text-warning">D</h1>
        <h2>ev Blog</h2>
      </div>
      <div class="email-field">
        <i class="fa-solid fa-envelope fa-fade" id="icon"></i>
        <input
          type="email"
          name=""
          id="email"
          placeholder="Email"
          v-model="email"
          required
        />
      </div>
      <div class="password-field">
        <i class="fa-solid fa-lock fa-shake" id="icon"></i>
        <input
          type="password"
          name=""
          id="password"
          placeholder="Password"
          v-model="password"
          required
        />
      </div>
      <button class="btn btn-warning">Sign In</button>

      <div v-if="error">{{ error }}</div>
      <div class="check-forgot-password">
        <div class="keep-signed-in">
          <label class="custom-checkbox">
            <input type="checkbox" />
            <span class="checkmark"></span>
            Remember Me
          </label>
        </div>
        <div class="forgot-password">
          <RouterLink to="/reset" class="forgot text-light fa-fade"
            >Forgot Password?</RouterLink
          >
        </div>
      </div>
      <div class="signup-needhelp">
        <RouterLink to="/sign-up" class="links">CREATE ACCOUNT</RouterLink>
        <RouterLink to="/contact-us" class="links">NEED HELP?</RouterLink>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const error = ref("");

    const store = useStore();
    const router = useRouter();

    const handleSubmit = async () => {
      try {
        await store.dispatch("signin", {
          email: email.value,
          password: password.value,
        });
        router.push("/");
      } catch (err) {
        error.value = err.message;
      }
    };

    return { email, password, handleSubmit, error };
  },
};
</script>

<style scoped>
.view {
  background: url("/bg.svg");
  background-size: cover;
  height: 80vh;
  width: 100vw;
}

form {
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.logo {
  display: flex;
  align-items: baseline;
}

.logo h1 {
  font-size: 3rem;
}

.email-field,
.password-field {
  position: relative;
  color: #fff;
  background: #444343b0;
  margin-bottom: 1rem;
  padding-left: 1rem;
  border-radius: 2rem;
  height: 3rem;
  width: 80%;
}

.email-field input,
.password-field input {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  padding: 1rem 1rem 1rem 2.5rem;
  background: none;
  border: none;
  outline: none;
  color: #fff;
}

.email-field input::placeholder,
.password-field input::placeholder {
  color: #ffffff94;
}

/* Style for input fields during autofill */
input:-webkit-autofill {
  -webkit-text-fill-color: #fff; /* Text color */
  background: #444343b0 !important; /* Background color */
  box-shadow: 0 0 0 1000px #444343b0 inset !important;
  border-radius: 2rem;
}

#icon {
  position: absolute;
  top: 1rem;
}

button {
  width: 80%;
  font-weight: bold;
  border-radius: 2rem;
  padding: 0.6rem;
  margin-bottom: 1rem;
}

.check-forgot-password,
.signup-needhelp {
  display: flex;
  justify-content: space-between;
  width: 80%;
}

.custom-checkbox {
  position: relative;
  padding-left: 30px; /* Space for the custom checkbox */
  cursor: pointer;
  color: #ffffff94;
}

.custom-checkbox input {
  position: absolute;
  opacity: 0; /* Hide the default checkbox */
  cursor: pointer;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: #eee; /* Default checkbox color */
}

.custom-checkbox input:checked + .checkmark {
  background-color: #fdb924; /* Change color when checkbox is checked */
}

/* Style the checkmark to look like a checkbox */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.custom-checkbox input:checked + .checkmark:after {
  display: block;
  left: 7px;
  top: 3px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.forgot {
  color: #ffffff94;
  border-bottom: 2px solid #fff;
  text-shadow: 2px 2px 3px #000;
}

.links {
  text-decoration: none;
  color: #fff;
}

.custom-checkbox:hover,
.forgot:hover,
.links:hover {
  color: #fdb924;
  text-shadow: 2px 2px 3px #000;
}

@media (min-width: 576px) {
  form,
  .view {
    height: 100vh;
  }
  .email-field,
  .password-field {
    width: 30%;
  }
  button,
  .check-forgot-password,
  .signup-needhelp {
    width: 30%;
  }
}
</style>
