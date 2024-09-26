/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportData {
  currency: string;
  buyOrShort: string;
  howToEnter: string;
  sl: string;
  tp: string;
  timezone: string;
  leverage: Number
  background?: HTMLImageElement
  watermark?: HTMLImageElement
}
