<template>
  <div class="main">
    <h1 class="about">About Us</h1>
    <p class="text-gray-600 leading-relaxed">
      Welcome to our application! Our goal is to provide users with an intuitive and
      interactive experience. Built with Vue.js, this application ensures high performance
      and responsiveness.
    </p>
    <p class="text-gray-600 mt-4">
      We are constantly improving and adding new features. Stay connected with us for
      updates and enhancements.
    </p>

  </div>
</template>

<script>
export default {
  name: "AboutPage",
};
</script>

<style>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
</style>