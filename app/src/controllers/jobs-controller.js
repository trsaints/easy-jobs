import { elementController } from "../controllers/element-controller.js";
import { modalController } from "./modal-controller.js";
import { Job } from "../models/Job.js";
import { jobService } from "../services/job-service.js";

export const jobsController = {
  renderJobs(path) {
    const resultWrapper = document.querySelector("[data-element='results']");

    Job.count = 0;

    if (!resultWrapper.classList.contains("loading")) {
      resultWrapper.classList.add("loading");
    }

    const renderType = {
      specify(jobs) {
        jobs[0].forEach((job) => {
          resultWrapper.appendChild(
            jobsController.generateCard(new Job(job, path))
          );
        });
      },
      listAll(regions) {
        regions.forEach((region) => {
          region[region.name].forEach((job) => {
            resultWrapper.appendChild(
              jobsController.generateCard(new Job(job, region.name))
            );
          });
        });
      },
    };

    if (path !== "all") {
      jobService.listPerCity(path).then((jobs) => {
        renderType.specify(jobs);
        this.showResultCount(Job.count);
        resultWrapper.classList.remove("loading");
      });
    } else {
      jobService.listCities().then((regions) => {
        renderType.listAll(regions);
        this.showResultCount(Job.count);
        resultWrapper.classList.remove("loading");
      });
    }
  },

  showResultCount(count) {
    const resultsPlaceholder = document.querySelector(
      "[data-element='resultsCount']"
    );

    resultsPlaceholder.textContent = `Mostrando ${count} trabalho(s) encontrado(s)`;
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
    this.setCardId(jobItem, job)

    return jobItem;
  },

  setCardId(card, job) {
    card.dataset.job = job.id;
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
    const price = elementController.generateElement("li", "details__price");
    const location = elementController.generateElement(
      "li",
      "details__location"
    );
    const locationIcon = elementController.generateElement("i", "fa-solid");
    locationIcon.classList.add("fa-location-dot");

    let formatCity = () => {
      let firstLetter = job.city[0].toUpperCase();
      let result = job.city.replace(job.city[0], firstLetter);
      return result;
    };

    price.textContent = job.payment;
    location.textContent = `${formatCity()} `;
    location.appendChild(locationIcon);

    tags.appendChild(price);
    tags.appendChild(location);

    return tags;
  },

  generateCardLinks() {
    const options = elementController.generateElement("div", "item__options");
    const detailButton = elementController.generateElement("button", "options__detail");
    const chatLink = elementController.generateElement("a", "options__link");
    const detailIcon = elementController.generateElement("i", "fa-solid");
    const chatIcon = elementController.generateElement("i", "fa-solid");

    chatLink.setAttribute("href", "#");
    detailButton.setAttribute("href", "#");

    chatLink.textContent = "Conversar ";
    detailButton.textContent = "Ver Detalhes ";

    detailIcon.classList.add("fa-circle-info");
    chatIcon.classList.add("fa-comment-dots");

    detailButton.dataset.modal = "open";
    detailButton.addEventListener("click", (evt) => {
      modalController.openModal(evt.target);
    })

    chatLink.appendChild(chatIcon);
    detailButton.appendChild(detailIcon);

    options.appendChild(detailButton);
    options.appendChild(chatLink);

    return options;
  },
};
