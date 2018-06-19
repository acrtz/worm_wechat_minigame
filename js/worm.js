const W = window.innerWidth
const H = window.innerHeight

export default class Worm {
  constructor(head) {
    this.worm = [ 
      [head[0],head[1]], 
      [head[0],head[1]+(W/50)], 
      [head[0],head[1]+(W/50)*2]
    ]
    this.head = this.head.bind(this)
    this.direction = 'up'
  }

  /******************************
   * renders class to canvas
   ******************************/
  drawToCanvas(ctx){
    let unit = W/50
    ctx.fillStyle = 'white'
    this.worm.forEach(block=>{
      ctx.fillRect(block[0], block[1], unit, unit)
    })
  }

  /*****************************************
   * returns the location of the worms head
   *****************************************/
  head(){
    return [this.worm[0][0], this.worm[0][1]]
  }

  /************************************
   * returns worms current direction
   ************************************/
  getDirection(){
    return this.direction
  }

  /************************************
   * sets worms direction
   ************************************/
  setDirection(dir){
    this.direction = dir
  }

  /*********************************************
   * detemines where to draw worms head next
   * if grow is true the tail block isnt 
   * removed so the worm grows by 1 block.
   * Also checks if worm crashed into itself
   ********************************************/
  move(grow){
    let newHead = this.head()
    switch (this.direction) {
      case 'up':
        newHead[1] = newHead[1] - W / 50
        break
      case 'down':
        newHead[1] = newHead[1] + W / 50
        break
      case 'right':
        newHead[0] = newHead[0] + W / 50
        break
      case 'left':
        newHead[0] = newHead[0] - W / 50
        break
    }

    //remove tail block
    if (!grow)
      this.worm.pop()
    //check if worm crashed into itself 
    let crashed = this.worm.some(seg => { return seg[0] === newHead[0] && seg[1] === newHead[1] })
    
    //new head only added after crash check
    this.worm.unshift(newHead)
    return crashed
  }
}
