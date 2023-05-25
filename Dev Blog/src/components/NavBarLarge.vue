<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light" id="navbar">
      <div class="container-fluid">
        <RouterLink
          to="/"
          class="nav-brand h2"
          :class="{ active: $route.path === '/' }"
          >Dev Blog</RouterLink
        >

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav"></ul>
        </div>
        <RouterLink
          to="/"
          class="nav-link m-2"
          :class="{ active: $route.path === '/' }"
          >Home</RouterLink
        >
        <RouterLink
          to="/"
          class="nav-link m-2"
          :class="{ active: $route.path === '/' }"
          >Posts</RouterLink
        >
        <RouterLink
          to="/"
          class="nav-link m-2"
          :class="{ active: $route.path === '/' }"
          >About Us</RouterLink
        >
        <RouterLink
          to="/"
          class="nav-link m-2"
          :class="{ active: $route.path === '/' }"
          >Blogs</RouterLink
        >
        <RouterLink
          to="/"
          class="nav-link m-2"
          :class="{ active: $route.path === '/' }"
          >Create</RouterLink
        >

        <div class="dropdown">
          <img
            src="/My Logo.png"
            alt=""
            class="dropdown-toggle m-2"
            id="dropdownMenuLink"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          />

          <ul
            class="dropdown-menu bg-dark text-white"
            aria-labelledby="dropdownMenuLink"
          >
            <div class="info">
              <img src="/My Logo.png" alt="" />
              <div class="details">
                <h6>Imran Abubakar</h6>
                <p>@Imran2975</p>
                <p>imranabubakar@gmail.com</p>
              </div>
            </div>
            <RouterLink
              to="/"
              class="nav-link dropdown-item m-2"
              :class="{ active: $route.path === '/' }"
              ><i class="fa-regular fa-user fa-fade"></i> Profile</RouterLink
            >
            <RouterLink
              to="/"
              class="nav-link dropdown-item m-2"
              :class="{ active: $route.path === '/' }"
              ><i class="fa-solid fa-arrow-right-from-bracket fa-fade"></i>
              LogOut</RouterLink
            >
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.nav-brand {
  text-decoration: none;
  color: #fdb924;
}
.navbar {
  box-shadow: 1px 1px 12px #00000075;
}
.nav-link.active {
  color: #fdb924;
}

.nav-link:hover {
  color: #fdb924;
}

.dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 72px;
  left: -170px;
}

img {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  border: 1px solid #00000075;
}

.dropdown-toggle:hover {
  cursor: pointer;
}

.dropdown-item {
  background: none;
  color: #fff !important;
}

.dropdown-item:hover {
  background: none;
}

.info {
  display: flex;
  gap: 10px;
  padding: 0.5rem;
  border-bottom: 1px solid #83828275;
}

.details {
  line-height: 0;
  font-size: small;
}
</style>
