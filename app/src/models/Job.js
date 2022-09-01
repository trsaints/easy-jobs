export class Job {
  #title;
  #payment;
  #description;
  #city;

  constructor(job, city) {
    this.#title = job.title;
    this.#payment = job.payment;
    this.#description = job.description;
    this.#city = city;
  }

  get title() {
    return this.#title
  }

  get payment() {
    return this.#payment;
  }

  get description() {
    return this.#description;
  }

  get city() {
    return this.#city;
  }
}