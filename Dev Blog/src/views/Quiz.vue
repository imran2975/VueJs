<template>
  <div class="wrapper bg-blue-grey-darken-4 pt-4">
    <h1 class="text-center">Biology {{ courseCode }}</h1>

    <v-card class="mx-auto bg-blue-grey pa-4" max-width="700">
      <div class="d-flex justify-space-between" v-if="!quizCompleted">
        <h3>{{ getCurrentQuestion.question }}</h3>
        <span>{{ score }}/{{ questions.length }}</span>
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
            v-if="score > questions.length / 2"
          >
            Congratulations!
          </h2>
          <h2
            class="text-h4 font-weight-black text-orange"
            v-if="score < questions.length / 2"
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
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import questionData from "../assets/questionData.json";

const route = useRoute();
const router = useRouter();
const courseCode = computed(() => route.params.courseCode);

let questions = ref([]);

if (courseCode.value === "GSP1201") {
  questions = ref(questionData);
} else {
  questions = ref([]);
}

const quizCompleted = ref(false);
const currentQuestion = ref(0);
const score = computed(() => {
  let value = 0;
  questions.value.map((q) => {
    if (q.selected != null && q.answer == q.selected) {
      console.log("correct");
      value++;
    }
  });
  return value;
});

const getCurrentQuestion = computed(() => {
  let question = questions.value[currentQuestion.value];
  question.index = currentQuestion.value;
  return question;
});

const setAnswer = (e) => {
  questions.value[currentQuestion.value].selected = e.target.value;
  e.target.value = null;
};

const nextQuestion = () => {
  if (currentQuestion.value < questions.value.length - 1) {
    currentQuestion.value++;
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
