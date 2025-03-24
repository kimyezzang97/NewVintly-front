const { defineConfig } = require("@vue/cli-service");
const ESLintPlugin = require("eslint-webpack-plugin");
const webpack = require("webpack"); // ⬅ webpack을 직접 불러오기

//import { defineConfig } from '@vue/cli-service';
//import ESLintPlugin from 'eslint-webpack-plugin';

module.exports = defineConfig({
  transpileDependencies: true,

  pluginOptions: {
    vuetify: {
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
    },
  },
  // Webpack 설정 수정
  chainWebpack: (config) => {
    // 기존 eslint-loader를 eslint-webpack-plugin으로 변경
    config.plugin("eslint").use(ESLintPlugin, [
      {
        emitWarning: true, // 경고 메시지를 표시할지 여부
        // extensions 옵션 제거
      },
    ]);

    // Vue Feature Flags 추가
    config.plugin("define").use(webpack.DefinePlugin, [
      {
        "process.env": JSON.stringify(process.env), // ⬅ process.env를 빈 객체로 설정
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false),
      },
    ]);
  },
});
