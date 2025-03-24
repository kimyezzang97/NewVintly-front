<template>
  <v-col cols="12" md="8">
    <v-row class="d-flex justify-center">
      <v-col class="d-flex justify-center">
        <v-img
          alt="vintly-bg-1"
          src="../assets/vintly-bg-1.jpg"
          max-width="1100px"
          height="450px"
        />
      </v-col>
    </v-row>

    <!-- Tabs 영역 -->
    <v-tabs class="mt-12" align-tabs="center">
      <div class="text-h6" style="margin-left: 3%">NOTICE</div>
      <v-spacer />
      <div class="text-h7 my-2" style="margin-right: 3%">more</div>
    </v-tabs>

    <!-- Divider -->
    <v-divider :thickness="4" />
  </v-col>
</template>

<script setup lang="ts">
defineOptions({
  name: "IndexPage",
});
</script>

<style scoped></style>
