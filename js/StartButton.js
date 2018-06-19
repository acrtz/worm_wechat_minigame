const W = window.innerWidth
const H = window.innerHeight

export default class StartButton {
  constructor(x, y, width, height){
    this.x = x
    this.y = y  
    this.width = width
    this.height = height
  }

  /******************************
   * renders class to canvas
   ******************************/
  drawToCanvas(ctx){
    ctx.fillStyle = 'red'
    ctx.fillRect(this.x, this.y, this.width, this.height)

    ctx.fillStyle = "#ffffff"
    ctx.font = "40 Arial"
    ctx.fillText(
      `Click to Start`,
      W / 4,
      W / 2,
    )
  }

  /******************************************
   * checks if button press' x-y coordinates
   * falls within the start button
   ******************************************/
  pressed(X,Y){
    return (
      X >= this.x &&
      X <= this.x+this.width &&
      Y >= this.y &&
      Y <= this.y+this.height
    )
  }
}