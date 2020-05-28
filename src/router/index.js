import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    redirect: "/"
  },
  {
    path: "/projekti_info",
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
    path: "/kasutusjuhend",
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
    path: "/allalaadimine",
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
    path: "/",
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

export default router;
