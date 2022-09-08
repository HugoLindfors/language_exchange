<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="container-fluid">
      <nav>
        <!--<RouterLink to="/">Admin</RouterLink>-->
      </nav>
    </div>
  </header>

  <RouterView class="router-view"/>

  <footer>
    <p>
      Tack för att du använde min sajt! – Thank you for using my site!
    </p>
  </footer>
</template>

<style scoped>
  .router-view {
    min-height: 97vh;
  }
</style>
