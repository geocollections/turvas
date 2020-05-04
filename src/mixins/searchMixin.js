import { mapState } from "vuex";

const searchMixin = {
  computed: {
    ...mapState("search", [
      "areaSearchParams",
      "siteSearchParams",
      "sampleSearchParams"
    ])
  },

  methods: {
    handleUpdateFilter(newVal) {
      if (
        (this.$route.name === "AreaTable" &&
          this.areaSearchParams.page === 1) ||
        (this.$route.name === "SiteTable" &&
          this.siteSearchParams.page === 1) ||
        (this.$route.name === "SampleTable" &&
          this.sampleSearchParams.page === 1)
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
          this.siteSearchParams.page !== newVal) ||
        (this.$route.name === "SampleTable" &&
          this.sampleSearchParams.page !== newVal)
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

    handleUpdateMaakond(newVal) {
      if (newVal.length > 0) {
        this.$router
          .push({
            query: { ...this.$route.query, maakond: newVal.toString() }
          })
          .catch(err => {});
      } else {
        let { maakond, ...noMaakond } = this.$route.query;
        this.$router.push({ query: noMaakond }).catch(err => {});
      }
    },

    handleUpdateArea(newVal) {
      if (newVal.length > 0) {
        this.$router
          .push({
            query: { ...this.$route.query, area: newVal.toString() }
          })
          .catch(err => {});
      } else {
        let { area, ...noArea } = this.$route.query;
        this.$router.push({ query: noArea }).catch(err => {});
      }
    },

    resetSearch() {
      let path = "/ala";
      if (this.$route.name === "SiteTable") path = "/proovipunkt";
      else if (this.$route.name === "SampleTable") path = "/proov";
      this.$router.push({ path: path }).catch(err => {});
    }
  }
};

export default searchMixin;
