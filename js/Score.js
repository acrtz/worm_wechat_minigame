const W = window.innerWidth
const H = window.innerHeight

export default class Score {
  constructor(){
    this.score=0
  }
  
  /*************************
   * increment score
   **************************/
  addPoint(){
    this.score+=1
  }

   /******************************
   * renders class to canvas
   ******************************/
  drawToCanvas(ctx){
    ctx.fillStyle = "#ffffff"
    ctx.font = "30px Arial"
    ctx.fillText(
      `score: ${this.score}`,
      20,
      W * 0.1,
    )
  }
}