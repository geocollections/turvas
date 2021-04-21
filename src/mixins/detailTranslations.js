import { mapGetters, mapState } from "vuex";

const detailTranslations = {
  computed: {
    ...mapState("detail", [
      "filteredAreaHeaders",
      "filteredSiteHeaders",
      "filteredSampleHeaders"
    ]),

    ...mapGetters("detail", [
      "getAreaSiteHeaders",
      "getSiteDescriptionHeaders",
      "getSiteSampleHeaders",
      "getSampleAnalysesHeaders",
      "getSampleTaxaHeaders"
    ]),

    translatedAreaHeaders() {
      return this.filteredAreaHeaders.map(header => {
        if (header.value === "eelis" || header.value === "maardla")
          return {
            ...header,
            text: `${this.$t(`area.${header.value}`)} ${this.$t(
              `common.linkToRegistry`
            )}`
          };
        else
          return {
            ...header,
            text: this.$t(`area.${header.value}`)
          };
      });
    },

    translatedAreaSiteHeaders() {
      return this.getAreaSiteHeaders.map(header => {
        return {
          ...header,
          text: this.$t(`site.${header.value}`)
        };
      });
    },

    translatedSiteHeaders() {
      return this.filteredSiteHeaders.map(header => {
        return {
          ...header,
          text: this.$t(`site.${header.value}`)
        };
      });
    },

    translatedSiteDescriptionHeaders() {
      return this.getSiteDescriptionHeaders.map(header => {
        return {
          ...header,
          text:
            header.value === "description"
              ? this.$t(`site.descriptionTitle`)
              : this.$t(`site.${header.value}`)
        };
      });
    },

    translatedSiteSampleHeaders() {
      return this.getSiteSampleHeaders.map(header => {
        return {
          ...header,
          text:
            header.value === "depth"
              ? this.$t(`site.depthSample`)
              : this.$t(`site.${header.value}`)
        };
      });
    },

    translatedSampleHeaders() {
      return this.filteredSampleHeaders.map(header => {
        return {
          ...header,
          text: this.$t(`sampleDetailHeaders.${header.value}`)
        };
      });
    },

    translatedSampleAnalysesHeaders() {
      return this.getSampleAnalysesHeaders.map(header => {
        return {
          ...header,
          text: this.$t(`sampleAnalyses.${header.value}`)
        };
      });
    },

    translatedSampleTaxaHeaders() {
      return this.getSampleTaxaHeaders.map(header => {
        return {
          ...header,
          text: this.$t(`sampleTaxa.${header.value}`)
        };
      });
    }
  }
};

export default detailTranslations;
