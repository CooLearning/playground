interface ShortAndLongClickOptions {
  element: HTMLElement;

  timeout?: number;

  handleShortClick(e: MouseEvent): void;

  handleLongClick(e: MouseEvent): void;
}

export class ShortAndLongClick {
  private timer: NodeJS.Timeout;

  private element: ShortAndLongClickOptions['element'];

  private readonly handleShortClick: ShortAndLongClickOptions['handleShortClick'];

  private readonly handleLongClick: ShortAndLongClickOptions['handleLongClick'];

  private readonly timeout: ShortAndLongClickOptions['timeout'];

  private constructor(options: ShortAndLongClickOptions) {
    this.element = options.element;
    this.timeout = options.timeout || 600;
    this.handleShortClick = options.handleShortClick;
    this.handleLongClick = options.handleLongClick;

    this.createEventListeners();
  }

  public static create(options: ShortAndLongClickOptions): ShortAndLongClick {
    return new ShortAndLongClick(options);
  }

  private clearTimer() {
    if (!this.timer) {
      return;
    }

    clearTimeout(this.timer);
    this.timer = null;
  }

  private createEventListeners() {
    this.element.addEventListener('mousedown', (e) => {
      this.timer = setTimeout(() => {
        this.clearTimer();
        this.handleLongClick(e);
      }, this.timeout);
    });

    this.element.addEventListener('mouseup', (e) => {
      if (!this.timer) {
        return;
      }

      this.clearTimer();
      this.handleShortClick(e);
    });
  }
}
