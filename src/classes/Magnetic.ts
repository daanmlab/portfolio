import "../styles/button.scss";

import gsap from "gsap/gsap-core";

export class MagneticButton {
  element: HTMLElement;
  listenerMarginElement = document.createElement("span");
  margin: number;

  mousePosition = {
    x: 0,
    y: 0,
  };

  constructor({ element, margin }: { element: HTMLElement; margin?: number }) {
    if (!element) {
      console.error("no element was given");
    }
    this.element = element;
    this.margin = margin || 20;
    this.createListenerMargin();
  }

  createListenerMargin() {
    this.listenerMarginElement.classList.add("listener--margin");
    this.listenerMarginElement.style.padding = `${this.margin}px`;

    // Listeners
    this.listenerMarginElement.addEventListener(
      "mousemove",
      (e) => {
        const { offsetX, offsetY } = e;
        const { clientWidth, clientHeight } = e.target as HTMLSpanElement;
        const [x, y] = [
          offsetX / clientWidth - 0.5,
          offsetY / clientHeight - 0.5,
        ];

        // console.log(this.listenerMarginElement.offsetLeft);
        const isInsideMargin =
          // To check of clientX is inside listener
          e.clientX <
            this.listenerMarginElement.offsetWidth +
              this.listenerMarginElement.offsetLeft &&
          e.clientX > this.listenerMarginElement.offsetLeft &&
          // To check of clientY is inside listener
          e.clientY <
            this.listenerMarginElement.offsetWidth +
              this.listenerMarginElement.offsetTop &&
          e.clientY > this.listenerMarginElement.offsetTop;

        if (isInsideMargin) {
          gsap.to(this.element, {
            x: x * 90,
            y: y * 90,
            duration: 0.4,
            overwrite: true,
          });
        } else {
          this.onMouseOut(e);
        }
      },
      false
    );
    this.listenerMarginElement.addEventListener("mouseout", (e) =>
      this.onMouseOut(e)
    );

    (this.element.parentElement as HTMLElement).insertBefore(
      this.listenerMarginElement,
      this.element
    );
    this.listenerMarginElement.append(this.element);
  }

  onMouseOut = (e: MouseEvent) => {
    gsap.to(this.element, {
      x: 0,
      y: 0,
      duration: 0.2,
      overwrite: true,
    });
  };
}
