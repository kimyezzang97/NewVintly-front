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
          maxlength="10"
          style="height: 55px; margin-right: 2%"
        ></v-text-field>

        <v-btn
          variant="outlined"
          color="brown-darken-2"
          style="font-size: 16px; width: 130px; height: 55px"
          @click="checkNickname()"
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
          maxlength="64"
          style="height: 55px; margin-right: 2%"
        ></v-text-field>

        <v-btn
          variant="outlined"
          color="brown-darken-2"
          style="font-size: 16px; width: 130px; height: 55px"
          @click="checkEmail()"
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
          :hint="passwordHint"
          persistent-hint
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
          color="brown"
          style="font-size: 20px; width: 160px; height: 55px"
          @click="join()"
        >
          회원가입
        </v-btn>
      </v-container>
    </v-sheet>
  </v-col>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { getCheckNickname, getCheckEmail, postJoin } from "@/api/auth/joinApi";
import { ReqJoinType } from "@/types/auth/reqJoinType";
import { useRouter } from "vue-router";

const router = useRouter();

const nickname = ref(""); // nickname을 선언
const nicknameAvailable = ref(false); // 닉네임 사용 가능 여부

const email = ref("");
const emailAvailable = ref(false);

const password = ref("");
const passwordChk = ref("");
const passwordHint = ref("");

// nickname value 변경시 중복확인을 다시하게 한다.
watch(nickname, (newValue, oldValue) => {
  nicknameAvailable.value = false;
});

watch(email, (newValue, oldValue) => {
  emailAvailable.value = false;
});

// password 일치 확인
watch(passwordChk, (newValue, oldValue) => {
  if (password.value != passwordChk.value) {
    passwordHint.value = "비밀번호가 일치하지 않습니다.";
  } else {
    passwordHint.value = "";
  }
});

watch(password, (newValue, oldValue) => {
  if (password.value != passwordChk.value) {
    passwordHint.value = "비밀번호가 일치하지 않습니다.";
  } else {
    passwordHint.value = "";
  }
});

const checkNickname = async () => {
  if (!nickname.value) {
    alert("닉네임을 입력해주세요.");
    nicknameAvailable.value = false;
    return;
  }

  const result = await getCheckNickname(nickname.value);
  console.log("result : ", result)
  if (result.success === true) nicknameAvailable.value = true;
  alert(result.msg);
};

const checkEmail = async () => {
  if (!email.value) {
    alert("이메일을 입력해주세요.");
    emailAvailable.value = false;
    return;
  }

  const result = await getCheckEmail(email.value);
  if (result.success === true) emailAvailable.value = true;
  alert(result.msg);
};

// 회원가입 버튼
const join = async () => {
  if (!nicknameAvailable.value) {
    alert("nickname 중복확인을 해주세요");
    return;
  }

  if (!emailAvailable.value) {
    alert("email 중복확인을 해주세요");
    return;
  }

  if (password.value != passwordChk.value) {
    alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
    return;
  }

  // 비밀번호 정규식 체크
  const regexPassword =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&~<>])[A-Za-z\d@$!%*#?&~<>]{8,20}$/;
  if (!regexPassword.test(password.value)) {
    alert("비밀번호는 영어, 숫자, 특수문자 혼합의 8~20자로 입력해주세요.");
    return;
  }

  const reqJoinType: ReqJoinType = {
    nickname: nickname.value,
    email: email.value,
    password: password.value,
  };

  const result = await postJoin(reqJoinType);
  alert(result.msg);

  if (result.success === true) {
    // 회원가입 성공 후 페이지 이동
    router.push("/");
  }
};

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
