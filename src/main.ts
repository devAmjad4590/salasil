import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import './global.css'; // Import the global CSS

const vuetify = createVuetify({
    components,
    directives,
  })

const app = createApp(App);
app.use(router);
app.use(vuetify)
app.mount("#app");
