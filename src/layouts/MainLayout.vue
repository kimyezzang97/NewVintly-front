<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar color="surface-variant" title="">
      <!-- d-flex : Flexbox 활성화, justify-center : 수평 가운데, align-center : 수직 가운데 -->
      <v-container class="d-flex justify-center">
        <RouterLink to="/">
          <v-img
            src="@/assets/logo_brown.png"
            width="130px"
            class="cursor-pointer"
          />
          <!-- 해상도는 1440으로 하자 -->
        </RouterLink>
      </v-container>
    </v-app-bar>

    <v-main
      class="d-flex align-center justify-center"
      style="min-height: 300px"
    >
      Main Content
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
defineOptions({
  name: "MainLayout",
});

// const linksList = [
//   {
//     title: 'Login',
//     to: '/login',
//   },
//   {
//     title: 'Join',
//     to: '/join',
//   },
// ];
</script>

<style lang="scss" scoped></style>
