import { mapState } from "vuex";

const tableTranslations = {
  computed: {
    ...mapState("search", [
      "paginateByItems",
      "areaHeaders",
      "siteHeaders",
      "sampleHeaders"
    ]),

    translatedPaginateByItems() {
      return this.paginateByItems.map(item => {
        return {
          ...item,
          text: this.$t(item.text, { num: item.value })
        };
      });
    },

    translatedAreaHeaders() {
      return this.areaHeaders.map(header => {
        return {
          ...header,
          text: this.$t(`area.${header.text}`)
        };
      });
    },

    translatedSiteHeaders() {
      return this.siteHeaders.map(header => {
        return {
          ...header,
          text: this.$t(`site.${header.text}`)
        };
      });
    },

    translatedSampleHeaders() {
      return this.sampleHeaders.map(header => {
        console.log(header)
        return {
          ...header,
          text: this.$t(`sample.${header.text}`)
        };
      });
    }
  }
};

export default tableTranslations;
