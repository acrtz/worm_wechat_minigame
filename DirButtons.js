const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

export default class button{
  constructor(dir, x, y, width, height) {
    this.img = new Image()
    let imgSrc = `images/${dir}.png`
    this.img.src = imgSrc    
    this.width = width
    this.height = height
    this.x = x
    this.y = y
  }
 
  pressed(X, Y){
    return( 
      X >= this.x && 
      X <= this.x + this.width && 
      Y >=  this.y && 
      Y <= this.y+this.height
    )
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


