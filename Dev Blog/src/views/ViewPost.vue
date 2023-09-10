<template>
  <main>
    <Confirm
      class="confirm"
      :removePost="deletePost"
      :removePopUp="toggleIsPopUp"
      v-if="isPopUp"
    />
    <EditPost
      class="confirm"
      :removePopUp="toggleIsEditPopUp"
      v-if="isEditPopUp"
    />

    <div class="wrapper" v-if="post">
      <h1>{{ post.title }}</h1>
      <!-- for the span tag containing post author i mght use it to show author's profile -->
      <p>
        Posted by <span class="text-primary">{{ post.author }}</span> on
        September 07, 2023
      </p>
      <img :src="post.img" alt="" v-if="post.img !== ''" />

      <p>
        {{ post.content }}
      </p>
      <div
        class="post-control"
        v-if="
          (user && post.authorEmail === user.email) || post.admin === user.email
        "
      >
        <!-- in the future i might make this functionable by editting and deleting in the component with vuex aid but only firebase  -->
        <button
          class="btn btn-primary"
          @click="toggleIsEditPopUp"
          :disabled="isEditPopUp"
        >
          Edit Post
        </button>
        <button
          class="btn btn-danger"
          @click="toggleIsPopUp"
          :disabled="isPopUp"
        >
          Delete Post
        </button>
      </div>
    </div>
  </main>
</template>

<script>
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { getDoc, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { ref as fireRef, deleteObject } from "firebase/storage";
import { postCollection, storage } from "../firebase/config";
import { onMounted, ref, computed } from "vue";
import Confirm from "../components/Confirm.vue";
import EditPost from "../components/EditPost.vue";
export default {
  name: "ViewPost",
  components: { Confirm, EditPost },
  setup() {
    const store = useStore();
    const user = computed(() => store.state.user);
    const router = useRouter();
    const route = useRoute();
    const postId = computed(() => route.params.postId);
    const docRef = doc(postCollection, postId.value);
    const post = ref({});
    const isPopUp = ref(false);
    const isEditPopUp = ref(false);

    onMounted(async () => {
      try {
        onSnapshot(docRef, (snapshot) => {
          post.value = snapshot.data();
          console.log("Data retrieved:", post.value);
        });
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    });

    const deletePost = () => {
      deleteDoc(docRef).then(() => {
        // Create a reference to the file to delete
        const imageLocation = computed(() => route.params.coverImageRef);
        const imageRef = fireRef(
          storage,
          `postCovers/${imageLocation.value}.jpg`
        );

        // Delete the file
        deleteObject(imageRef)
          .then(() => {
            // File deleted successfully
            console.log("Deleted");
          })
          .catch((error) => {
            // Uh-oh, an error occurred!
            console.log(error);
          });

        router.push("/blogs");
      });
    };

    const toggleIsPopUp = () => {
      isPopUp.value = !isPopUp.value;
    };
    const toggleIsEditPopUp = () => {
      isEditPopUp.value = !isEditPopUp.value;
    };

    return {
      user,
      post,
      deletePost,
      toggleIsPopUp,
      toggleIsEditPopUp,
      isPopUp,
      isEditPopUp,
    };
  },
};
</script>

<style scoped>
main {
  /* display: flex;
  justify-content: center; */
  padding: 1rem;
  position: relative;
}

/* .confirm {
  position: fixed;
  top: 40%;
  left: 0;
  width: 20rem;
  box-shadow: 2px 2px 5px #000;
  padding: 2rem;
} */

.wrapper {
  width: 100%;
}

.wrapper * {
  width: 100%;
}

span {
  font-style: italic;
  font-weight: bold;
}

button {
  margin-top: 0.5rem;
}

@media (min-width: 576px) {
  /* .confirm {
    top: 40%;
    left: 5%;
  } */
}
</style>
