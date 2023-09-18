import { Base } from './Base';
import { Cursor } from './Cursor';
import { Grid } from './Grid';
import { Scroller } from './Scroller';

export class CanvasManager extends Base {
  public ctx: CanvasRenderingContext2D
  public children: Base[] = []
  public initialized = false;

  constructor(public canvas: HTMLCanvasElement) {
    super();
    this.ctx = canvas.getContext('2d')!;

    const scroller = new Scroller();
    this.addChild(scroller);
    scroller.addChild(new Grid());
    scroller.addChild(new Cursor());
    this.initialized = true;
    this.rerender();
  }

  addChild = (child: Base) => {
    this.children.push(child);
    child.canvas = this.canvas;
    child.ctx = this.ctx;
    child.manager = this;
    child.setup();
    if (this.initialized) {
      this.rerender();
    }
  }

  clear = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  renderChild = (child: Base) => {
    if (!child.shouldRender) return;

    child.render();

    if (child.children.length) {
      child.children.forEach(this.renderChild);
    }
  }

  rerender = () => {
    this.clear();
    this.children.forEach(this.renderChild);
  }
}