<template>
  <div class="container-fluid">
    <div class="row">
      <div :class="sidebarClasses">
        <!-- Sidebar Toggle Button -->
        <button class="btn btn-dark sidebar-toggle" @click="toggleSidebar">
          <span>Collapse</span>
          <span>Expand</span>
        </button>

        <!-- Sidebar Content -->
        <ul class="nav flex-column">
          <li class="nav-item">
            <router-link to="/" class="nav-link text-light">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link text-light"
              >About</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/services" class="nav-link text-light"
              >Services</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/contact" class="nav-link text-light"
              >Contact</router-link
            >
          </li>
        </ul>
      </div>
      <div class="col-9">
        <!-- Main Content -->
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped></style>
