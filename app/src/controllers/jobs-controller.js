import { elementController } from "../controllers/element-controller.js";
import { Job } from "../models/Job.js";
import { jobService } from "../services/job-service.js";

export const jobsController = {
  renderJobs(city) {
    const resultWrapper = document.querySelector("[data-element='results']");

    jobService.listPerCity(city).then((jobs) => {
      jobs[0].forEach((job) => {
        resultWrapper.appendChild(this.generateCard(new Job(job, city)))
      });
    });

  },

  generateCard(job) {
    const jobItem = elementController.generateElement(
      "article",
      "results__item"
    );
    const jobBanner = this.generateCardBanner();
    const jobContent = this.generateCardContent(job);

    jobItem.appendChild(jobBanner);
    jobItem.appendChild(jobContent);

    return jobItem;
  },

  generateCardContent(job) {
    const itemContent = elementController.generateElement(
      "div",
      "item--wrapper"
    );

    const itemTitle = this.generateCardTitle(job);
    const itemDetails = this.generateCardTags(job);
    const itemOptions = this.generateCardLinks();

    itemContent.appendChild(itemTitle);
    itemContent.appendChild(itemDetails);
    itemContent.appendChild(itemOptions);

    return itemContent;
  },

  generateCardBanner() {
    const banner = elementController.generateElement("div", "item__banner");
    const img = elementController.generateElement("img", "banner__image");

    img.setAttribute(
      "src",
      "./app/assets/images/maria-hada-TBuXA-TNtLI-unsplash.jpg"
    );
    banner.appendChild(img);

    return banner;
  },

  generateCardTitle(job) {
    const title = elementController.generateElement("h5", "item__title");

    title.textContent = job.title;

    return title;
  },

  generateCardTags(job) {
    const tags = elementController.generateElement("ul", "item__details");
    const price = elementController.generateElement("li","details__price");
    const location = elementController.generateElement("li","details__location");

    price.textContent = job.payment;
    location.textContent = job.city.toUpperCase();

    tags.appendChild(price);
    tags.appendChild(location);

    return tags;
  },

  generateCardLinks() {
    const options = elementController.generateElement("div", "item__options");
    const detailLink = elementController.generateElement("a", "options__link");
    const chatLink = elementController.generateElement("a", "options__link");

    chatLink.setAttribute("href", "#");
    detailLink.setAttribute("href", "#");

    chatLink.textContent = "Conversar";
    detailLink.textContent = "Ver Detalhes";

    options.appendChild(detailLink);
    options.appendChild(chatLink);

    return options;
  },
};
