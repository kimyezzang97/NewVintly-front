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
          size="large">빈티지샵 추가
        </v-btn>
      </v-col>

      <v-row cols="auto" class="d-flex align-center justify-center">
        <!-- 1번 셀렉트: 시/도 -->
        <v-col md="3" style="margin-top: 23px;">
          <v-select
            v-model="selectedState"
            :items="stateOptions"
            label="시/도 선택"
            variant="outlined"
            density="comfortable"
            @update:model-value="onStateChange"
          />
        </v-col>

        <!-- 2번 셀렉트: 시(경기도) / 구(서울) -->
        <v-col  md="3" style="margin-top: 23px;" >
          <v-select
            v-model="selectedDistrict"
            :items="districtOptions"
            :disabled="!selectedState"
            :label="state === '경기도' ? '시 선택' : '구 선택'"
            variant="outlined"
            density="comfortable"
            @update:model-value="onDistrictChange"
          />
        </v-col>

        <!-- (선택) 조회 버튼이 따로 필요하면 -->
        <v-col  md="3" style="height: 100%;" class="d-flex align-center justify-center">
          <v-btn size="x-large" color="teal-darken-2" :disabled="!canSearch" @click="search" >
            해당지역 검색
          </v-btn>
        </v-col>
      </v-row>

      <v-container class="d-flex align-center justify-center gap-lg pt-10">
        <KakaoMap :lat="coordinate.lat" :lng="coordinate.lng" :draggable="true" :level="8" > <!-- :markerList="vintageShopList" -->
          
          <!-- :infoWindow="{ content: 'Click Marker', visible: item.clickStatus }" -->
          <KakaoMapMarker 
            v-for="(item, index) in vintageShopList" 
            :lat="item.lat" 
            :lng="item.lng"
            :clickable="true"
            @onClickKakaoMapMarker="onClickKakaoMapMarker(item)"
            :infoWindow="{ content: item.name, visible: item.visibleStatus }"
            @mouseOverKakaoMapMarker="mouseOverKakaoMapMarker(item)"
            @mouseOutKakaoMapMarker="mouseOutKakaoMapMarker(item)"
            :image="{
              imageSrc: '/shop_icon2.svg',
              imageWidth: 35,
              imageHeight: 35,
              imageOption: {}
            }"
            ></KakaoMapMarker> 

        </KakaoMap>
      </v-container>

      <v-container class="d-flex justify-center py-10">
        
      </v-container>
      
      <!-- 빈티지 샵 추가 팝업 -->
      <v-dialog v-model="dialog" max-width="800" max-height="800">
        <v-card>
          <v-card-title class="text-h6 d-flex align-center justify-center mt-8">빈티지샵 추가</v-card-title>
          
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

      <!-- 빈티지 샵 정보 팝업 -->
      <v-dialog v-model="infoDialog" max-width="800">
        <v-card>
          <v-card-title class="text-h6 d-flex align-center justify-center mt-8">
            빈티지샵 정보
          </v-card-title>

          <v-divider class="custom-divider" thickness="3px" color="#004d40" style="margin-top: 30px" />

          <!-- 내용: 라벨/값 레이아웃 -->
          <v-card-text class="pt-8 ">
            <v-row class="mb-3 d-flex justify-center text-center">
              <v-col cols="5" class="text-grey-darken-1 font-weight-medium">이름</v-col>
              <v-col cols="7">{{ nameInfo }}</v-col>
            </v-row>

            <v-row class="mb-3 d-flex justify-center text-center">
              <v-col cols="5" class="text-grey-darken-1 font-weight-medium">시/도</v-col>
              <v-col cols="7">{{ stateInfo }}</v-col>
            </v-row>

            <v-row class="mb-3 d-flex justify-center text-center">
              <v-col cols="5" class="text-grey-darken-1 font-weight-medium">구/시</v-col>
              <v-col cols="7">{{ districtInfo }}</v-col>
            </v-row>

            <v-row class="mb-3 d-flex justify-center text-center">
              <v-col cols="5" class="text-grey-darken-1 font-weight-medium">상세주소</v-col>
              <v-col cols="7">{{ detailAddrInfo  }}</v-col>
            </v-row>

            <v-row class="mb-3 d-flex justify-center text-center">
              <v-col cols="5" class="text-grey-darken-1 font-weight-medium">위도</v-col>
              <v-col cols="7">{{ latInfo }}</v-col>
            </v-row>

            <v-row class="mb-6 d-flex justify-center text-center">
              <v-col cols="5" class="text-grey-darken-1 font-weight-medium">경도</v-col>
              <v-col cols="7">{{ lonInfo }}</v-col>
            </v-row>

            <!-- 이미지 리스트 -->
            <v-row>
              <v-col cols="5" class="text-grey-darken-1 font-weight-medium mb-2 d-flex justify-center text-center">
                이미지
              </v-col>

              <v-col cols="7">
                <v-carousel
                  v-model="imgIndex"
                  height="240"
                  hide-delimiters
                  show-arrows="hover"
                >
                  <v-carousel-item
                    v-for="(item, i) in vintageImgPathList"
                    :key="i"
                  >
                    <v-img
                      :src="item.imgPath"  
                      width="320"
                      height="240"
                      class="rounded-lg mx-auto"
                      cover
                    >
                      <template #error>
                        <div
                          class="d-flex align-center justify-center"
                          style="height:240px;"
                        >
                          이미지 로드 실패
                        </div>
                      </template>
                    </v-img>
                  </v-carousel-item>
                </v-carousel>
              </v-col>
            </v-row>
          </v-card-text>

          <v-divider class="custom-divider" thickness="3px" color="#004d40" style="margin-top: 10px" />

          <v-card-actions style="margin-top: 20px">
            <v-spacer />
            <v-btn text color="red-darken-2" @click="deleteConfirmDialog = true">삭제</v-btn>
            <v-btn text @click="infoDialog = false">닫기</v-btn>     
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="deleteConfirmDialog" max-width="400">
        <v-card>
          <v-card-title class="text-h6">삭제 확인</v-card-title>
          <v-card-text>
            정말로 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="red-darken-2" text @click="onConfirmDelete(vintageIdInfo)">
              삭제
            </v-btn>
            <v-btn color="grey-darken-1" text @click="deleteConfirmDialog = false">
              취소
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </v-sheet>
  </v-col>


</template>

<script setup lang="ts">
import { createVintage, deleteVintage, getVintageDetail, getVintageList } from '@/api/vintage/vintageApi';
import { ReqCreateVintageType } from '@/types/vintage/reqCreateVintage';
import { computed, onMounted, ref } from 'vue';
import { KakaoMap, KakaoMapMarker } from 'vue3-kakao-maps';

const deleteConfirmDialog = ref<boolean>(false)
const dialog = ref<boolean>(false)
const infoDialog = ref<boolean>(false)
const visibleDialog = ref<boolean>(false)

const name = ref<string>('');
const state = ref<string>('');
const district = ref<string>('');
const detailAddr = ref<string>('');
const lat = ref<number>(0);
const lon = ref<number>(0);
const images = ref<File[]>([])

const visibleRef = ref<boolean>(false);

const mouseOverKakaoMapMarker = (item: VintageShop): void => {
  item.visibleStatus = true;
};
const mouseOutKakaoMapMarker = (item: VintageShop): void => {
  item.visibleStatus = false;
};

const props = defineProps<{
  thumbnailPathInfo: string | string[] | null
}>()

const getImages = computed<string[]>(() => {
  if (!props.thumbnailPathInfo) return []
  return Array.isArray(props.thumbnailPathInfo)
    ? props.thumbnailPathInfo
    : [props.thumbnailPathInfo]
})

const imgIndex = ref(0)

function prevImage() {
  if (images.value.length <= 1) return
  imgIndex.value = (imgIndex.value + images.value.length - 1) % images.value.length
}
function nextImage() {
  if (images.value.length <= 1) return
  imgIndex.value = (imgIndex.value + 1) % images.value.length
}

const vintageIdInfo = ref<string>('');
const nameInfo = ref<string>('');
const stateInfo = ref<string>('');
const districtInfo = ref<string>('');
const detailAddrInfo = ref<string>('');
const latInfo = ref<number>(0);
const lonInfo = ref<number>(0);
const vintageImgPathList = ref<vintageImgType[]>([])

function closeInfoDialog() {
  infoDialog.value = false 
  nameInfo.value = ''
  stateInfo.value = ''
  districtInfo.value = ''
  detailAddrInfo.value = ''
  latInfo.value = 0
  lonInfo.value = 0
  vintageImgPathList.value = []
}

interface vintageImgType {
  vintageImgId: number;     
  imgPath: string;     
}

const onClickKakaoMapMarker = async (item: VintageShop): Promise<void> => {
  closeInfoDialog()

  console.log('vintage id : ', item.vintageId)
  
  const result = await getVintageDetail(item.vintageId)
  
  if (result.success === true) {
    const data = result.data
    vintageIdInfo.value = data.vintageId
    nameInfo.value = data.name
    stateInfo.value = data.state
    districtInfo.value = data.district
    detailAddrInfo.value = data.detailAddr
    latInfo.value = data.lat
    lonInfo.value = data.lon
    vintageImgPathList.value = data.imgList
  
  } else {
    alert(result.msg);
  }
  

  infoDialog.value = true
};

async function onConfirmDelete(vintageId: string) {
  
 console.log('vintage id : ', vintageId)
  
  const result = await deleteVintage(Number(vintageId))
  
  if (result.success === true) {
    const data = result.data
    
    // ✅ 실제 삭제 로직 실행
    console.log("삭제 완료 ")
    console.log("delete - vintageId : ", vintageId)
    deleteConfirmDialog.value = false
    infoDialog.value = false

    alert('삭제되었습니다');
  } else {
    alert(result.msg);
  }

  
}


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
    name.value = ''
    state.value = ''
    district.value = ''
    detailAddr.value = ''
    lat.value = 0
    lon.value = 0
    images.value = <File[]>[]
  }

}

const coordinate = ref({
  lat: 37.5642135, // 37.408947 (안양중학교) 
  lng: 127.0016985 // 126.896622
});

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

interface VintageShop {
  vintageId: number;     
  name: string;
  state: string;
  district: string;
  detailAddr: string;
  lat: number;
  lng: number;
  thumbnailPath: string;
  clickStatus: boolean;
  visibleStatus: boolean;
}

const vintageShopList = ref<VintageShop[]>([])

onMounted(async () => {
  const result = await getVintageList();

  //console.log('getVintageList result : ', result);
  vintageShopList.value = result.data.map((element: any) => {
  return {
    ...element,       // 기존 속성 복사
    lng: element.lon, // lon → lng
    clickStatus: false,
    visibleStatus: false
  };
});

  console.log('vintageShopList result : ', vintageShopList.value);

})

function search(){
  const c = getCoords()
  coordinate.value.lat = c.lat
  coordinate.value.lng = c.lon
}

const selectedState = ref<string>('')       // '경기도' | '서울시'
const selectedDistrict = ref<string>('')    // 시 or 구

const stateOptions = ['경기도', '서울시'] // 백엔드 state와 동일한 문자열로!

const districtOptions = computed(() => (selectedState.value ? regionMap[selectedState.value] ?? [] : []))
const canSearch = computed(() => !!selectedState.value && !!selectedDistrict.value)

// 1번 변경 시 2번 초기화 + 바로(선택) 조회
function onStateChange() {
  selectedDistrict.value = ''
  // 자동 조회를 원하면 아래 주석 해제 (state만 바뀌면 아직 district 없으니 보통은 안 함)
  // fetchShops()
}

// 2번 변경 시 바로 조회
function onDistrictChange() {
  
}

// 지역 맵 (예시: 일부만 기재)
const regionMap: Record<string, string[]> = {
  '경기도': [
    // '수원시', '성남시', '용인시', '고양시', '화성시', '부천시', '남양주시', '안산시', '평택시',
    // '의정부시', '파주시', '광주시', '김포시', '하남시', '광명시'
    '수원시', '성남시', '용인시', '고양시', '안양시'
  ],
  '서울시': [
     '강남구', '서초구', '송파구', '중구', '마포구', '강동구', 
    // '강남구', '서초구', '송파구', '강동구', '강서구', '양천구', '영등포구', '마포구', '용산구',
    // '종로구', '중구', '성동구', '광진구', '동대문구', '중랑구', '성북구', '강북구', '도봉구',
    // '노원구', '은평구', '동작구', '관악구', '금천구', '구로구'
  ],
}

type StateType = typeof stateOptions[number];

// 좌표 얻기
function getCoords() {
  return REGION_COORDS[selectedState.value]?.[selectedDistrict.value] ?? null;
}

// 좌표(위도/경도) 맵 — 필요한 구/시는 계속 채워나가면 됨
const REGION_COORDS: Record<StateType, Record<string, { lat: number; lon: number }>> = {
  서울시: {
    강남구: { lat: 37.5175066, lon: 127.0473753 }, // 강남구청
    서초구: { lat: 37.4835872, lon: 127.0326987 }, // 서초구청
    송파구: { lat: 37.5144533, lon: 127.1059047 }, // 송파구청
    중구:   { lat: 37.5637584, lon: 126.9975517 }, // 중구청
    마포구: { lat: 37.566242, lon: 126.9019425 }, // 마포구청
    강동구: { lat: 37.530122, lon: 127.1237479 }, // 강동구청
    // ... 계속 추가
  },
  경기도: {
    수원시: { lat: 37.2634485, lon: 127.0286427 },
    성남시: { lat: 37.420023, lon: 127.1266546 },
    용인시: { lat: 37.240608, lon: 127.1772935 },
    고양시: { lat: 37.6582159, lon: 126.8320138 },
    안양시: { lat: 37.394327, lon: 126.9568586 }, // 안양 중학교
    // ... 계속 추가
  },
};
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
