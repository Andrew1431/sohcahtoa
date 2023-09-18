import { CanvasManager } from './CanvasManager';

export abstract class Base {
  public canvas: HTMLCanvasElement = undefined!;
  public ctx: CanvasRenderingContext2D = undefined!;
  public manager: CanvasManager = undefined!;
  public children: Base[] = [];
  public parent: Base = undefined!;
  public x: number = 0;
  public y: number = 0;

  private _shouldRender = true;
  get shouldRender() {
    return this._shouldRender;
  }
  set shouldRender(value) {
    this._shouldRender = value;
  }

  addChild(child: Base) {
    this.children.push(child);
    child.canvas = this.canvas;
    child.ctx = this.ctx;
    child.manager = this.manager;
    child.setup();
    child.parent = this;
    if (!this.manager.initialized) {
      return;
    }
    this.manager.rerender();
  }

  setup() {}

  render() {}
}