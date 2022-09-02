import { jobService } from "../services/job-service.js";

export const modalController = {
  renderContent(job) {
    this.cleanContent();

    const modal = {
      title: document.querySelector("[data-modal='title']"),
      banner: document.querySelector("[data-modal='banner']"),
      price: document.querySelector("[data-modal='price']"),
      location: document.querySelector("[data-modal='location']"),
      description: document.querySelector("[data-modal='description']"),
    };

    jobService.detailJob(job).then((details) => {
      console.log(details)
      modal.title.textContent = details[0].title;
      modal.price.textContent = details[0].payment;
      modal.location.textContent = details[0].location;
      modal.description.innerHTML = this.formatContent(details[0].description);
    });
  },

  formatContent(description) {
    return description.replaceAll(/\n/g, "<br>");
  },

  cleanContent() {
    const modal = {
      title: document.querySelector("[data-modal='title']"),
      banner: document.querySelector("[data-modal='banner']"),
      price: document.querySelector("[data-modal='price']"),
      location: document.querySelector("[data-modal='location']"),
      description: document.querySelector("[data-modal='description']"),
    };

    modal.title.textContent = "";
    modal.price.textContent = "";
    modal.location.textContent = "";
    modal.description.textContent = "";

    return;
  },

  closeModal() {
    const modal = document.querySelector("[data-element='modal']");

    const isVisible = modal.classList.contains("visible");

    if (isVisible) {
      modal.classList.remove("visible");
    }
  },

  exitModal(key) {
    if (key !== "Escape") {
      return;
    }

    const modal = document.querySelector("[data-element='modal']");

    const isVisible = modal.classList.contains("visible");

    if (isVisible) {
      modal.classList.remove("visible");
    }
  },

  openModal(target) {
    const modal = document.querySelector("[data-element='modal']");
    const targetRoot = target.parentNode.parentNode.parentNode;
    const jobId = targetRoot.dataset.job;

    const isVisible = modal.classList.contains("visible");

    if (!isVisible) {
      modal.classList.add("visible");
    }

    this.renderContent(jobId);
  },
};
