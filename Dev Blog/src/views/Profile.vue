<template>
  <div class="wrapper" v-if="user">
    <!-- <div style="position: relative">
    <div
      class="alert-div"
      style="position: fixed; top: 50%; z-index: 1; width: 100vw"
      v-if="showAlert"
    >
      <svg xmlns="http://www.w3.org/2000/svg" style="display: none">
        <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
          <path
            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
          />
        </symbol>
        <symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16">
          <path
            d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
          />
        </symbol>
        <symbol
          id="exclamation-triangle-fill"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
          />
        </symbol>
      </svg>

      <div
        class="alert alert-success alert-dismissible fade show"
        style="padding: 3rem"
        role="alert"
      >
        <svg
          class="bi flex-shrink-0 me-2"
          width="24"
          height="24"
          role="img"
          aria-label="Success:"
        >
          <use xlink:href="#check-circle-fill" />
        </svg>
        Changes Saved
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
    </div>

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
  </div> -->
    <section class="profile-header bg-blue-grey-darken-4">
      <div class="profile-images">
        <div class="cover-image">
          <img src="/level.jpg" alt="" />
        </div>
        <div class="profile-pic">
          <img :src="profileImage" alt="" />
        </div>
      </div>
      <v-row justify="space-evenly" class="header-row">
        <v-col>
          <h1>Imran Abubakar</h1>
          <p>B.Sc Biochemistry</p>
        </v-col>
        <v-col>
          <v-btn class="text-capitalize bg-primary" prepend-icon="mdi-pencil"
            >Edit profile</v-btn
          >
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-tabs v-model="tab" color="#607d8b" class="tabs-link">
        <v-tab value="one" class="text-capitalize">Posts</v-tab>
        <v-tab value="two" class="text-capitalize">Liked Posts</v-tab>
        <v-tab value="three" class="text-capitalize">About</v-tab>
      </v-tabs>
    </section>
    <v-window v-model="tab">
      <v-window-item value="one" class="pa-2 post-tab">
        <v-row v-if="userPosts">
          <v-col v-for="post in userPosts" :key="post.id">
            <v-card class="mx-auto" max-width="344" variant="outlined">
              <v-img :src="post.img" height="200px" cover></v-img>

              <v-card-title> {{ post.title }} </v-card-title>

              <v-card-subtitle
                >By: {{ profileInfos.firstName }} {{ profileInfos.lastName }}
                <p>{{ post.date }} at {{ post.time }}</p>
              </v-card-subtitle>
              <v-card-text>
                {{ post.content ? post.content.slice(0, 100) : "" }}...
              </v-card-text>

              <v-card-actions>
                <v-btn
                  router
                  :to="{
                    name: 'view-post',
                    params: {
                      postId: post.postId,
                      coverImageRef: post.coverImageRef,
                    },
                  }"
                  class="bg-dark text-white"
                  >View post</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col>
            <v-card-title class="my-4"
              >You have not published a post</v-card-title
            >
          </v-col>
        </v-row>
        <div class="float-pencil">
          <v-btn
            icon="mdi-pencil-plus"
            theme="dark"
            class="float-btn"
            router
            to="/create-post"
          ></v-btn>
        </div>
      </v-window-item>

      <v-window-item value="two"> Two </v-window-item>

      <v-window-item value="three"> Three </v-window-item>
    </v-window>
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
  postCollection,
} from "../firebase/config";
import { orderBy, onSnapshot, query, where } from "firebase/firestore";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";

export default {
  data: () => ({
    tab: null,
  }),
  setup() {
    const store = useStore();
    const profileImage = computed(() => store.state.userImage);
    const profileInfos = computed(() => store.state.userData);
    const userEmail = profileInfos.value ? profileInfos.value.email : "";
    let showAlert = vueRef(false);

    const userPosts = vueRef(null);
    // const userLikedPosts = vueRef(null);

    onMounted(async () => {
      const postRefs = query(
        postCollection,
        where("authorEmail", "==", userEmail),
        orderBy("sortPostBy", "desc")
      );
      onSnapshot(postRefs, (snapshot) => {
        let posts = [];
        snapshot.docs.forEach((post) => {
          posts.push({ ...post.data(), postId: post.id });
        });
        userPosts.value = posts;
        console.log(userPosts.value);
      });
      // onSnapshot(postCollection, (snapshot) => {
      //   let posts = [];
      //   snapshot.docs.forEach((post) => {
      //     posts.push({ ...post.data(), postId: post.id });
      //   });
      //   userLikedPosts.value = posts;
      //   console.log(userLikedPosts.value);
      // });
    });

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
      showAlert.value = true;
    };

    return {
      profileImage,
      profileInfos,
      user: computed(() => store.state.user),
      authIsReady: computed(() => store.state.authIsReady),
      showAlert,
      handleSubmit,
      userPosts,
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
/* .view {
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
  overflow: hidden;
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
} */

.profile-header {
  padding: 0 14rem;
}
.profile-images {
  position: relative;
  padding-bottom: 5rem;
}
.cover-image {
  height: 20rem;
  width: 100%;
  border-radius: 1rem;
}

.cover-image img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 0 0 1rem 1rem;
}

.profile-pic {
  height: 10rem;
  width: 10rem;
  border: solid 5px #607d8b;
  border-radius: 50%;
  position: absolute;
  top: 15rem;
  left: 5rem;
}
.profile-pic img {
  height: 100%;
  width: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.header-row {
  width: 170%;
}

.post-tab {
  min-height: 50vh;
  background: #ebebeb;
  position: relative;
}

.float-pencil {
  position: fixed;
  bottom: 4rem;
  right: 1rem;
}

@media (max-width: 576px) {
  .profile-header {
    padding: 0;
    text-align: center;
  }
  .profile-pic {
    left: 6rem;
  }
  .header-row {
    display: flex;
    flex-direction: column;
    width: 110%;
  }
}
</style>