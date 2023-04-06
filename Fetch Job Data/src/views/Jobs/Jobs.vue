<template>
  <div>
    <h1>Jobs</h1>
    <div v-if="jobs.length">
      <div v-for="job in jobs" :key="job.id" class="job">
        <RouterLink :to="{ name: 'JobDetail', params: { id: job.id } }">
          <h2>{{ job.title }}</h2>
        </RouterLink>
      </div>
    </div>
    <div v-else class="load">Loading available jobs...</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      jobs: [],
    };
  },
  mounted() {
    fetch("http://localhost:3000/jobs")
      .then((res) => res.json())
      .then((data) => (this.jobs = data))
      .catch((err) => console.log(err.message));
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

.load {
  text-align: center;
}
</style>
