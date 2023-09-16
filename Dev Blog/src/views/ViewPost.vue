<template>
  <main v-if="user">
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
      <p>{{ post.date }}</p>
      <p>
        Posted by <span class="text-primary">{{ post.author }}</span> at
        {{ post.time }}
      </p>
      <img :src="post.img" alt="" v-if="post.img !== ''" />

      <p>
        {{ post.content }}
      </p>
      <!-- reactions control start-->
      <div class="container" id="post-control">
        <div class="row">
          <div class="col">
            <button class="btn" @click="likePost">
              <span
                v-if="post.likeCount && post.likeCount.includes(user.email)"
              >
                <i class="fas fa-heart"></i>
              </span>
              <span v-else>
                <i class="far fa-heart"></i>
              </span>
              {{ post.likeCount ? post.likeCount.length : 0 }}
            </button>
          </div>
          <div class="col">
            <button class="btn"><i class="fa-regular fa-comment"></i>20</button>
          </div>
          <div class="col">
            <div class="dropup">
              <button
                class="btn btn dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i class="fa-solid fa-ellipsis-vertical"></i>
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li
                  v-if="
                    (user && post.authorEmail === user.email) ||
                    (user && post.admin === user.email)
                  "
                >
                  <p
                    class="dropdown-item"
                    @click="toggleIsEditPopUp"
                    :disabled="isEditPopUp"
                  >
                    Edit Post
                  </p>
                </li>
                <li
                  v-if="
                    (user && post.authorEmail === user.email) ||
                    (user && post.admin === user.email)
                  "
                >
                  <p
                    class="dropdown-item"
                    @click="toggleIsPopUp"
                    :disabled="isPopUp"
                  >
                    Delete Post
                  </p>
                </li>
                <li>
                  <p class="dropdown-item">Report post</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!-- reactions control end -->
    </div>
  </main>
</template>

<script>
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import {
  getDoc,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
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
    let isLiked = ref(false);

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

    const likePost = async () => {
      isLiked.value = !isLiked.value;

      // Step 1: Retrieve the document
      const documentSnapshot = await getDoc(docRef);

      if (documentSnapshot.exists()) {
        // Step 2: Modify the array (for example, push the user's email)
        const data = documentSnapshot.data();
        const likeCountArray = data.likeCount || []; // Ensure it's an array, initialize if it's undefined

        const email = computed(() => store.state.user.email);

        if (isLiked.value) {
          // Push the user's email only if they liked the post
          if (!likeCountArray.includes(email.value)) {
            likeCountArray.push(email.value);
          } else {
            return;
          }
        } else {
          // Remove the user's email if they unliked the post
          const index = likeCountArray.indexOf(email.value);
          if (index !== -1) {
            likeCountArray.splice(index, 1);
          }
        }

        // Step 3: Update the document in Firestore with the modified array
        await updateDoc(docRef, {
          likeCount: likeCountArray, // Update the likeCount field with the modified array
          isLiked: isLiked.value,
        });

        console.log("Like count updated successfully!");
      } else {
        console.log("Document does not exist.");
      }
    };

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
      isLiked,
      likePost,
    };
  },
};
</script>

<style scoped>
main {
  padding: 1rem;
  position: relative;
}

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

.col {
  cursor: pointer;
}

.btn {
  display: flex;
  align-items: center;
}

button {
  margin-top: 0.5rem;
}

@media (min-width: 576px) {
  .col button:hover {
    background: #fdb824ab;
  }
}
</style>
