import { jobService } from "./services/job-service.js";

const str = jobService.listPerCity("taguatinga");
const str2 = jobService.listCities();

console.log(str.then(data => console.log(data)))
console.log(str2.then(data => console.log(data)))
