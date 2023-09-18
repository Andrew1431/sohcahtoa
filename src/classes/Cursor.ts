import { Base } from './Base';

const SQUARE_LENGTH = 10;

export class Cursor extends Base {
  private cursorX = 0;
  private cursorY = 0;
  private dragging = false;

  constructor() {
    super();
    this.shouldRender = false;
  }
  setup() {
    this.canvas.addEventListener('mousemove', this.move);
    this.canvas.addEventListener('mousedown', this.down);
    this.canvas.addEventListener('mouseup', this.up);
    this.canvas.addEventListener('mouseleave', this.up);
  }
  up = (e: MouseEvent) => {
    e.preventDefault();
    this.dragging = false;
  }
  down = (e: MouseEvent) => {
    e.preventDefault();
    if (e.button === 0) {
      this.dragging = true;
    }
  }
  move = (e: MouseEvent) => {
    if (!this.dragging) return;

    requestAnimationFrame(() => {
      this.shouldRender = true;

      this.cursorX = this.parent.x + e.clientX;
      this.cursorY = this.parent.y + e.clientY;
  
      this.manager.rerender();
    })
  }
  render() {
    const { width, height } = this.canvas;
    const { ctx } = this;

    const centerX = Math.floor(width / 2) - this.parent.x;
    const centerY = Math.floor(height / 2) - this.parent.y;
    const destX = this.cursorX - this.parent.x;
    const destY = this.cursorY - this.parent.y;
    const x = destX - centerX;
    const y = destY - centerY;
    const halfX = centerX + (x / 2);
    const halfY = centerY + (y / 2);

    ctx.strokeStyle = 'red';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(destX, destY);
    ctx.stroke();

    ctx.strokeStyle = 'yellow';
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(destX, centerY);
    ctx.stroke();

    ctx.strokeStyle = 'blue';
    ctx.beginPath();
    ctx.moveTo(destX, centerY);
    ctx.lineTo(destX, destY);
    ctx.stroke();

    ctx.strokeStyle = 'green';
    ctx.beginPath();
    const radius = Math.sqrt((x ** 2) + (y ** 2));
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.beginPath();
    const rads = Math.atan2(y, x);
    ctx.arc(centerX, centerY, radius + 5, 0, rads);
    ctx.stroke();

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '14px Trebuchet MS';

    ctx.save();
    ctx.translate(halfX, halfY);
    ctx.rotate(rads + (x < 0 ? Math.PI : 0));
    ctx.fillStyle = 'red';
    ctx.fillText(`${Math.floor(radius)}px`, 0, -6);
    ctx.restore();

    ctx.save();
    ctx.translate(destX, halfY);
    if (x < 0) {
      ctx.rotate(Math.PI / 2);
    } else {
      ctx.rotate(-Math.PI / 2);
    }
    ctx.fillStyle = 'blue';
    ctx.fillText(`${y}px`, 0, -6);
    ctx.restore();

    ctx.save();
    ctx.translate(halfX, centerY);
    ctx.fillStyle = 'yellow';
    ctx.fillText(`${x}px`, 0, -6);
    ctx.restore();

    ctx.strokeStyle = 'lightgrey';
    ctx.strokeRect(
      x < 0 ? destX : destX - SQUARE_LENGTH,
      y < 0 ? centerY - SQUARE_LENGTH : centerY,
      SQUARE_LENGTH,
      SQUARE_LENGTH
    );

    ctx.beginPath();
    const theta = Math.atan2(y, x);
    if (y > 0 && x > 0) {
      ctx.arc(centerX, centerY, SQUARE_LENGTH * 2, 0, theta);
    } else if (y < 0 && x > 0) {
      ctx.arc(centerX, centerY, SQUARE_LENGTH * 2, theta, 0);
    } else if (y < 0 && x < 0) {
      ctx.arc(centerX, centerY, SQUARE_LENGTH * 2, Math.PI, theta);
    } else if (y > 0 && x < 0) {
      ctx.arc(centerX, centerY, SQUARE_LENGTH * 2, theta, Math.PI);
    }
    ctx.stroke();
  }
}
