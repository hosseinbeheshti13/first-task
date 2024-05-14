import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue';
import { createI18n } from 'vue-i18n';
import 'ant-design-vue/dist/reset.css';
import App from './App.vue'
import router from './router'
import en from '@/assets/locale/en.json';
import fa from '@/assets/locale/fa.json';

// export const i18n = createI18n({
//     locale: 'en', // set locale
//     fallbackLocale: 'en', // set fallback locale
//     messages: {
//       en: {
//         message: {
//           welcome: 'good morning'
//         }
//       },
//       fa: {
//         message: {
//           welcome: 'صبح به خیر'
//         }
//       }
//     }
//   })

  const i18n = createI18n({
    legacy: false,
    locale: 'en', // default locale
    messages: {
      en,
      fa
    }
  });
  

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(Antd).mount('#app');