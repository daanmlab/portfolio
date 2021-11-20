(async () => {
  const { Loader } = await import("./classes/Loader");

  const loader = new Loader({
    element: document.querySelector("#Loader") || document.createElement("div"),
    fonts: [
      new FontFace("Lato", "url('/fonts/Lato/Lato-Light.ttf')", {
        weight: "300",
      }),
      new FontFace("Lato", "url('/fonts/Lato/Lato-Regular.ttf')", {
        weight: "400",
      }),
      new FontFace("Lato", "url('/fonts/Lato/Lato-Italic.ttf')", {
        weight: "400",
        style: "italic",
      }),
      new FontFace("Lato", "url('/fonts/Lato/Lato-Bold.ttf')", {
        weight: "700",
      }),

      new FontFace(
        "Montserrat",
        "url('/fonts/Montserrat/Montserrat-Light.ttf')",
        {
          weight: "300",
        }
      ),
      new FontFace(
        "Montserrat",
        "url('/fonts/Montserrat/Montserrat-Regular.ttf')",
        {
          weight: "400",
        }
      ),
    ],
    images: ["images/broodhuys.png", "images/crest.png", "images/incaze.png"],
  });

  await loader.load();

  // @ts-ignore
  const { Gradient } = await import("./classes/pocoloco/index.js");
  new Gradient().initGradient("#Canvas");

  // Image Loading/Replace base64
  const elementsThatNeedSrc = document.querySelectorAll(
    "[data-src]"
  ) as NodeListOf<HTMLImageElement>;

  elementsThatNeedSrc.forEach((e) => {
    e.src = loader.images[e.dataset.src ?? 0];
    delete e.dataset.src;
  });
    // Create cursor
    const { Cursor } = await import("./classes/Cursor");
    const cursor = new Cursor({});
  

  // Create magnetice buttons
  // const { MagneticButton } = await import("./classes/Magnetic");
  // const magneticButtons = document.querySelectorAll("[data-magnetic]");
  // Array.from(magneticButtons).map((a) => {
  //   const element = a as HTMLElement;
  //   new MagneticButton({
  //     element,
  //   });
  // });
})();

import "./styles/sections/hello.scss";
import "./styles/sections/projects.scss";
// Styles
import "./styles/main.scss";
// import "./styles/background.scss";

// import "./styles/sections/about.scss";
