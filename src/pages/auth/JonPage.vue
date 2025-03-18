<template>
  <v-col cols="12" md="8">
    <v-sheet min-height="70vh" rounded="lg">
      <div class="mt-12 mb-8 d-flex justify-center text-h5 font-weight-medium">
        회원가입
      </div>

      <v-tabs class="mt-12">
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <div><span class="text-red">*</span>는 필수입력 사항입니다.</div>
        <v-spacer></v-spacer>
      </v-tabs>

      <v-divider
        class="custom-divider"
        thickness="3px"
        color="#004d40"
        style="margin-bottom: 15px"
      ></v-divider>

      <v-container class="d-flex align-center justify-center gap-lg pt-10">
        <div style="font-size: 17px; width: 160px">
          닉네임<span style="color: red"> *</span>
        </div>

        <v-text-field
          v-model="nickname"
          label="한글, 영어, -_ 2~10자로 입력해주세요."
          variant="outlined"
          color="teal-darken-2"
          class="custom-text-field"
          maxlength="20"
          style="height: 55px; margin-right: 2%"
        ></v-text-field>

        <v-btn
          variant="outlined"
          color="brown-darken-2"
          style="font-size: 16px; width: 130px; height: 55px"
          @click="joinChkNickname(nickname)"
        >
          중복확인
        </v-btn>
      </v-container>

      <v-container class="d-flex align-center justify-center gap-lg pt-1">
        <div style="font-size: 17px; width: 160px">
          이메일<span style="color: red"> *</span>
        </div>

        <v-text-field
          v-model="email"
          label="64자 이하의 이메일 형식으로 입력해주세요."
          variant="outlined"
          color="teal-darken-2"
          class="custom-text-field"
          maxlength="20"
          style="height: 55px; margin-right: 2%"
        ></v-text-field>

        <v-btn
          variant="outlined"
          color="brown-darken-2"
          style="font-size: 16px; width: 130px; height: 55px"
          @click="joinChkEmail(email)"
        >
          중복확인
        </v-btn>
      </v-container>

      <v-container class="d-flex align-center justify-center gap-lg pt-1">
        <div style="font-size: 17px; width: 160px">
          비밀번호<span style="color: red"> *</span>
        </div>

        <v-text-field
          v-model="passwordChk"
          label="영어, 숫자, 특수문자 8~20자로 입력해주세요."
          variant="outlined"
          color="teal-darken-2"
          class="custom-text-field"
          maxlength="20"
          type="password"
          style="height: 55px; margin-right: 2%"
        ></v-text-field>

        <div
          variant="outlined"
          color="brown-darken-2"
          style="font-size: 16px; width: 130px; height: 55px"
        ></div>
      </v-container>

      <v-container class="d-flex align-center justify-center gap-lg pt-1">
        <div style="font-size: 17px; width: 160px">
          비밀번호 확인<span style="color: red"> *</span>
        </div>

        <v-text-field
          v-model="password"
          label=""
          variant="outlined"
          color="teal-darken-2"
          class="custom-text-field"
          maxlength="20"
          type="password"
          style="height: 55px; margin-right: 2%"
        ></v-text-field>

        <div
          variant="outlined"
          color="brown-darken-2"
          style="font-size: 16px; width: 130px; height: 55px"
        ></div>
      </v-container>

      <v-container class="d-flex justify-center py-10">
        <v-btn
          class="font-weight-bold"
          no-uppercase
          color="brown darken-2"
          style="font-size: 20px; width: 160px; height: 55px"
          @click="join"
        >
          회원가입
        </v-btn>
      </v-container>
    </v-sheet>
  </v-col>
</template>

<script setup>
import { ref } from "vue";

const nickname = ref(""); // nickname을 선언
const email = ref("");
const password = ref("");
const passwordChk = ref("");

defineOptions({
  name: "JoinPage",
});
</script>

<style lang="scss" scoped>
.custom-divider {
  margin: -17px auto; /* `spaced="md"`와 비슷한 효과 */
  opacity: 1;
  width: 75%;
}

.custom-text-field {
  width: 370px !important; /* ✅ 강제 적용 */
  max-width: 370px !important;
}
</style>
