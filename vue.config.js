const routes = require("./src/router/routesForSitemap");

module.exports = {
  pluginOptions: {
    sitemap: {
      pretty: true,
      baseURL: "https://turba.geoloogia.info",
      routes
    }
  }
};
