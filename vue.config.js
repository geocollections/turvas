const routes = require("./src/router/routesForSitemap");

module.exports = {
  transpileDependencies: ["vuetify"],
  pluginOptions: {
    sitemap: {
      pretty: true,
      baseURL: "https://turba.geoloogia.info",
      routes
    }
  }
};
