const axios = require("axios");

// vue-cli-plugin can only get routes using the following format.
// https://github.com/cheap-glitch/vue-cli-plugin-sitemap/issues/7
// Following routes are copied from the index.js file (+ some small formatting has been done i.e., removed (\\d+) from the end).
module.exports = [
  {
    path: "*",
    redirect: "/"
  },
  {
    path: "/projekti_info",
    name: "About",
    component: () => import("../views/About.vue"),
    meta: {
      title: "Turbageoloogia andmebaas: Projekti info"
    }
  },
  {
    path: "/kasutusjuhend",
    name: "UserManual",
    component: () => import("../views/UserManual.vue"),
    meta: {
      title: "Turbageoloogia andmebaas: Kasutusjuhend"
    }
  },
  {
    path: "/",
    component: () => import("../views/UserManual.vue"),
    children: [
      {
        path: "",
        name: "FrontPage",
        component: () => import("../components/home/FrontPage.vue")
      },
      {
        path: "turbaala",
        component: () => import("../views/Detail.vue"),
        children: [
          {
            path: "",
            name: "AreaTable",
            component: () => import("../components/area/AreaTable.vue"),
            meta: {
              object: "area",
              title: "Turbageoloogia andmebaas: Turbaalad"
            }
          },
          {
            path: ":id",
            name: "AreaDetail",
            component: () => import("../components/area/Area.vue"),
            meta: {
              object: "area",
              title: "Turbageoloogia andmebaas: Turbaala ",
              sitemap: {
                slugs: async () => await getIdsForSitemap("area")
              }
            }
          }
        ]
      },
      {
        path: "proovipunkt",
        component: () => import("../views/Detail.vue"),
        children: [
          {
            path: "",
            name: "SiteTable",
            component: () => import("../components/site/SiteTable.vue"),
            meta: {
              object: "site",
              title: "Turbageoloogia andmebaas: Proovipunktid"
            }
          },
          {
            path: ":id",
            name: "SiteDetail",
            component: () => import("../components/site/Site.vue"),
            meta: {
              object: "site",
              title: "Turbageoloogia andmebaas: Proovipunkt ",
              sitemap: {
                slugs: async () => await getIdsForSitemap("site")
              }
            }
          }
        ]
      },
      {
        path: "proov",
        component: () => import("../views/Detail.vue"),
        children: [
          {
            path: "",
            name: "SampleTable",
            component: () => import("../components/sample/SampleTable.vue"),
            meta: {
              object: "sample",
              title: "Turbageoloogia andmebaas: Proovid"
            }
          },
          {
            path: ":id",
            name: "SampleDetail",
            component: () => import("../components/sample/Sample.vue"),
            meta: {
              object: "sample",
              title: "Turbageoloogia andmebaas: Proov ",
              sitemap: {
                slugs: async () => await getIdsForSitemap("sample")
              }
            }
          }
        ]
      }
    ]
  }
];

async function getIdsForSitemap(table) {
  if (table) {
    const API_URL = "https://api.geocollections.info/";

    let url = API_URL + table + "?";

    if (table === "area") {
      url += "area_type=2&";
    } else if (table === "site") {
      url += "project=20&";
    } else if (table === "sample") {
      url += "site__project=20&";
    }

    url += "fields=id&format=json";

    const response = await axios.get(url);

    if (response.status === 200) return response.data.results || [2];
    else return [1];
  } else return [1];
}
