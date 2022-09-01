import { elementController } from "./controllers/element-controller.js";
import { jobsController } from "./controllers/jobs-controller.js";
import { regionController } from "./controllers/region-controller.js";

(() => {
  const regions = document.querySelector("[data-element='regions']");
  const results = document.querySelector("[data-element='results']");

  regionController.renderRegions();

  regions.addEventListener("change", (evt) => {
    const currentCity = evt.target.value.toLowerCase();
    console.log(currentCity);
    elementController.clearContent(results);

    if (currentCity === "all") {
      return;
    } else {
      jobsController.renderJobs(currentCity);
    }
  });
})();
