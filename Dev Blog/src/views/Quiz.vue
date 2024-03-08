<template>
  <div class="wrapper bg-blue-grey-darken-4 pt-4">
    <h1 class="text-center">
      <span class="text-uppercase"> {{ courseCode + ": " }}</span>
      <span class="text-capitalize">{{ courseTitle }} </span>
    </h1>

    <v-card class="mx-auto bg-blue-grey pa-4" max-width="700">
      <div class="d-flex justify-space-between" v-if="!quizCompleted">
        <h3>{{ getCurrentQuestion.question }}</h3>
        <span>{{ questionProgress }}/{{ lecture.length }}</span>
      </div>

      <v-list lines="two" class="bg-blue-grey" v-if="!quizCompleted">
        <v-list-item
          v-for="(option, index) in getCurrentQuestion.options"
          :key="index"
        >
          <label
            class="bg-blue-grey-darken-4 pa-3 px-3"
            :class="`option ${
              getCurrentQuestion.selected == index
                ? index == getCurrentQuestion.answer
                  ? 'correct'
                  : 'wrong'
                : ''
            } ${
              getCurrentQuestion.selected != null &&
              index != getCurrentQuestion.selected
                ? 'disabled'
                : ''
            }`"
          >
            <input
              class="d-none"
              type="radio"
              :id="'option' + index"
              :name="getCurrentQuestion.index"
              :value="index"
              v-model="getCurrentQuestion.selected"
              :disabled="getCurrentQuestion.selected"
              @change="setAnswer"
            /><span>{{ option }}</span>
          </label>
        </v-list-item>
      </v-list>

      <v-card-actions v-if="!quizCompleted">
        <v-btn
          color="#00E676"
          rounded="1"
          variant="flat"
          @click="nextQuestion"
          :disabled="!getCurrentQuestion.selected"
        >
          {{
            getCurrentQuestion.index == questions.length - 1
              ? "finish"
              : getCurrentQuestion.selected == null
              ? "select an option"
              : "next question"
          }}
        </v-btn>
      </v-card-actions>
      <v-sheet
        class="d-flex align-center justify-center flex-wrap text-center mx-auto px-4 bg-blue-grey"
        elevation="4"
        height="250"
        rounded
        max-width="800"
        width="100%"
        v-if="quizCompleted"
      >
        <div>
          <h2
            class="text-h4 font-weight-black text-orange"
            v-if="score > lecture.length / 2"
          >
            Congratulations!
          </h2>
          <h2
            class="text-h4 font-weight-black text-orange"
            v-if="score < lecture.length / 2"
          >
            OPPS!
          </h2>

          <div class="text-h5 font-weight-medium mb-2">
            You have completed the quiz!
          </div>

          <p class="text-body-2 mb-4" v-if="score > questions.length / 2">
            you did well 😊
          </p>
          <p class="text-body-2 mb-4" v-if="score < questions.length / 2">
            you did bad 🙄 try again
          </p>

          <v-btn variant="text" color="orange" router to="/study"
            >Go back</v-btn
          >
          <v-btn variant="text" color="orange" @click="reloadPage"
            >Play again</v-btn
          >
        </div>
      </v-sheet>
    </v-card>

    <v-dialog
      v-model="selectLecture"
      width="500"
      persistent
      transition="dialog-top-transition"
    >
      <v-card class="bg-blue-grey-darken-4">
        <v-toolbar color="primary" title="Please select lecture"></v-toolbar>
        <v-card-text>
          <v-list lines="two" class="bg-blue-grey-darken-4">
            <v-list-item
              v-for="lecture in lecturesArray"
              :key="lecture.start"
              class="bg-blue-grey my-1"
              rounded="1"
              @click="
                (selectLecture = false),
                  selectedLecture(lecture.start, lecture.end)
              "
            >
              {{ lecture.title }}
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import questionData from "../assets/questionData.json";
import chm2242 from "../questions/level200/second/organic.json";

const route = useRoute();
const router = useRouter();
const courseTitle = computed(() => route.params.title);
const courseCode = computed(() => route.params.courseCode);
const questionProgress = ref(0);

//modal
const selectLecture = ref(true);

let questions = ref([]);

if (courseCode.value == "gsp1201") {
  questions = ref(questionData);
} else if (courseCode.value === "chm2242") {
  questions = ref(chm2242);
} else {
  questions = ref([]);
}

const lecturesArray = [
  {
    title: "Lecture 1",
    start: 0,
    end: 100,
  },
  {
    title: "Lecture 2",
    start: 100,
    end: 200,
  },
  {
    title: "Lecture 3",
    start: 200,
    end: 300,
  },
  {
    title: "Lecture 4",
    start: 300,
    end: 400,
  },
  {
    title: "Lecture 5",
    start: 400,
    end: 500,
  },
  {
    title: "Lecture 6",
    start: 500,
    end: 600,
  },
];

// the json files contains bunch of questions of all lectures. each lecture having at least 70 question so the variable will be slicing the array according to the selected lecture
const lecture = ref([]);
const selectedLecture = (start, end) => {
  lecture.value = questions.value.slice(start, end);
  currentQuestion.value = 0; // Reset the current question index
  quizCompleted.value = false; // Reset the quiz completion status
};

const quizCompleted = ref(false);
const currentQuestion = ref(0);
const score = computed(() => {
  let value = 0;
  lecture.value.map((q) => {
    if (q.selected != null && q.answer == q.selected) {
      console.log("correct");
      value++;
    }
  });
  return value;
});

const getCurrentQuestion = computed(() => {
  if (
    currentQuestion.value >= 0 &&
    currentQuestion.value < lecture.value.length
  ) {
    let question = lecture.value[currentQuestion.value];
    question.index = currentQuestion.value;
    return question;
  } else {
    return {};
  }
});

const setAnswer = (e) => {
  lecture.value[currentQuestion.value].selected = e.target.value;
  e.target.value = null;
};

const nextQuestion = () => {
  if (currentQuestion.value < lecture.value.length - 1) {
    currentQuestion.value++;
    questionProgress.value++;

    return;
  }

  quizCompleted.value = true;
};

const reloadPage = () => {
  router.go(0); // Reload the current page
};
</script>

<style scoped>
.wrapper {
  height: 100vh;
  width: 100vw;
}

label {
  width: 100%;
  height: 100%;
  border-radius: 5px;
  cursor: pointer;
}

.option:hover {
  background-color: #2d213f;
}

.option.correct {
  background-color: #00e676 !important;
}

.option.wrong {
  background-color: #ff5a5f !important;
}

.option:last-of-type {
  margin-bottom: 0;
}

.option.disabled {
  opacity: 0.5;
}
</style>
