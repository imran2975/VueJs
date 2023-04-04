<template>
  <div>
    <h1>Jobs</h1>
    <div v-for="job in jobs" :key="job.id" class="job">
      <RouterLink :to="{ name: 'JobDetail', params: { id: job.id } }">
        <h2>{{ job.title }}</h2>
      </RouterLink>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      jobs: [
        {
          title: "UX Designer",
          id: 1,
          details: "Undergraduates are not considered 🙄, only self taught 😉",
        },
        {
          title: "Web Developer",
          id: 2,
          details: "Undergraduates are not considered 🙄, only self taught 😉",
        },
        {
          title: "Vue Developer",
          id: 3,
          details: "Undergraduates are not considered 🙄, only self taught 😉",
        },
      ],
    };
  },
};
</script>

<style scope>
.job {
  max-width: 600px;
  margin: 0 auto;
}
.job h2 {
  background: #f4f4f4;
  padding: 20px;
  border-radius: 20px;
  margin: 10px auto;
  max-width: 600px;
  cursor: pointer;
  color: #444;
}

.job h2:hover {
  background: #ddd;
}
</style>
