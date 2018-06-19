const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

export default class button{
  /*************************************************
   * directions is an array with the info for all 
   * four direction buttons, as shown below
   * [[upArry], [downArray], [leftArray], [rightArray]]
   * example: upArray = ['up', x-coord, y-coor, width, height]
   ************************************************************/
  constructor(...directions) {
    this.directions = directions
    this.up = new Image()
    this.down = new Image()
    this.left = new Image()
    this.right = new Image()
    this.up.src = `images/up.png`    
    this.down.src = `images/down.png`    
    this.left.src = `images/left.png`    
    this.right.src = `images/right.png`    
  }
  
  /*********************************************************
   * goes through the directions to see if the coordinates
   * of the push falls within any of the buttons, and returns
   * the new or old direction accordingly 
   ********************************************************/
  pressed(X, Y, oldDir){
    let direction = this.directions.find(dir =>{
      return (X >= dir[1] && X <= dir[1] + dir[3] &&
        Y >= dir[2] && Y <= dir[2] + dir[4]
      )
    })
    //makes sure that the worm can only turn 90 degrees
    if(direction)
      switch (direction[0]) {
        case 'up':
          return oldDir === 'down' ? oldDir : direction[0]
        case 'down':
          return oldDir === 'up' ? oldDir : direction[0]
        case 'left':
          return oldDir === 'right' ? oldDir : direction[0]
        case 'right':
          return oldDir === 'left' ? oldDir : direction[0]
      }
    return oldDir
  }

  /*************************************
   * renders the class to the canvas
   ************************************/
  drawToCanvas(ctx) {
    this.directions.forEach( (dir) => {
      ctx.drawImage(
        this[dir[0]], //'this.up', 'this.down' ... refrences imgages
        dir[1], //x-coord
        dir[2], //y-coord
        dir[3], //width
        dir[4]  //height
      )
    })
  }
}


