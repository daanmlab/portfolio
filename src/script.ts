import gsap from "gsap/gsap-core";
import ScrollToPlugin from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);


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
    ],
    images: [
      "images/broodhuys.png",
      "images/crest.png",
      "images/incaze.png",
      "images/bewitt.png",
      "images/simpeldeb-landing-page.png",
      "images/so_long.png",
      "images/minishell.jpeg",
      "icons/at.svg",
      "icons/github-alt.svg",
      "icons/linkedin-alt.svg",
    ],
  });

  await loader.load();

  // Image Loading/Replace base64
  const elementsThatNeedSrc = document.querySelectorAll(
    "[data-src]"
  ) as NodeListOf<HTMLImageElement>;
  console.log(loader.images);
  elementsThatNeedSrc.forEach((e) => {
    e.src = loader.images[e.dataset.src ?? 0];
    delete e.dataset.src;
  });

  
  // @ts-ignore
  const { Gradient } = await import("./classes/pocoloco/index.js");
  new Gradient().initGradient("#Canvas");

  // Create sidemenu
  const mainElement = document.querySelector("main");
  console.log(mainElement);
  const { SideMenu } = await import("./classes/SideMenu");
  new SideMenu({
    items: [
      {
        name: "Hello",
        onClick: () => {
          gsap.to(mainElement, {
            duration: 1,
            scrollTo: "#Hello",
            ease: "circ.inOut",
          });
        },
      },
      {
        name: "Projects",
        onClick: () => {
          gsap.to(mainElement, {
            duration: 1,
            scrollTo: "#Projects",
            ease: "circ.inOut",
          });
        },
      },
      {
        name: "Socials",
        onClick: () => {
          gsap.to(mainElement, {
            duration: 1,
            scrollTo: "#Socials",
            ease: "circ.inOut",
          });
        },
      },
      {
        name: "CV - NL",
        onClick: () => {
          window.open("/documents/static/documents/CV - Daan Balm - nl.pdf", "_blank");
        },
      },
      {
        name: "CV - EN",
        onClick: () => {
          window.open("/documents/static/documents/CV - Daan Balm - en.pdf", "_blank");
        },
      },
    ],
  });

  // Create cursor
  const { Cursor } = await import("./classes/Cursor");
  const cursor = new Cursor({});

  // Scroll to element based on URL hash
  const hash = window.location.hash;
  console.log(hash);
  if (hash) {
    const element = document.querySelector(hash);
    console.log(element);
    if (element) {
      gsap.to(mainElement, {
        duration: 1,
        scrollTo: element,
        ease: "circ.inOut",
      });
    }
  }

})();

// Styles
import "./styles/sections/hello.scss";
import "./styles/sections/projects.scss";
import "./styles/sections/socials.scss";

import "./styles/main.scss";
