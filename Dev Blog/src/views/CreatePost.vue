<template>
  <div class="wrapper" v-if="userInfos">
    <form @submit.prevent="uploadPostCover">
      <div class="profile-info">
        <img :src="profileImage" alt="" />
        <h2 v-if="userInfos">
          {{ userInfos.firstName }} {{ userInfos.lastName }}
        </h2>
      </div>
      <input
        type="text"
        name=""
        id="post-title"
        placeholder="Heading..."
        required
        v-model="postTitle"
      />
      <textarea
        name="create-post"
        id="create-post"
        cols="35"
        rows="10"
        placeholder="What's on your mind?"
        required
        v-model="postContent"
      ></textarea>
      <div class="post-cover">
        <label for="">Select Cover Image</label>
        <input
          type="file"
          name="image"
          id="imageInput"
          accept="image/jpeg, image/png"
          ref="postCoverImage"
          required
        />
      </div>
      <button class="post-btn">POST</button>
    </form>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import {
  auth,
  getDocs,
  addUser,
  addPost,
  updateDoc,
  doc,
  query,
  where,
  usersCollection,
  postCollection,
  storage,
} from "../firebase/config";
import { ref as fireRef, getDownloadURL, uploadBytes } from "firebase/storage";
import { useRouter } from "vue-router";

import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const userInfos = computed(() => store.state.userData);
    const profileImage = computed(() => store.state.userImage);
    const postTitle = ref("");
    const postContent = ref("");
    const coverImageId = ref(randomId(20));
    const sortPostBy = new Date().getTime();

    function getCurrentDateTime() {
      const now = new Date();

      const optionsDate = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };

      const optionsTime = {
        hour: "numeric",
        minute: "numeric",
        hour12: true, // Use 12-hour format
      };

      const postDate = now.toLocaleString(undefined, optionsDate);
      const postTime = now.toLocaleString(undefined, optionsTime);

      return { postDate, postTime };
    }

    const { postDate, postTime } = getCurrentDateTime();
    console.log("Current Date:", postDate);
    console.log("Current Time:", postTime);

    function randomId(length) {
      if (length <= 0) {
        throw new Error("Length must be greater than 0");
      }
      if (length > 20) {
        throw new Error("Length cannot exceed 20");
      }
      // Calculate the minimum and maximum values for the desired length
      const min = Math.pow(10, length - 1);
      const max = Math.pow(10, length) - 1;
      // Generate a random integer within the specified range
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      // Format the number to have exactly 'length' digits by adding leading zeros
      const formattedNumber = String(randomNumber).padStart(length, "0");
      return formattedNumber;
    }

    // const uploadPostCover = (data) => {
    //   const imageFile = document.getElementById("image-input").files[0];
    //   store.dispatch("createPost", data, imageFile);
    // };

    const handleSubmit = async (refId) => {
      await store.dispatch("createPost", {
        title: postTitle.value,
        author: `${store.state.userData.firstName} ${store.state.userData.lastName}`,
        content: postContent.value,
        authorEmail: store.state.user.email,
        coverImageRef: refId,
        admin: "imranabubakar943@gmail.com",
        sortPostBy: sortPostBy,
        time: postTime,
        date: postDate,
        likeCount: [],
        isLiked: null,
      });
      router.push("/blogs");
    };

    return {
      profileImage,
      userInfos,
      postTitle,
      postContent,
      handleSubmit,
      randomId,
      coverImageId,
    };
  },

  methods: {
    uploadPostCover: function () {
      this.handleSubmit(this.coverImageId);
      const imageFile = this.$refs.postCoverImage.files[0];
      const storageRef = fireRef(
        storage,
        `postCovers/${this.coverImageId}.jpg`
      );
      uploadBytes(storageRef, imageFile)
        .then(async (snapshot) => {
          getDownloadURL(
            fireRef(storage, `postCovers/${this.coverImageId}.jpg`)
          ).then((download_url) => {
            getDocs(postCollection)
              .then((snapshot) => {
                let posts = [];
                snapshot.docs.forEach((doc) => {
                  posts.push({ ...doc.data(), postId: doc.id });
                });
                const filteredPost = posts.filter(
                  (post) => post.coverImageRef === this.coverImageId
                );
                console.log(filteredPost[0].id, download_url);

                // context.commit("setUpdateNewPost", {
                //   postId: filteredPost[0].id,
                //   img: download_url,
                // });
                // updating doc
                const docRef = doc(postCollection, filteredPost[0].postId);
                updateDoc(docRef, {
                  img: download_url,
                });
              })
              .catch((err) => {
                console.log(err.message);
              });
          });
          console.log("Post Cover Uploaded");
        })
        .catch((err) => console.log(err.message));
    },
  },
};
</script>

<style scoped>
.wrapper {
  background: url("/World Map.svg");
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
  .hi {
    background: none;
  }
}
</style>
