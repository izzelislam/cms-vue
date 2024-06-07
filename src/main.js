import { createApp } from 'vue'
import router from './routes'
import App from './App.vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import VueDisqus from 'vue-disqus'  
import VueFeather from 'vue-feather'

import './style.css'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

createApp(App)
.use(router)
.use(pinia)
.use(VueDisqus, {
  shortname: 'ktquez'
})
.component(VueFeather.name, VueFeather)
.mount('#app')
