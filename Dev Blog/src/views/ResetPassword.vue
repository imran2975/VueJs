<template>
  <div class="view">
    <EmailSent class="fa-fade" v-if="sent" :removePopUp="closePopUp" />
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

      <button class="btn btn-warning">Reset</button>
      <p>{{ error }}</p>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import EmailSent from "../components/EmailSent.vue";

export default {
  name: "ResetPassword",
  components: { EmailSent },
  setup() {
    const email = ref("");
    const error = ref("");
    const sent = ref(false);

    const closePopUp = () => {
      sent.value = !sent.value;
    };

    const router = useRouter();

    const handleSubmit = async () => {
      sendPasswordResetEmail(getAuth(), email.value)
        .then(() => {
          // Password reset email sent!
          sent.value = true;
        })
        .catch((err) => {
          // const errorCode = error.code;
          error.value = err.message;
          // ..
        });
    };

    return { email, handleSubmit, error, sent, closePopUp };
  },
};
</script>

<style scoped>
.view {
  background: url("/bg.svg");
  background-size: cover;
  height: 80vh;
  width: 100vw;
  position: relative;
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
