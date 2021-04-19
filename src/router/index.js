import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const LANGUAGE_REGEX = "(ee|en)";

const routes = [
  {
    path: "*",
    redirect: "/"
  },
  {
    path: `/:locale${LANGUAGE_REGEX}?/projekti_info`,
    component: () => import("../views/About.vue"),
    meta: {
      title: "Turbauuringute andmebaas: Projekti info"
    },
    children: [
      {
        path: "",
        name: "ProjectInfo",
        component: () => import("../components/about/ProjectInfo.vue")
      }
    ]
  },
  {
    path: `/:locale${LANGUAGE_REGEX}?/kasutusjuhend`,
    component: () => import("../views/About.vue"),
    meta: {
      title: "Turbauuringute andmebaas: Kasutusjuhend"
    },
    children: [
      {
        path: "",
        name: "UserManual",
        component: () => import("../components/about/UserManual.vue")
      }
    ]
  },
  {
    path: `/:locale${LANGUAGE_REGEX}?/allalaadimine`,
    component: () => import("../views/About.vue"),
    meta: {
      title: "Turbauuringute andmebaas: Allalaadimine"
    },
    children: [
      {
        path: "",
        name: "Download",
        component: () => import("../components/about/Download.vue")
      }
    ]
  },
  {
    path: `/:locale${LANGUAGE_REGEX}?`,
    component: Home,
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
              title: "Turbauuringute andmebaas: Turbaalad"
            }
          },
          {
            path: ":id(\\d+)",
            name: "AreaDetail",
            component: () => import("../components/area/Area.vue"),
            meta: {
              object: "area",
              title: "Turbauuringute andmebaas: Turbaala "
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
              title: "Turbauuringute andmebaas: Proovipunktid"
            }
          },
          {
            path: ":id(\\d+)",
            name: "SiteDetail",
            component: () => import("../components/site/Site.vue"),
            meta: {
              object: "site",
              title: "Turbauuringute andmebaas: Proovipunkt "
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
              title: "Turbauuringute andmebaas: Proovid"
            }
          },
          {
            path: ":id(\\d+)",
            name: "SampleDetail",
            component: () => import("../components/sample/Sample.vue"),
            meta: {
              object: "sample",
              title: "Turbauuringute andmebaas: Proov "
            }
          }
        ]
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

import store from "@/store/index";
import i18n from "@/i18n";

router.beforeEach((to, from, next) => {
  const hasLang = to.params?.locale;
  const hadLang = from.params?.locale;

  // If the language hasn't changed since last then route we're done
  if (
    hasLang &&
    hadLang &&
    to.params.locale.toLowerCase() === from.params.locale.toLowerCase()
  )
    next();

  // Getting the current language
  let lang = i18n.locale;

  // Overwriting
  if (hasLang) lang = to.params.locale.toLowerCase();

  // Is language valid
  if (!lang.match(LANGUAGE_REGEX)) lang = "ee";

  // Setting language based on the URL
  i18n.locale = lang;
  if (store.state.settings.language !== lang)
    store.dispatch("settings/updateLanguage", lang);

  if (!hasLang && lang !== "ee") return next(`/${lang}${to.fullPath}`);
  else return next();
});

export default router;
