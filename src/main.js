import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus, { configProviderContextKey } from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import store from './store'
import http from "@/utils/httpHelper";
import httpHelper from '@/utils/httpHelper'
import VideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css';
 


//import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'



const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.config.globalProperties.$http=httpHelper;
app.use(ElementPlus);
app.use(VideoPlayer);
app.use(router);
app.use(store);
app.mount('#app');