const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias.set("@", resolve("./src"))
    .set("@js",resolve("./src/js"))
    .set("@mapArea",resolve("./src/components/mapArea"))
    .set("@mapControls",resolve("./src/components/mapControls"));
  },
};
