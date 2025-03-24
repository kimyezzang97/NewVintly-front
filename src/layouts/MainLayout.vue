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
      <v-app-bar class="border-b" density="compact" flat>
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
          <v-tab
            v-if="!authStore.isAuthenticated"
            text="로그인"
            class="custom-tab"
            to="/auth/login"
          ></v-tab>
          <v-tab
            v-else
            text="로그아웃"
            class="custom-tab"
            @click="authStore.logout()"
          ></v-tab>
          <v-tab
            v-if="!authStore.isAuthenticated"
            text="회원가입"
            class="custom-tab"
            to="/auth/join"
          ></v-tab>
          <v-tab v-else text="마이페이지" class="custom-tab"></v-tab>
        </v-tabs>
        <v-spacer></v-spacer>
      </v-app-bar>

      <v-main>
        <v-container>
          <v-row>
            <!-- left 화면 가로 길이가 960 밑이면 없어짐 -->
            <v-col v-if="isMdAndUp" cols="12" md="2" class="bg-grey-lighten-3">
              <v-sheet min-height="268" rounded="lg"> </v-sheet>
            </v-col>

            <!-- MainPage -->
            <router-view />

            <!-- right 화면 가로 길이가 960 밑이면 없어짐 -->
            <v-col v-if="isMdAndUp" cols="12" md="2" class="bg-grey-lighten-3">
              <v-sheet min-height="268" rounded="lg"> </v-sheet>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </v-layout>
  <!-- footer -->
  <v-footer class="text-center d-flex flex-column ga-2 py-4" color="black">
    <div class="text-caption font-weight-regular opacity-60">
      <div>©VINTLY. ALL RIGHTS RESERVED</div>
      <div>관리자 : 김예찬 | E-mail : jvintaged@naver.com</div>
    </div>
  </v-footer>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/store/auth";
import { ref, watch } from "vue";
import { useDisplay } from "vuetify";

// Vuetify의 화면 크기 관련 정보 가져오기
const display = useDisplay();

// 화면 크기가 md (중간 크기 : 960px) 이상일 때 true
const isMdAndUp = ref(display.mdAndUp);

const authStore = useAuthStore();

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
