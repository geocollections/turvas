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
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue")
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
        path: "area",
        component: () => import("../views/Detail.vue"),
        children: [
          {
            path: "",
            name: "AreaTable",
            component: () => import("../components/area/AreaTable.vue"),
            meta: {
              object: "area"
            }
          },
          {
            path: ":id(\\d+)",
            name: "AreaDetail",
            component: () => import("../components/area/Area.vue"),
            meta: {
              object: "area"
            }
          }
        ]
      },
      {
        path: "site",
        component: () => import("../views/Detail.vue"),
        children: [
          {
            path: "",
            name: "SiteTable",
            component: () => import("../components/site/SiteTable.vue"),
            meta: {
              object: "site"
            }
          },
          {
            path: ":id(\\d+)",
            name: "SiteDetail",
            component: () => import("../components/site/Site.vue"),
            meta: {
              object: "site"
            }
          }
        ]
      },
      {
        path: "sample",
        component: () => import("../views/Detail.vue"),
        children: [
          {
            path: "",
            name: "SampleTable",
            component: () => import("../components/sample/SampleTable.vue"),
            meta: {
              object: "sample"
            }
          },
          {
            path: ":id(\\d+)",
            name: "SampleDetail",
            component: () => import("../components/sample/Sample.vue"),
            meta: {
              object: "sample"
            }
          }
        ]
      }
    ]
  }
];

const router = new VueRouter({
  // Todo: Enable history if app is ready
  // mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
