import { elementController } from "../controllers/element-controller.js";
import { Job } from "../models/Job.js";
import { jobService } from "../services/job-service.js";

export const jobsController = {
  renderJobs(path) {
    const resultWrapper = document.querySelector("[data-element='results']");

    const renderType = {
      specify(jobs) {
        jobs[0].forEach((job) => {
          console.log(job);
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
      });
    } else {
      jobService.listCities().then((regions) => {
        renderType.listAll(regions);
      });
    }
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
    const price = elementController.generateElement("li", "details__price");
    const location = elementController.generateElement(
      "li",
      "details__location"
    );

    let formatCity = () => {
      let firstLetter = job.city[0].toUpperCase();
      let result = job.city.replace(job.city[0], firstLetter);
      return result;
    };

    price.textContent = job.payment;
    location.textContent = formatCity();

    tags.appendChild(price);
    tags.appendChild(location);

    return tags;
  },

  generateCardLinks() {
    const options = elementController.generateElement("div", "item__options");
    const detailLink = elementController.generateElement("a", "options__link");
    const chatLink = elementController.generateElement("a", "options__link");
    const detailIcon = elementController.generateElement("i", "fa-solid");
    const chatIcon = elementController.generateElement("i", "fa-solid");

    chatLink.setAttribute("href", "#");
    detailLink.setAttribute("href", "#");

    chatLink.textContent = "Conversar ";
    detailLink.textContent = "Ver Detalhes ";

    detailIcon.classList.add("fa-circle-info");
    chatIcon.classList.add("fa-comment-dots");

    chatLink.appendChild(chatIcon);
    detailLink.appendChild(detailIcon);

    options.appendChild(detailLink);
    options.appendChild(chatLink);

    return options;
  },
};
