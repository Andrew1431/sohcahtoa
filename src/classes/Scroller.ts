import { Base } from './Base';

export class Scroller extends Base {
  private latchX = 0;
  private latchY = 0;
  private latching = false;

  setup() {
    this.canvas.addEventListener('mousemove', this.move);
    this.canvas.addEventListener('mouseup', this.up);
    this.canvas.addEventListener('mouseleave', this.up);
    this.canvas.addEventListener('mousedown', this.down);
    this.canvas.addEventListener('contextmenu', this.context);
  }

  context = (e: MouseEvent) => {
    e.preventDefault();
  }

  move = (e: MouseEvent) => {
    if (!this.latching) {
      return;
    }

    requestAnimationFrame(() => {
      this.x = this.latchX - e.clientX;
      this.y = this.latchY - e.clientY;

      this.manager.rerender();
    });
  }

  up = (e: MouseEvent) => {
    if (!this.latching) {
      return;
    }
    e.preventDefault();
    this.latching = false;
    this.canvas.style.cursor = 'auto';
  }

  down = (e: MouseEvent) => {
    if (e.button !== 2) {
      return;
    }

    this.canvas.style.cursor = 'grab';

    this.latching = true;

    e.preventDefault();
    
    this.latchX = this.x + e.clientX;
    this.latchY = this.y + e.clientY;
  }
}
