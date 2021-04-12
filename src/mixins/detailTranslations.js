import { mapGetters, mapState } from "vuex";

const detailTranslations = {
  computed: {
    ...mapState("detail", [
      "filteredAreaHeaders",
      "filteredSiteHeaders",
      "filteredSampleHeaders",
      "filteredSampleHeaders"
    ]),

    ...mapGetters("detail", ["getAreaSiteHeaders"]),

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
        console.log(header);
        return {
          ...header,
          text: this.$t(`site.${header.value}`)
        };
      });
    },

    translatedSampleHeaders() {
      return this.filteredSampleHeaders.map(header => {
        console.log(header);
        return {
          ...header,
          text:
            header.text.includes("...") || /[A-Z]/.test(header.text.charAt(0))
              ? header.text
              : this.$t(`sample.${header.value}`)
        };
      });
    }
  }
};

export default detailTranslations;
