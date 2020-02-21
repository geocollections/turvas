import { mapState } from "vuex";

const searchMixin = {
  computed: {
    ...mapState("search", ["areaSearchParams", "siteSearchParams"])
  },

  methods: {
    handleUpdateFilter(newVal) {
      if (
        (this.$route.name === "AreaTable" &&
          this.areaSearchParams.page === 1) ||
        (this.$route.name === "SiteTable" && this.siteSearchParams.page === 1)
      ) {
        this.$router
          .push({ query: { ...this.$route.query, filter: newVal } })
          .catch(err => {});
      } else {
        this.$router
          .push({
            query: { ...this.$route.query, filter: newVal, page: 1 }
          })
          .catch(err => {});
      }
    },

    handleUpdatePage(newVal) {
      if (
        (this.$route.name === "AreaTable" &&
          this.areaSearchParams.page !== newVal) ||
        (this.$route.name === "SiteTable" &&
          this.siteSearchParams.page !== newVal)
      ) {
        this.$router
          .push({ query: { ...this.$route.query, page: newVal } })
          .catch(err => {});
      }
    },

    handleUpdatePaginateBy(newVal) {
      this.$router
        .push({
          query: { ...this.$route.query, paginateBy: newVal, page: 1 }
        })
        .catch(err => {});
    },

    handleUpdateSortBy(newVal) {
      if (newVal.length > 0) {
        this.$router
          .push({
            query: { ...this.$route.query, sortBy: newVal.toString() }
          })
          .catch(err => {});
      } else {
        let { sortBy, ...noSortBy } = this.$route.query;
        this.$router.push({ query: noSortBy }).catch(err => {});
      }
    },

    handleUpdateSortDesc(newVal) {
      if (newVal.length > 0) {
        this.$router
          .push({
            query: { ...this.$route.query, sortDesc: newVal.toString() }
          })
          .catch(err => {});
      } else {
        let { sortDesc, ...noSortDesc } = this.$route.query;
        this.$router.push({ query: noSortDesc }).catch(err => {});
      }
    },

    resetSearch() {
      let path = "/area";
      if (this.$route.name === "SiteTable") path = "/site";
      this.$router.push({ path: path }).catch(err => {});
    }
  }
};

export default searchMixin;
