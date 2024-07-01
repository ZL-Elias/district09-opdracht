class MyComponent extends HTMLElement {
  constructor() {
    super();
    // Create shadow root for element
    this.attachShadow({ mode: "open" });
  }

  // Fetch data and append to the shadow dom a filled HTML template for each event item
  connectedCallback() {
    fetch("./data.json")
      .then((response) => response.json())
      .then((data) => {
        data
          .sort((a, b) => new Date(a.startdate) - new Date(b.startdate))
          .forEach((eventData) => {
            const template = document
              .getElementById("event-item")
              .content.cloneNode(true);
            template.querySelector(".event-name").textContent = eventData.name;
            template.querySelector(".event-startdate").textContent =
              eventData.startdate;
            template.querySelector(".event-enddate").textContent =
              eventData.enddate;
            template.querySelector(".event-location").textContent =
              eventData.location;
            template.querySelector(".event-description").textContent =
              eventData.description;
            template.querySelector(".event-image").src = eventData.image;
            template.querySelector(".event-image").alt = eventData.name;
            template.querySelector(".event-link").href = eventData.link;
            this.shadowRoot.appendChild(template);
          });
      });
  }
}

customElements.define("my-component", MyComponent);
