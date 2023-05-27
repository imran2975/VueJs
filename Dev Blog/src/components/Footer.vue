<template>
  <div class="d-flex bg-dark text-white">
    <div>
      <RouterLink to="/" class="nav-brand h2 d-block">Dev Blog</RouterLink>
      <i class="fa-brands fa-instagram m-2"></i>
      <i class="fa-brands fa-linkedin m-2"></i>
      <i class="fa-brands fa-twitter m-2"></i>
      <i class="fa-brands fa-youtube m-2"></i>
      <i class="fa-brands fa-facebook m-2"></i>
    </div>

    <p>Copy Right 2023 All Right Reserved</p>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
a {
  text-decoration: none;
  color: #fff;
}

.d-flex {
  align-items: center;
  justify-content: space-between;
  margin: 0;
  padding: 5rem;
}

@media (max-width: 576px) {
  .d-flex {
    flex-direction: column;
    align-items: start;
    justify-content: left !important;
    width: 100%;
    padding: 1rem;
  }
}
</style>
