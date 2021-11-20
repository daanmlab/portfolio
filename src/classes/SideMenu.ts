import "../styles/side-menu.scss";

import gsap from "gsap";

interface item {
  name: string;
  onClick: () => void;
}

export class SideMenu {
  private sideMenuElement = document.createElement("div");
  private sideMenuTriggerElement = document.createElement("button");

  public items: item[] = [];

  public open = false;

  constructor({ items }: { items: item[] }) {
    this.items = items || [];
    this.createSideMenu();
    this.createSideMenuTrigger();
  }

  createSideMenu() {
    const ul = document.createElement("ul");

    this.items.forEach(({ name, onClick }) => {
      const li = document.createElement("li");
      li.innerText = name;
      li.dataset.content = name;
      li.dataset.stickyButton = "left";
      li.addEventListener("click", (e) => {
        if (this.open) {
          onClick();
          this.toggleMenu();
        }
      });
      ul.append(li);
    });

    this.sideMenuElement.append(ul);

    this.sideMenuElement.id = "SideMenu";

    document.body.append(this.sideMenuElement);
  }

  createSideMenuTrigger() {
    this.sideMenuTriggerElement.append(
      document.createElement("span"),
      document.createElement("span"),
      document.createElement("span")
    );

    this.sideMenuTriggerElement.id = "SideMenuTrigger";

    this.sideMenuTriggerElement.addEventListener("click", () =>
      this.toggleMenu()
    );

    document.body.append(this.sideMenuTriggerElement);
  }

  toggleMenu() {
    this.sideMenuTriggerElement.classList.toggle("is-open");
    this.sideMenuElement.classList.toggle("is-open");
    this.open = !this.open;
  }
}
