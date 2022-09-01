import { jobService } from "../services/job-service.js";
import { elementController } from "./element-controller.js";

export const regionController = {
  renderRegions() {
    const citiesWrapper = document.querySelector("[data-element='regions']");

    jobService.listCities().then((cities) => {
      cities.forEach((city) => {
        citiesWrapper.appendChild(this.generateOption(city.name));
      });
    });
  },

  generateOption(city) {
    const cityOption = elementController.generateElement(
      "option",
      "select__option"
    );

    let formatCity = () => {
      let firstLetter = city[0].toUpperCase();
      let result = city.replace(city[0], firstLetter);
      return result;
    };

    cityOption.textContent = formatCity();
    cityOption.value = formatCity();

    console.log(city);

    return cityOption;
  },
};
