export const jobService = {
  apiKey: "$2b$10$IZVLAix31GSpjITpSAO8ketbp/8/A2MXyuqhVejENVI9aJxOvnvRy",

  async listPerCity(city) {
    const binURL = `https://api.jsonbin.io/v3/b/630eafbe5c146d63ca868bfe/`;
  
    const options = {
      method: "GET",
      headers: {
        "X-Access-Key": `${this.apiKey}`,
        "X-Bin-Meta": false,
        "X-JSON-Path": `$..${city}`,
        "Content-Type": "application/json",
      },
    };
  
    const response = await fetch(binURL, options);
  
    if (response.ok) {
      return response.json();
    }
  
    throw new Error("Não foi possível listar os trabalhos.");
  },

  async listCities() {
    const binURL = `https://api.jsonbin.io/v3/b/630eafbe5c146d63ca868bfe/`;

    const options = {
      method: "GET",
      headers: {
        "X-Access-Key": `${this.apiKey}`,
        "X-Bin-Meta": false,
        "X-JSON-Path": "$..cities.*",
        "Content-Type": "application/json",
      },
    };
  
    const response = await fetch(binURL, options);
  
    if (response.ok) {
      return response.json();
    }
  
    throw new Error("Não foi possível listar as cidades.");

  }
}