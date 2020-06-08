import Vue from "vue";
import Vuetify, {
  VApp,
  VAppBar,
  VNavigationDrawer,
  VHover,
  VList,
  VBtn,
  VIcon,
  VRow,
  VCol,
  VCard,
  VTextField,
  VAutocomplete,
  VListItem,
  VMenu,
  VListItemTitle,
  VDataTable,
  VAppBarNavIcon,
  VToolbarTitle,
  VToolbarItems,
  VListItemGroup,
  VCardTitle,
  VSpacer,
  VListItemIcon,
  VContent,
  VContainer,
  VSelect,
  VPagination,
  VCarousel,
  VCarouselItem,
  VOverlay,
  VSheet,
  VDivider,
  VSnackbar,
  VFooter,
  VDialog,
  VCardText,
  VTabs,
  VTab,
  VTabsItems,
  VTabItem,
  VImg,
  VAlert,
  VTooltip
} from "vuetify/lib";
import "vuetify/dist/vuetify.min.css";
import et from "vuetify/es5/locale/et";
import { Ripple } from "vuetify/lib/directives";

Vue.use(Vuetify, {
  components: {
    VApp,
    VAppBar,
    VNavigationDrawer,
    VHover,
    VList,
    VBtn,
    VIcon,
    VRow,
    VCol,
    VCard,
    VTextField,
    VAutocomplete,
    VListItem,
    VMenu,
    VListItemTitle,
    VDataTable,
    VAppBarNavIcon,
    VToolbarTitle,
    VToolbarItems,
    VListItemGroup,
    VCardTitle,
    VSpacer,
    VListItemIcon,
    VContent,
    VContainer,
    VSelect,
    VPagination,
    VCarousel,
    VCarouselItem,
    VOverlay,
    VSheet,
    VDivider,
    VSnackbar,
    VFooter,
    VDialog,
    VCardText,
    VTabs,
    VTab,
    VTabsItems,
    VTabItem,
    VImg,
    VAlert,
    VTooltip
  },
  directives: {
    Ripple
  }
});

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#4CAF50",
        secondary: "#81C784",
        accent: "#82B1FF",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107"
      }
    }
  },
  lang: {
    locales: { et },
    current: "et"
  },
  icons: {
    iconfont: "fa"
  }
});
