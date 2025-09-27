<template>
  <v-col cols="12" md="8">
    <v-sheet min-height="70vh" rounded="lg">
      <div class="mt-12 mb-8 d-flex justify-center text-h5 font-weight-medium">
        빈티지매장
      </div>

      <v-divider
        class="custom-divider"
        thickness="3px"
        color="#004d40"
        style="margin-bottom: 15px"
      ></v-divider>

    
      <v-col cols="auto" class="d-flex align-center justify-center">
        <v-btn 
        @click="dialog = true"
        size="large">빈티지샵 추가</v-btn>
      </v-col>

      <v-container class="d-flex align-center justify-center gap-lg pt-10">
        <KakaoMap :lat="coordinate.lat" :lng="coordinate.lng" :draggable="true">
            <KakaoMapMarker :lat="coordinate.lat" :lng="coordinate.lng"></KakaoMapMarker>
        </KakaoMap>
      </v-container>

      <v-container class="d-flex justify-center py-10">
        
      </v-container>

      <v-dialog v-model="dialog" max-width="800" max-height="800">
        <v-card>
          <v-card-title class="text-h6 d-flex align-center justify-center">빈티지샵 추가</v-card-title>
          
          <v-divider
            class="custom-divider"
            thickness="3px"
            color="#004d40"
            style="margin-top: 30px;"
          ></v-divider>

          <v-container class="d-flex align-center justify-center gap-lg pt-10">
        <div style="font-size: 17px; width: 180px">
          이름<span style="color: red"> *</span>
        </div>

        <v-text-field
          v-model="name"
          label=""
          variant="outlined"
          color="teal-darken-2"
          class="custom-text-field"
          maxlength="30"
          style="height: 55px; margin-right: 2%"
        ></v-text-field>
      </v-container>

      <v-container class="d-flex align-center justify-center gap-lg pt-1">
        <div style="font-size: 17px; width: 180px">
          시/도 (서울시, 경기도) <span style="color: red"> *</span>
        </div>

        <v-text-field
          v-model="state"
          label=""
          variant="outlined"
          color="teal-darken-2"
          class="custom-text-field"
          maxlength="30"
          style="height: 55px; margin-right: 2%"
        ></v-text-field>
      </v-container>

      <v-container class="d-flex align-center justify-center gap-lg pt-1">
        <div style="font-size: 17px; width: 180px">
          구/시 (강동구, 군포시)<span style="color: red"> *</span>
        </div>

        <v-text-field
          v-model="district"
          label=""
          variant="outlined"
          color="teal-darken-2"
          class="custom-text-field"
          maxlength="30"
          style="height: 55px; margin-right: 2%"
        ></v-text-field>
      </v-container>

      <v-container class="d-flex align-center justify-center gap-lg pt-1">
        <div style="font-size: 17px; width: 180px">
          상세주소<span style="color: red"> *</span>
        </div>

        <v-text-field
          v-model="detailAddr"
          label=""
          variant="outlined"
          color="teal-darken-2"
          class="custom-text-field"
          maxlength="30"
          style="height: 55px; margin-right: 2%"
        ></v-text-field>
      </v-container>

      <v-container class="d-flex align-center justify-center gap-lg pt-1">
        <div style="font-size: 17px; width: 180px">
          위도<span style="color: red"> *</span>
        </div>

        <v-text-field
          v-model="lat"
          label=""
          variant="outlined"
          color="teal-darken-2"
          class="custom-text-field"
          maxlength="30"
          style="height: 55px; margin-right: 2%"
        ></v-text-field>

      </v-container>

      <v-container class="d-flex align-center justify-center gap-lg pt-1">
        <div style="font-size: 17px; width: 180px">
          경도<span style="color: red"> *</span>
        </div>

        <v-text-field
          v-model="lon"
          label=""
          variant="outlined"
          color="teal-darken-2"
          class="custom-text-field"
          maxlength="30"
          style="height: 55px; margin-right: 2%"
        ></v-text-field>

      </v-container>

      <v-container class="d-flex align-center justify-center gap-lg pt-1">
        <div style="font-size: 17px; width: 180px">
          이미지<span style="color: red"> *</span>
        </div>

        <!-- <v-text-field
          v-model="images"
          label=""
          variant="outlined"
          color="teal-darken-2"
          class="custom-text-field"
          maxlength="20"
          style="height: 55px; margin-right: 2%"
        ></v-text-field> -->

        <v-file-input
            v-model="images"
            label="이미지 업로드"
            multiple
            accept="image/*"
            variant="outlined"
            color="teal-darken-2"
            prepend-icon="mdi-image"
            class="custom-file-input"
            style="height: 55px; margin-right: 2%; max-width: 370px"
          />
      </v-container>

      <v-divider
        class="custom-divider"
        thickness="3px"
        color="#004d40"
        style="margin-top: 10px;"
      ></v-divider>

      <v-container class="d-flex justify-center py-10">
        <v-btn
          class="font-weight-bold"
          no-uppercase
          color="teal-darken-4"
          style="font-size: 20px; width: 180px; height: 55px"
          @click="createClick"
        >
          추가
        </v-btn>
      </v-container>
          <v-card-actions>
            <v-spacer />
            <v-btn text @click="dialog = false">닫기</v-btn>
            <!-- <v-btn color="primary" @click="confirm">확인</v-btn> -->
          </v-card-actions>
        </v-card>
      </v-dialog>

    </v-sheet>
  </v-col>


</template>

<script setup lang="ts">
import { createVintage } from '@/api/vintage/vintageApi';
import { ReqCreateVintageType } from '@/types/vintage/reqCreateVintage';
import { ref } from 'vue';
import { KakaoMap, KakaoMapMarker } from 'vue3-kakao-maps';

const dialog = ref<boolean>(false)


const name = ref<string>('');
const state = ref<string>('');
const district = ref<string>('');
const detailAddr = ref<string>('');
const lat = ref<number>(0);
const lon = ref<number>(0);
const images = ref<File[]>([])

async function createClick(){
  if (!validateForm()) return
   
  const reqType: ReqCreateVintageType = {
    name: name.value,
    state: state.value,
    district: district.value,
    detailAddr: detailAddr.value,
    lat: lat.value,
    lon: lon.value,
    images: images.value,
  };

  const result = await createVintage(reqType);

  alert(result.msg);
  console.log(result)
  if (result.success === true) {
    dialog.value = false
  }

}

const coordinate = {
  lat: 37.408947,
  lng: 126.896622
};

defineOptions({
  name: "VintagePage",
});

function validateForm(): boolean {
  if (!name.value.trim()) {
    alert('매장 이름을 입력해주세요.')
    return false
  }
  if (!state.value.trim()) {
    alert('시/도를 입력해주세요.')
    return false
  }
  if (!district.value.trim()) {
    alert('구/군을 입력해주세요.')
    return false
  }
  if (!detailAddr.value.trim()) {
    alert('상세 주소를 입력해주세요.')
    return false
  }
  if (!lat.value || !lon.value) {
    alert('좌표 정보를 입력해주세요.')
    return false
  }
  if (images.value.length === 0) {
    alert('최소 한 장의 이미지를 업로드해주세요.')
    return false
  }

  return true
}

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
