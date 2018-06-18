const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

export default class button{
  constructor(dir = 'up', width, height= 20, x = 20, y = 20) {
    this.img = new Image()
    let imgSrc = `images/${dir}.png`
    this.img.src = imgSrc    
    this.width = width
    this.height = height
    this.x = x
    this.y = y
  }
 
  drawToCanvas(ctx) {
    ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }
}


