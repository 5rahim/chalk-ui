const sharedConfig = require("../../tailwind.config");

module.exports = {
  // prefix ui lib classes to avoid conflicting with the app
  presets: [sharedConfig],
};
