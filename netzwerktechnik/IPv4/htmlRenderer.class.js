export class HtmlRenderer {
  constructor() {
    this.mainContainer = document.getElementById("main");
  }

  createCard() {
    const card = document.getElementById("card").content.cloneNode(true);
    card.className = "card";
    return card;
  }

  render(template) {
    const card = this.createCard();
    card.querySelector(".header").innerHTML = template.header;
    card.querySelector(".content").innerHTML = template.content;
    this.mainContainer.appendChild(card);
  }
}