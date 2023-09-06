<template>
  <div>
    <div class="view">
      <h1 class="fa-fade">Account Setting</h1>
      <form @submit.prevent="uploadProfileImage">
        <div class="profile-img">
          <img :src="profileImage" alt="" />
          <input
            type="file"
            name="image"
            id="imageInput"
            accept="image/jpeg, image/png"
            ref="profilePic"
            required
          />
        </div>
        <p class="fa-fade" v-if="!authIsReady && !profileInfos">
          please wait...
        </p>
        <div class="form-details" v-if="authIsReady && profileInfos">
          <label for="first-name">First Name:</label>
          <input type="text" id="first-name" v-model="profileInfos.firstName" />
          <label for="last-name">Last Name:</label>
          <input type="text" id="last-name" v-model="profileInfos.lastName" />
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="profileInfos.userName" />
          <label for="email">Email:</label>
          <input
            type="email"
            id="email"
            disabled
            v-model="profileInfos.email"
          />
        </div>

        <button class="btn btn-warning" @click="handleSubmit">
          SAVE CHANGES
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, ref as vueRef, onMounted } from "vue";
import {
  storage,
  getDocs,
  usersCollection,
  updateDoc,
  doc,
} from "../firebase/config";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";

export default {
  setup() {
    const store = useStore();
    const profileImage = computed(() => store.state.userImage);
    const profileInfos = computed(() => store.state.userData);

    const handleSubmit = () => {
      const userEmail = store.state.user.email;

      // first get doc before updating it
      getDocs(usersCollection)
        .then((snapshot) => {
          let users = [];
          snapshot.docs.forEach((doc) => {
            users.push({ ...doc.data(), id: doc.id });
          });
          const filteredUser = users.filter((user) => user.email === userEmail);
          console.log(filteredUser[0].id);

          // updating doc
          const docRef = doc(usersCollection, filteredUser[0].id);
          updateDoc(docRef, {
            firstName: `${profileInfos.value.firstName}`,
            lastName: `${profileInfos.value.lastName}`,
            userName: `${profileInfos.value.userName}`,
          });
        })
        .catch((err) => {
          console.log(err.message);
        });
    };

    return {
      profileImage,
      profileInfos,
      user: computed(() => store.state.user),
      authIsReady: computed(() => store.state.authIsReady),

      handleSubmit,
    };
  },

  methods: {
    uploadProfileImage: function () {
      const userId = this.$store.state.user.uid;
      const storageRef = ref(storage, `image/${userId}.jpg`);
      const imageFile = this.$refs.profilePic.files[0];

      uploadBytes(storageRef, imageFile)
        .then(async (snapshot) => {
          console.log("Image uploaded successfully.");
          getDownloadURL(ref(storage, `image/${userId}.jpg`)).then(
            (download_url) => this.$store.commit("setUserImage", download_url)
          );
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    },
  },
};
</script>

<style scoped>
.view {
  width: 100vw;
  height: 110vh;
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

.profile-img input {
  margin-left: 3rem;
  margin-top: 1rem;
  width: 80%;
}

.profile-img img {
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  border: 1px solid #fdb924;
  margin-left: 5rem;
  object-fit: cover;
}

label {
  display: block;
  margin-top: 1rem;
}

.form-details input {
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

  .view {
    height: 100vh;
  }
}

@media (min-width: 576px) {
  .profile-img input {
    margin-left: 8rem;
  }
  .profile-img img {
    margin-left: 10rem;
  }
}
</style>
