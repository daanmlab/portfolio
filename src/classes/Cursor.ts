import "../styles/cursor.scss";
import gsap from "gsap";

interface CursorElement extends HTMLSpanElement {
  duration?: number;
}

const debounce = function <T = unknown>(fn: (e: T) => unknown, timeout = 300) {
  let timer: NodeJS.Timeout;
  return (e: T) => {
    timer = setTimeout(() => {
      fn(e);
    }, timeout);
  };
};

export class Cursor {
  elements: Record<string, CursorElement> = {
    cursor: document.createElement("span"),
    follower: document.createElement("span"),
  };

  adjustOnMoveElements;

  constructor({
    adjustOnMoveElements,
  }: {
    adjustOnMoveElements?: {
      element: Element;
      fn: ({
        x,
        y,
        element,
      }: {
        x: number;
        y: number;
        element: Element;
      }) => void;
    }[];
  }) {
    this.adjustOnMoveElements = adjustOnMoveElements || [];
    this.createCursor();
    this.createFollower();
    this.setListeners();
  }

  createCursor(): void {
    this.elements.cursor.id = "Cursor";
    this.elements.cursor.duration = 0.1;

    gsap.set(this.elements.cursor, { xPercent: -50, yPercent: -50 });

    document.body.appendChild(this.elements.cursor);
  }

  createFollower() {
    this.elements.follower.id = "Follower";
    this.elements.follower.appendChild(document.createElement("span"));
    this.elements.follower.appendChild(document.createElement("span"));
    this.elements.follower.duration = 0.3;

    gsap.set(this.elements.follower, { xPercent: -50, yPercent: -50 });

    document.body.appendChild(this.elements.follower);
  }

  setListeners() {
    const debouncedOnMouseMove = debounce(this.onMouseMove, 10);

    window.addEventListener("mousemove", debouncedOnMouseMove);
    window.addEventListener("mouseout", (e) => this.onMouseOut(e));
    window.addEventListener("mousedown", (e) => this.onMouseDown(e));
    window.addEventListener("mouseup", (e) => this.onMouseUp(e));

    window.addEventListener("touchstart", () => {
      document.body.removeChild(this.elements.cursor);
      document.body.removeChild(this.elements.follower);
      window.removeEventListener("mousemove", debouncedOnMouseMove);
      window.removeEventListener("mouseout", (e) => this.onMouseOut(e));
      window.removeEventListener("mousedown", (e) => this.onMouseDown(e));
      window.removeEventListener("mouseup", (e) => this.onMouseUp(e));
    });
  }

  onMouseMove = (e: MouseEvent) => {
    const {
      nodeName,
      dataset,
      offsetLeft,
      offsetWidth,
      offsetTop,
      offsetHeight,
    } = e.target as HTMLElement;

    const isClickable = ["BUTTON", "A"].includes(nodeName);
    const isStickyButton = dataset.stickyButton !== undefined;

    if (!isStickyButton) {
      Object.values(this.elements).forEach((element) => {
        gsap.to(element, {
          x: e.clientX,
          y: e.clientY,
          scale: 1,
          duration: element.duration,
          overwrite: true,
        });
      });
    }

    switch (true) {
      case isStickyButton:
        {
          // const { x, y } = {
          //   x: offsetLeft - 15,
          //   y: offsetTop + offsetHeight * 0.5,
          // };

          const {
            x: tX,
            y: tY,
            height,
            width,
          } = (e.target as HTMLElement).getBoundingClientRect();

          let x = tX + width * 0.5;
          let y = tY + height * 0.5;
          let size = "1em";

          switch (dataset.stickyButton) {
            case "centered":
              {
                x = tX + width * 0.5;
                y = tY + height * 0.5;
                size = `${height * 2}px`;
              }
              break;
            case "left":
              {
                x = tX - 30;
                y = tY + height * 0.5;
                size;
              }
              break;
            default: {
              x = tX + width * 0.5;
              y = tY + height * 0.5;
              size = `${height * 2}px`;
            }
          }

          gsap.to(this.elements.cursor, {
            x,
            y,
            scale: 1,
            duration: this.elements.cursor.duration,
            overwrite: true,
          });
          gsap.to(this.elements.follower, {
            x: e.clientX,
            y: e.clientY,
            scale: 1,
            duration: this.elements.follower.duration,
            overwrite: true,
          });

          this.elements.cursor.style.width = size;
          this.elements.cursor.style.height = size;

          this.elements.follower.style.height = `.5em`;
          this.elements.follower.style.width = `.5em`;
        }
        break;
      case isClickable:
        {
          this.elements.cursor.style.width = `2em`;
          this.elements.cursor.style.height = `2em`;
          this.elements.follower.style.height = `1.4em`;
          this.elements.follower.style.width = `1.4em`;
        }
        break;

      default:
        {
          this.elements.cursor.style.width = ``;
          this.elements.cursor.style.height = ``;

          this.elements.follower.style.height = ``;
          this.elements.follower.style.width = ``;
        }
        break;
    }

    // offsetLeft,
    //   offsetWidth,
    //   offsetTop,
    //   offsetHeight,

    this.adjustOnMoveElements.forEach(({ element, fn }) => {
      fn({
        element,
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    });
  };

  onMouseOut = (e: MouseEvent) => {
    // To check if its not a child element
    if (!e.relatedTarget) {
      setTimeout(() => {
        Object.values(this.elements).forEach((element) => {
          gsap.to(element, {
            x: e.clientX,
            y: e.clientY,
            scale: 0,
            duration: element.duration,
            overwrite: true,
          });
        });
      }, 15);
    }
  };

  onMouseDown = (e: MouseEvent) => {
    this.elements.cursor.style.width = `2em`;
    this.elements.cursor.style.height = `2em`;
    this.elements.follower.style.height = `2em`;
    this.elements.follower.style.width = `2em`;
  };
  onMouseUp = (e: MouseEvent) => {
    // to return the cursor to the last state (like hovering a button)
    this.onMouseMove(e);
  };
}
