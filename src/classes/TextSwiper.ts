import "../styles/text-swiper.scss";

export class TextSwiper {
  element: Element;
  text: string[];
  textElements: HTMLSpanElement[] = [];
  active: number = 0;

  constructor({ element, text }: { element?: Element | null; text: string[] }) {
    this.element = element || document.createElement("span");
    this.text = text;

    this.setup();
  }

  setup() {
    (this.element as HTMLElement).innerText = "a";

    const { color } = window.getComputedStyle(this.element);
    (this.element as HTMLElement).style.color = "transparent";

    const textSpan = document.createElement("span");
    textSpan.dataset.id = "0";

    (this.element as HTMLElement).dataset.textSwiper = "";

    this.text.forEach((t, i) => {
      const tS = textSpan.cloneNode(true) as typeof textSpan;
      tS.style.color = color;

      tS.dataset.id = `${i}`;
      tS.innerText = t;

      this.textElements.push(tS);

      this.element.append(tS);

    });

    const widestElement = this.textElements.sort(
      (e1, e2) => e1.offsetWidth - e2.offsetWidth
    )[0];

    // To make sure they don't overlap
    this.textElements.forEach((el) => {
      const a = el.offsetWidth / widestElement.offsetWidth;

      el.style.animationDuration = `${2000 * (a * 0.9)}ms`;
    });

    this.textElements[0].classList.toggle("is-active");

    const next = (lastElement?: HTMLSpanElement) => {
      const element = this.textElements[this.active];

      if (lastElement) lastElement.classList.remove("is-active");
      element.classList.add("is-active");

      this.active =
        this.active + 1 === this.textElements.length ? 0 : this.active + 1;

      setTimeout(() => next(element), 5000);
    };

    next();
  }
}
