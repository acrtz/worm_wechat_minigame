const W = window.innerWidth
const H = window.innerHeight

export default class Background {
   /******************************
   * renders class to canvas
   ******************************/
  drawToCanvas(ctx){
    //create grass boundry
    let grass = new Image()
    grass.src = 'images/grass.jpg'
    ctx.drawImage(grass, 0, 0, W, H)


    //create dirt game area
    let dirt = new Image()
    dirt.src = 'images/dirt.jpeg'
    ctx.drawImage(dirt, W * 0.1, W * 0.14, W * 0.8, W)
  }
}