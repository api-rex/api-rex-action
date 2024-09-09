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
  try {
    await apiRex.importFile(projectUid, path, importMethod, autoPublish);
  } catch (e) {
    setOutput("message", `Error importing file ${path}: ${e.message}`);
  }

  setOutput("message", `File ${path} imported successfully`);
}

run();
