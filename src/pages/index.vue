<template>
  <v-container class="fill-height">
    <v-responsive class="align-centerfill-height mx-auto" max-width="900">
      <v-row>
        <v-col cols="6">
          <v-card title="報單資訊">
            <v-card-text>
              <v-text-field v-model="data.currency" label="幣種" />
              <!-- <v-text-field label="多空" /> -->
              <v-radio-group v-model="data.buyOrShort" inline>
                <v-radio label="多" value="buy" />
                <v-radio label="空" value="short" />
              </v-radio-group>

              <v-text-field v-model="data.howToEnter" label="進場" />
              <v-text-field v-model="data.sl" label="停損" />
              <v-text-field v-model="data.tp" label="停利" />
              <v-text-field v-model="data.timezone" label="時區" />
              <v-text-field v-model="data.leverage" label="建議槓桿" />
            </v-card-text>
          </v-card>

          <v-card title="外觀資訊">
            <v-card-text>
              <v-file-input id="background" label="底圖" />
              <v-file-input id="watermark" label="浮水印" />
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="6">
          <canvas id="canvas" height="1000" width="968" />
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>

  <!-- <HelloWorld /> -->
</template>

<script lang="ts" setup>
  import drawCanvas from '../draw-canvas'
  const data: ImportData = reactive({
    currency: 'BTC',
    buyOrShort: 'short',
    howToEnter: '市價-',
    sl: '111111',
    tp: '222222',
    timezone: '4H',
    leverage: 5,
    watermark: '',
    background: '',
  // currency: '',
  // buyOrShort: 'short',
  // howToEnter: '市價-',
  // sl: '',
  // tp: '',
  // timezone: '4H',
  // leverage: 5,
  })

  function setUploadedImage (event: any, type: string) {
    const file = event.target.files[0]
    const reader = new FileReader()

    // When the image is loaded, draw it on the canvas
    reader.onload = function (e: any) {
      const img = new Image()
      img.src = e.target.result

      img.onload = function () {
        // Draw the uploaded image onto the canvas
        // ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        if (type === 'background') {
          data.background = img
        } else {
          data.watermark = img
        }

        drawCanvas(data)
      }
    }

    // Read the uploaded image file
    if (file) {
      reader.readAsDataURL(file)
    }
  }

  watch(data, (_: ImportData) => {
    drawCanvas(_)
  })

  onMounted(() => {
    drawCanvas(data)

    const images:string[] = ['background', 'watermark']

    images.forEach(_ => {
      document.getElementById(_)?.addEventListener('change', function (event: any) {
        setUploadedImage(event, _)
      })
    })
  })
</script>

<style scoped>
#canvas {
  max-width: 100%;
}
</style>
