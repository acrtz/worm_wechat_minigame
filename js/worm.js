const W = window.innerWidth
const H = window.innerHeight

export default class Worm {
  constructor(ctx) {
    this.worm = [ 
      [W/2,W], 
      [(W/2),(W)+(W/50)], 
      [(W/2),(W)+(W/50)*2]
    ]
    this.ctx = ctx
  }

  drawToCanvas(){
    let unit = W/50
    this.ctx.fillStyle = 'white'
    this.worm.forEach(block=>{
      this.ctx.fillRect(block[0], block[1], unit, unit)
    })
  }

  move(grow, direction, endGame){
    let newBlock = [this.worm[0][0],this.worm[0][1]]
    switch(direction){
      case 'up':
        newBlock[1] = newBlock[1]-W/50
        break
      case 'down':
        newBlock[1] = newBlock[1]+W/50
        break
      case 'right':
        newBlock[0] = newBlock[0]+W/50
        break
      case 'left':
        newBlock[0] = newBlock[0]-W/50
        break
    }
    if (!grow)
      this.worm.pop()
    if (this.worm.some(seg => { return seg[0] === newBlock[0] && seg[1] === newBlock[1] })||
      (Math.ceil(newBlock[0]) < W*0.1 || Math.ceil(newBlock[0])>=W*0.9 || Math.floor(newBlock[1])< Math.floor(W*0.14) || Math.ceil(newBlock[1]-W/50)>Math.ceil(W*1.1) )){
          endGame()
        }
      
    this.worm.unshift(newBlock)
  }
}
