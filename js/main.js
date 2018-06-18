import Worm from './worm'
import Button from '/button'
const W = window.innerWidth
const H = window.innerHeight
let ctx = canvas.getContext('2d')

export default class Main {
  constructor() {
    this.aniId = 0
    this.frame = 0
    this.gameOver = false
    this.direction = 'up'
    this.score = 0
    this.playing = false
    this.apples = []
    this.restart()
    canvas.addEventListener('touchstart', this.touchEventHandler.bind(this))
  }

  restart() {
    this.worm = new Worm(ctx)
    this.upBtn = new Button('up', W*0.2, H*0.1 , W*0.4,H*0.73)
    this.downBtn = new Button('down', W * 0.2, H * 0.1, W * 0.4, H * 0.87)
    this.leftBtn = new Button('left', W * 0.2, H * 0.1, W * 0.15, H * 0.80)
    this.rightBtn = new Button('right', W * 0.2, H * 0.1, W * 0.65, H * 0.80)
    this.bindLoop = this.loop.bind(this)
    this.score = 0 
    window.cancelAnimationFrame(this.aniId);
    this.aniId = window.requestAnimationFrame(()=>{this.update(); this.render()})
  }

  touchEventHandler(e) {
    //get the x and y coordinates for the touch
    const { clientX, clientY } = e.touches[0]
    if(this.playing && !this.gameOver){
      //check if any of the buttons was touched
      if(clientX>=W*0.4 && clientX<=W*0.6 && clientY>=H*0.73 && clientY<=H*0.83 && this.direction!=='down')
        this.direction='up'
      if (clientX >= W * 0.4 && clientX <= W * 0.6 && clientY >= H * 0.87 && clientY <= H * 0.97 && this.direction !== 'up')
        this.direction='down'
      if (clientX >= W * 0.15 && clientX <= W * 0.35 && clientY >= H * 0.80 && clientY <= H * 0.90 && this.direction !== 'right')
        this.direction='left'
      if (clientX >= W * 0.654 && clientX <= W * 0.85 && clientY >= H * 0.80 && clientY <= H * 0.90 && this.direction !== 'left')
        this.direction='right'
        console.log(this.direction)
      //check if start button was touched
    } else if (clientX >= W * 0.22 && clientX <= W * 0.82 && clientY >= W * 0.35 && clientY <= W * 0.60) {
      this.playing = true
      this.gameOver = false
      this.direction = 'up'
      this.restart()
      this.aniId = window.requestAnimationFrame(this.bindLoop)
    }
  }

  render() {
    //grass boundry
    let grass = new Image()
    grass.src = 'images/grass.jpg'
    ctx.drawImage(grass, 0, 0, W , H)

    //score
    ctx.fillStyle = "#ffffff"
    ctx.font = "30px Arial"
    ctx.fillText(
      `score: ${this.score}`,
      20,
      W*0.1, 
    )
    
    //dirt game area
    let dirt = new Image()
    dirt.src = 'images/dirt.jpeg'
    ctx.drawImage(dirt, W*0.1, W*0.14, W*0.8, W)
    
    //start button
    if (!this.playing || this.gameOver) {
      ctx.fillStyle = 'red'
      ctx.fillRect(W*0.22, W*0.35, W*0.6, W*0.25)

      ctx.fillStyle = "#ffffff"
      ctx.font = "40 Arial"
      ctx.fillText(
        `Click to Start`,
        W/4,
        W/2,
      )
    }

    this.worm.drawToCanvas(ctx, this.direction)
    this.upBtn.drawToCanvas(ctx)
    this.downBtn.drawToCanvas(ctx)
    this.rightBtn.drawToCanvas(ctx)
    this.leftBtn.drawToCanvas(ctx)
  }

  endGame(){
    this.gameOver = true
  }

  update() {
    //update worms length and position
    let grow = false
    if (this.frame % 150 === 0 && this.frame !== 0)
      grow = true
    if (this.frame % 10 === 0 && this.frame !== 0) {
      this.worm.move(grow, this.direction, this.endGame.bind(this))
    }
  }

  loop() {
    if (this.gameOver)
      return
    this.frame++
    this.update()
    this.render()
    this.aniId = window.requestAnimationFrame(this.bindLoop)
  }
}
