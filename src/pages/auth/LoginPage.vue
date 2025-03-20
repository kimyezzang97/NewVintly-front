<template>
  <v-col cols="12" md="8">
    <v-sheet min-height="80vh" rounded="lg" style="margin-top: 100px">
      <div class="mt-16 mb-8 d-flex justify-center text-h5 font-weight-medium">
        로그인
      </div>

      <div class="d-flex justify-center q-gutter-lg pt-6">
        <div style="width: 380px">
          <v-text-field
            v-model="email"
            label="email을 입력해주세요."
            variant="outlined"
            color="teal-darken-2"
            style="font-size: 20px"
            maxlength="20"
          />
        </div>
      </div>

      <div class="d-flex justify-center q-gutter-lg pt-0">
        <div style="width: 380px">
          <v-text-field
            v-model="password"
            label="비밀번호를 입력해주세요."
            variant="outlined"
            color="teal-darken-2"
            style="font-size: 20px"
            type="password"
            maxlength="20"
          />
        </div>
      </div>

      <v-container class="d-flex justify-center py-16">
        <v-btn
          class="font-weight-bold"
          no-uppercase
          color="brown-lighten-2"
          style="font-size: 20px; width: 160px; height: 55px"
          @click="login()"
        >
          로그인
        </v-btn>
      </v-container>
    </v-sheet>
  </v-col>
</template>

<script setup lang="ts">
import { ref } from "vue";
const email = ref("");
const password = ref("");

const login = async () => {
  if (email.value == "") {
    alert("email을 입력해주세요.");
    return;
  }
  if (password.value == "") {
    alert("비밀번호를 입력해주세요.");
    return;
  }
};

defineOptions({
  name: "LoginPage",
});
</script>

<style scoped></style>
