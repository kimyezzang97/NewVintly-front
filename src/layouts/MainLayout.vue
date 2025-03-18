<template>
  <v-layout>
    <v-app id="inspire">
      <v-app-bar
        color="surface-variant"
        class="d-flex justify-center align-center"
      >
        <!-- d-flex : Flexbox 활성화, justify-center : 수평 가운데, align-center : 수직 가운데 -->
        <v-container class="d-flex justify-center align-center">
          <RouterLink to="/">
            <v-img
              src="@/assets/logo_brown.png"
              width="130px"
              class="cursor-pointer"
            />
          </RouterLink>
        </v-container>
      </v-app-bar>
      <v-app-bar class="" density="compact" flat>
        <v-spacer></v-spacer>
        <v-tabs
          align-tabs="center"
          color="grey-darken-2"
          class="d-flex"
          hide-slider
        >
          <v-tab text="게시판" class="custom-tab"></v-tab>
        </v-tabs>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-tabs
          align-tabs="center"
          color="grey-darken-2"
          class="d-flex"
          hide-slider
        >
          <v-tab text="로그인" class="custom-tab"></v-tab>
          <v-tab text="회원가입" class="custom-tab"></v-tab>
        </v-tabs>
        <v-spacer></v-spacer>
      </v-app-bar>

      <v-main class="bg-grey-lighten-3">
        <v-container>
          <v-row>
            <v-col cols="12" md="2">
              <v-sheet min-height="268" rounded="lg">
                <!--  -->
              </v-sheet>
            </v-col>

            <v-col cols="12" md="8">
              <v-sheet min-height="70vh" rounded="lg">
                <!--  -->
              </v-sheet>
            </v-col>

            <v-col cols="12" md="2">
              <v-sheet min-height="268" rounded="lg">
                <!--  -->
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </v-layout>
  <!-- footer -->
  <v-footer class="text-center d-flex flex-column ga-2 py-4" color="black">
    <div class="text-caption font-weight-regular opacity-60">
      관리자 : 김예찬 | E-mail : jvintaged@naver.com ©VINTLY. ALL RIGHTS
      RESERVED
    </div>
  </v-footer>
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

<style lang="scss" scoped>
.custom-tab {
  font-size: 16px;
}
</style>
