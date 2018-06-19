import Worm from './worm'
import DirButtons from './dirButtons'
import StartButton from './startButton'
import Background from './background'
import Score from './score'

const W = window.innerWidth
const H = window.innerHeight
let ctx = canvas.getContext('2d')

export default class Main {
  constructor() {
    this.aniId = 0
    this.frame = 0
    this.gameOver = false
    this.playing = false
    this.apples = []
    this.restart()
    canvas.addEventListener('touchstart', this.touchEventHandler.bind(this))
  }

  /****************************************************************
   * Resets the game state and request the initial animation frame
   ****************************************************************/
  restart() {
    this.worm = new Worm([W/2,W])
    this.background = new Background()
    this.score = new Score()
    this.startButton = new StartButton(W * 0.22, W * 0.35, W * 0.6, W * 0.25)
    this.dirButtons = new DirButtons(
      ['up', W * 0.4, H * 0.73, W * 0.2, H * 0.1],
      ['down', W * 0.4, H * 0.87, W * 0.2, H * 0.1],
      ['left', W * 0.15, H * 0.80, W * 0.2, H * 0.1],
      ['right', W * 0.65, H * 0.80, W * 0.2, H * 0.1]
    )
    this.bindLoop = this.loop.bind(this)

    //cancels aniId stored from previous game
    window.cancelAnimationFrame(this.aniId);

    //Here requestAnimationFrame is not given a recursive call back, which 
    //would set the game in motion
    this.aniId = window.requestAnimationFrame(()=>{this.update(); this.render()})
  }

  /************************************************************
   * checks to see if direction or start buttons were pressed
   * and changes game state accordingly
   ************************************************************/
  touchEventHandler(e) {
    //get the x and y coordinates for the touch
    const { clientX, clientY } = e.touches[0]
    if(this.playing && !this.gameOver){

      //check if any of the buttons was touched and change direction accordingly
      let newDirection = this.dirButtons.pressed(clientX, clientY, this.worm.getDirection())
      this.worm.setDirection(newDirection)
      // this.direction = this.dirButtons.pressed(clientX, clientY, this.direction)

      //check if start button was touched
    } else if (this.startButton.pressed(clientX, clientY)){
      this.playing = true
      this.gameOver = false
      this.restart()
      this.aniId = window.requestAnimationFrame(this.bindLoop)
    }
  }

  /********************************************************
   * render is used to draw various componets to screen
   ********************************************************/
  render() {
    //draw various components to the screen
    this.background.drawToCanvas(ctx)
    this.score.drawToCanvas(ctx)
    this.worm.drawToCanvas(ctx)
    this.dirButtons.drawToCanvas(ctx)
    if (!this.playing || this.gameOver) {
      this.startButton.drawToCanvas(ctx)
    }
  }

  /********************************************************
   * updates worms position and length. Checks if worm has 
   * crashed or eaten any apples
   ********************************************************/
  update() {
    //update worms length and position based of frames
    let grow
    if (this.frame % 150 === 0 && this.frame !== 0)
      grow = true
    if (this.frame % 10 === 0 && this.frame !== 0) {

      //tell the worm to move. The move function returns true if the worm 
      //crashed into itself. The crashed function checks if the worm crashed
      //into the walls or not. 
      if(this.worm.move(grow)|| this.crashed(this.worm.head()))
        this.gameOver = true
    }
  }

  /***************************************************
   * returns true if block is outsite of the 
   * boundaries 
   * (could be put in background class)
   ****************************************************/
  crashed(newBlock){
    return (Math.ceil(newBlock[0]) < W * 0.1 || 
    Math.ceil(newBlock[0]) >= W * 0.9 || 
    Math.floor(newBlock[1]) < Math.floor(W * 0.14) || 
    Math.ceil(newBlock[1] - W / 50) > Math.ceil(W * 1.1))
  }

  /**********************************************************
   * the loop that controls the game. requestAnimation frame
   * is what get the screen to rerender with new positions
   ***********************************************************/
  loop() {
    if (this.gameOver)
      return
    this.frame++
    this.update()
    this.render()
    this.aniId = window.requestAnimationFrame(this.bindLoop)
  }
}
