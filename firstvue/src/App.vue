<script setup>
</script>

<template>
  <div class="hero">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/todo">Todo List</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/inc">Count</router-link> |
    </nav>
    <router-view></router-view>
  </div>
</template>
<style >
.hero {
  display: flex;
  flex-direction: column;
  align-items: center; 
}

nav {
  display: flex;
  justify-content: center;
  gap: 15px; 
  padding: 10px;
  width: 100%;
}
</style>
