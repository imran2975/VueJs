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
                <i class="fas fa-heart text-danger"></i>
              </span>
              <span v-else>
                <i class="far fa-heart"></i>
              </span>
              {{ post.likeCount ? post.likeCount.length : 0 }}
            </button>
          </div>
          <div class="col">
            <button class="btn">
              <i class="fa-regular fa-comment"></i
              >{{ commentsArray ? commentsArray.length : 0 }}
            </button>
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
                    <i class="fa-solid fa-pen-to-square text-success"></i>
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
                    Delete Post<i class="fa-solid fa-trash text-danger"></i>
                  </p>
                </li>
                <li>
                  <p class="dropdown-item">
                    Report post<i
                      class="fa-solid fa-triangle-exclamation text-warning"
                    ></i>
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!-- reactions control end -->
    </div>
    <div class="comment-sect">
      <form @submit.prevent="handleComment">
        <input
          type="text"
          name=""
          id=""
          placeholder="Comment Here"
          v-model="commentContents"
          required
        /><button class="btn btn-primary">
          <i class="fa-solid fa-paper-plane"></i>
        </button>
      </form>
    </div>

    <!-- display comments available -->
    <div class="display-comments">
      <div class="contents">
        <table class="table table-striped" v-if="commentsArray">
          <tbody v-for="comment in commentsArray" :key="comment.sortCommentsBy">
            <tr>
              <td><img :src="comment.image" alt="" /></td>
              <td>
                <h6
                  style="
                    display: flex;
                    text-wrap: nowrap;
                    align-items: center;
                    justify-content: space-between;
                  "
                >
                  {{ comment.firstName }} {{ comment.lastName }}
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
                    <ul
                      class="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li
                        v-if="
                          (user && post.authorEmail === user.email) ||
                          (user && post.admin === user.email) ||
                          (user && comment.email === user.email)
                        "
                        @click="toggleIsEditPopUp"
                      >
                        <p class="dropdown-item" :disabled="isEditPopUp">
                          Edit
                          <i class="fa-solid fa-pen-to-square text-success"></i>
                        </p>
                      </li>
                      <li
                        v-if="
                          (user && post.authorEmail === user.email) ||
                          (user && post.admin === user.email) ||
                          (user && comment.email === user.email)
                        "
                        @click="deleteComment(comment.id)"
                      >
                        <p class="dropdown-item" :disabled="isPopUp">
                          Delete <i class="fa-solid fa-trash text-danger"></i>
                        </p>
                      </li>
                      <li>
                        <p class="dropdown-item">
                          Report
                          <i
                            class="fa-solid fa-triangle-exclamation text-warning"
                          ></i>
                        </p>
                      </li>
                    </ul>
                  </div>
                </h6>
                <p style="opacity: 0.5; margin-top: -1.3rem">
                  {{ comment.userName }}
                </p>
                <p style="margin-top: -1.5rem; opacity: 0.6">
                  {{ comment.time }} {{ comment.date }}
                </p>
                <p class="text-capitalize">{{ comment.content }}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
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
  query,
  orderBy,
} from "firebase/firestore";
import { ref as fireRef, deleteObject } from "firebase/storage";
import {
  postCollection,
  storage,
  addComment,
  commentsCollection,
} from "../firebase/config";
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

    // comments array
    let commentsArray = ref(null);

    onMounted(async () => {
      try {
        onSnapshot(docRef, (snapshot) => {
          post.value = snapshot.data();
          console.log("Data retrieved:", post.value);

          // comments snapshot
          const postRefs = query(
            commentsCollection,
            orderBy("sortCommentsBy", "desc")
          );
          onSnapshot(postRefs, (snapshot) => {
            let comments = [];
            snapshot.docs.forEach((comment) => {
              comments.push({ ...comment.data(), id: comment.id });
            });
            const filteredComments = comments.filter(
              (c) => c.commentPostId === postId.value
            );

            commentsArray.value = filteredComments;

            console.log(commentsArray.value);
          });
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

    // EveryThing about creating comment
    const commentContents = ref("");
    const sortCommentsBy = new Date().getTime();
    const userInfos = computed(() => store.state.userData);
    const profileImage = computed(() => store.state.userImage);

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

    const handleComment = async () => {
      await addComment({
        commentPostId: postId.value,
        sortCommentsBy: sortCommentsBy,
        email: userInfos.value?.email || "",
        firstName: userInfos.value?.firstName || "",
        lastName: userInfos.value?.lastName || "",
        userName: userInfos.value?.userName || "",
        image: profileImage.value,
        content: commentContents.value,
        date: postDate,
        time: postTime,
      });

      commentContents.value = "";
    };

    // deleting comment
    const deleteComment = (id) => {
      const commentRef = doc(commentsCollection, id);
      deleteDoc(commentRef)
        .then(() => {
          // Create a reference to the file to delete
          console.log("Comment Removed");
        })
        .catch((err) => {
          console.log(err.message);
        });
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
      commentContents,
      handleComment,
      commentsArray,
      deleteComment,
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

.post-control .fa-pen-to-square {
  margin-left: -2rem;
  color: lightgreen;
}

.post-control .fa-trash {
  margin-left: -7rem !important;
  color: crimson;
}

.post-control .fa-triangle-exclamation {
  margin-left: -3rem;
}

.post-control .dropdown-item {
  display: flex;
  justify-content: flex-start;
  width: 100vw;
}

form .fa-pen-to-square,
form .fa-trash,
form .fa-triangle-exclamation {
  margin-left: 10rem;
}

button {
  margin-top: 0.5rem;
}

table img {
  height: 4rem;
  width: 4rem;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #fdb824ab;
}

form {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 1rem 0;
}

input {
  outline: none;
  padding: 0.5rem;
}

form button {
  padding: 0.8rem 1.5rem;
  margin-top: -0.2rem;
}

@media (min-width: 576px) {
  .col button:hover {
    background: #fdb824ab;
  }
}
</style>
