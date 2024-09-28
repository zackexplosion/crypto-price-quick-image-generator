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
  timezone: string
  leverage: Number
  noticeWords?: string
  background?: HTMLImageElement | string
  watermark?: HTMLImageElement | string
}
// type strObj = {[key:string]:{[key:string]:string}}
