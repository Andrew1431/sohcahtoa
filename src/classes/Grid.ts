import { Base } from './Base';

export class Grid extends Base {
  public space = 50;
  render() {
    const { ctx } = this;
    const { width, height } = this.canvas;
    const cX = Math.floor(width / 2) - this.parent.x;
    const cY = Math.floor(height / 2) - this.parent.y;
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.fillRect(cX, 0, 1, height);
    ctx.fillRect(0, cY, width, 1);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    for (let x = cX % this.space; x < width; x += this.space) {
      ctx.fillRect(x, 0, 1, height);
    }
    for (let y = cY % this.space; y < height; y += this.space) {
      ctx.fillRect(0, y, width, 1);
    }
  }
}
