import { elementController } from "./controllers/element-controller.js";
import { jobsController } from "./controllers/jobs-controller.js";
import { regionController } from "./controllers/region-controller.js";

(() => {
  const regions = document.querySelector("[data-element='regions']");
  const results = document.querySelector("[data-element='results']");

  regionController.renderRegions();
  jobsController.renderJobs("all");

  regions.addEventListener("change", (evt) => {
    const currentCity = evt.target.value.toLowerCase();
    elementController.clearContent(results);
    jobsController.renderJobs(currentCity);
  });
})();
