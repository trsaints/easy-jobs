export class Job {
  #title;
  #payment;
  #description;
  #city;
  #id;

  static count = 0;

  constructor(job, city) {
    this.#title = job.title;
    this.#payment = job.payment;
    this.#description = job.description;
    this.#city = city;
    this.#id = job.id;

    Job.count++;
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

  get count() {
    return Job.count;
  }

  get id() {
    return this.#id;
  }
}