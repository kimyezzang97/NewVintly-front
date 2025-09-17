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

      <v-container class="d-flex justify-center py-10">
        test
      </v-container>

      <v-container class="d-flex align-center justify-center gap-lg pt-10">
        <KakaoMap :lat="coordinate.lat" :lng="coordinate.lng" :draggable="true">
            <KakaoMapMarker :lat="coordinate.lat" :lng="coordinate.lng"></KakaoMapMarker>
        </KakaoMap>
      </v-container>

      <v-container class="d-flex justify-center py-10">
        
      </v-container>

      

    </v-sheet>
  </v-col>
</template>

<script setup lang="ts">

import { KakaoMap, KakaoMapMarker } from 'vue3-kakao-maps';
const coordinate = {
  lat: 37.408947,
  lng: 126.896622
};

defineOptions({
  name: "VintagePage",
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
