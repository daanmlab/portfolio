import "../styles/loader.scss";

export class Loader {
  loaderElement;
  spanElement;

  private _loaded = 0;

  public get loaded(): number {
    return this._loaded / (this.fonts.length + Object.keys(this.images).length);
  }
  public set loaded(a: unknown) {
    console.log("loaded", a);
    this._loaded++;
    this.spanElement.style.transform = `scaleX(${
      this._loaded / (this.fonts.length + Object.keys(this.images).length)
    })`;
  }

  public fonts: FontFace[] = [];
  public images: { [k: string]: string } = {};

  constructor({
    fonts,
    images,
    element,
  }: {
    fonts: FontFace[];
    images: string[];
    element: HTMLDivElement;
  }) {
    this.fonts = fonts;
    images.forEach((img) => (this.images[img] = img));
    this.loaderElement = element;
    this.loaderElement.id = "Loader";
    this.spanElement = document.createElement("span");
    this.loaderElement.append(this.spanElement);
    document.body.append(this.loaderElement);
  }

  async load() {
    document.body.style.display = "";
    // @ts-ignore
    document.firstElementChild.style.backgroundColor = "";

    await this.loadFonts();
    await this.loadImages();
    setTimeout(() => {
      this.loaderElement.classList.add("is-loaded");
    }, 200);
    return;
  }

  async loadFonts() {
    this.fonts = await Promise.all(
      this.fonts.map(async (f) => {
        await f.load();
        this.loaded = `${f.family} ${f.weight} ${f.style}`;
        // @ts-ignore
        document.fonts.add(f);
        return f;
      })
    );
    return;
  }

  async loadImages() {
    const a = Object.entries(this.images).map(async ([v, s]) => {
      const extension = (() => {
        const a = v.split(".");
        return a[a.length - 1];
      })();

      switch (extension) {
        case "svg":
          {
            const image = new Image();
            await new Promise((res, rej) => {
              image.src = s as string;
              image.onload = res;
              image.onerror = rej;
            });
            this.loaded = s;
            this.images[v] = s;
          }
          break;

        default:
          {
            const canvas = document.createElement("canvas");
            const image = new Image();
            await new Promise((res, rej) => {
              image.src = s as string;
              image.onload = res;
              image.onerror = rej;
            });
            this.loaded = s;
            canvas.height = image.naturalHeight;
            canvas.width = image.naturalWidth;
            const ctx = canvas.getContext("2d");
            ctx?.drawImage(image, 0, 0, canvas.width, canvas.height);
            this.images[v] = canvas.toDataURL();
          }
          break;
      }
    });

    await Promise.all(a);
    return;
  }
}
