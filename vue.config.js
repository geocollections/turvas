const routes = require("./src/router/routesForSitemap");

module.exports = {
  pluginOptions: {
    sitemap: {
      pretty: true,
      baseURL: "https://turvas.geoloogia.info",
      routes
    }
  }
};
