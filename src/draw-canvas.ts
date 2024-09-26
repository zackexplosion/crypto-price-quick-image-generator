// interface PROP_TO_CHINESE_MAP_interface{
//   currency: string;
//   buyOrShort: string
// }
const COLOR_OF_TEXT = '#000'
const PROP_TO_CHINESE_MAP: { [key: string]: any } = {
  currency: '幣種',
  buyOrShort: '多空',
  howToEnter: '進場',
  sl: '停損',
  tp: '停利',
  timezone: '時區',
  leverage: '建議槓桿',
}

function drawPriceInformation (ctx: CanvasRenderingContext2D, importData: ImportData) {
  // Set font for the price text
  ctx.font = 'bold 60px Arial'
  ctx.fillStyle = COLOR_OF_TEXT // Text color

  const drawFromX = 40
  const drawFromY = 200
  const offsetPerRow = 90

  const keys = Object.keys(PROP_TO_CHINESE_MAP)
  keys.forEach((key, index) => {
    const label: string = PROP_TO_CHINESE_MAP[key]
    const y = drawFromY + (offsetPerRow * index)
    let text = importData[key as keyof ImportData]

    if (key === 'buyOrShort') {
      text = (text === 'buy') ? '多' : '空'
    }
    ctx.fillText(`${label} : ${text}`, drawFromX, y)
  })

  ctx.fillText(`⚠️做好倉位管理隨時注意套保`, drawFromX, drawFromY + (offsetPerRow * keys.length))
}

export default function drawCanvas (importData: ImportData) {
  console.log('importData', importData)
  const canvas: any = document.getElementById('canvas')
  const ctx: CanvasRenderingContext2D = canvas.getContext('2d')

  // Set background color
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Set the price text
  // const price = '$199.99'

  // Measure the text width to center it
  // const textWidth = ctx.measureText(price).width

  // Draw the price text in the center of the canvas
  // ctx.fillText(price, (canvas.width - textWidth) / 2, canvas.height / 2 + 16)

  // Add a border around the price for emphasis
  // ctx.strokeStyle = '#333'
  // ctx.lineWidth = 2
  // ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20)

  if (importData.background) {
    ctx.filter = 'blur(20px)'
    ctx.drawImage(importData.background, 0, 0, canvas.width, canvas.height)
    ctx.filter = 'blur(0px)'
  } else {
  // Set background color
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  drawPriceInformation(ctx, importData)
  const { watermark } = importData
  if (watermark) {
    // ctx.rotate(45 * Math.PI / 180)
    ctx.filter = 'opacity(50%)'
    ctx.drawImage(watermark, 0, canvas.height / 2, watermark.width, watermark.height)
    ctx.filter = 'opacity(0%)'
    // ctx.rotate(-45 * Math.PI / 180)
  }

  // ctx.fillText('多空 : ' + importData.buyOrShort, drawFromX, drawFromY + offsetPerRow)
}
