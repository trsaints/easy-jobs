import { elementController } from "./controllers/element-controller.js";
import { jobsController } from "./controllers/jobs-controller.js";
import { regionController } from "./controllers/region-controller.js";
import { modalController } from "./controllers/modal-controller.js";

(() => {
  const regions = document.querySelector("[data-element='regions']");
  const results = document.querySelector("[data-element='results']");
  const closeModalBtn = document.querySelector("[data-modal='close']");

  regionController.renderRegions();
  jobsController.renderJobs("all");

  regions.addEventListener("change", (evt) => {
    const currentCity = evt.target.value.toLowerCase();
    elementController.clearContent(results);
    jobsController.renderJobs(currentCity);
  });

  closeModalBtn.addEventListener("click", () => {
    modalController.closeModal();
  });

  document.addEventListener("keydown", (evt) => {
    modalController.exitModal(evt.key);
  });
})();
