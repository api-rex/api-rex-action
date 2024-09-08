import {getInputVar} from "./helper";

const axios = require("axios");

class ApiRex {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.apiBaseUrl = getInputVar("API_BASE_URL");
  }

  async importFile(projectUid, file, importMethod, autoPublish) {
    const url = `${this.apiBaseUrl}/import`;
    const headers = {
      "Content-Type": "application/json",
      "x-api-key": this.apiKey,
    };
    const data = {
      project_uid: projectUid,
      import_method: importMethod,
      auto_publish: autoPublish,
      data: {
        file: file,
      },
    };
    return axios.put(url, data, {headers});
  }
}

export default ApiRex;
