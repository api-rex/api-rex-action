const fs = require("fs");
const FormData = require("form-data");
const {getInputVar} = require("./helper");
const axios = require("axios");

class ApiRex {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.apiBaseUrl =
      getInputVar("API_BASE_URL") ?? "https://proxy.api-rex.com";
  }

  async importFile(projectUid, filePath, importMethod, autoPublish) {
    const url = `${this.apiBaseUrl}/github_action/import`;

    const formData = new FormData();

    // Append file
    const fileContent = fs.readFileSync(filePath); // Binary format for file content
    formData.append("file", fileContent, filePath);

    // Append other fields
    formData.append("project_uid", projectUid);
    formData.append("import_method", importMethod);
    formData.append("auto_publish", autoPublish);

    // Override Content-Type for multipart data
    const headers = {
      "X-API-KEY": this.apiKey.toString(),
      ...formData.getHeaders(),
    };

    return axios.put(url, formData, {headers});
  }
}

module.exports = ApiRex;
