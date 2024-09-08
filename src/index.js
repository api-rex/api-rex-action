const {setOutput} = require("@actions/core");
const {validateFile, getInputVar} = require("./helper");
const ApiRex = require("./api");

async function run() {
  const path = getInputVar("FILE_PATH");
  await validateFile(getInputVar("FILE_PATH"));

  const projectUid = getInputVar("PROJECT_UID");
  const apiKey = getInputVar("SECRET_API_KEY");
  const importMethod = getInputVar("IMPORT_METHOD");
  const autoPublish = getInputVar("AUTO_PUBLISH");

  const apiRex = new ApiRex(apiKey);
  await apiRex.importFile(projectUid, path, importMethod, autoPublish);

  setOutput("message", `File ${path} was successfully imported`);
}

run();
