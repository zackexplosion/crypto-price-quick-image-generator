/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

const app = createApp(App)

registerPlugins(app)

app.mount('#app')

interface ImportData{
  currency: String;
  buyOrShort: String;
  howToEnter: String;
  sl: String;
  tp: String;
  timezone: String;
  leverage: Number
}
