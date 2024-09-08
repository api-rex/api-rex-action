const {lintFile} = require("yaml-lint");
const {getInput} = require("@actions/core");

const validateFile = async (path) => {
  if (path.includes(".")) {
    const extension = path.split(".").pop();
    if (extension === "yaml" || extension === "yml") {
      await lintFile(path).catch((err) => {
        throw new Error(err);
      });
    }
  }
};

const getInputVar = (name) => {
  return getInput(name) || process.env[name];
};

module.exports = {validateFile, getInputVar};
