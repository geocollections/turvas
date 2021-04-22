<template>
  <div class="d-flex flex-row flex-nowrap">
    <v-btn
      class="align-self-center white--text px-0"
      style="height: 100%; font-size: 0.875rem"
      :class="{ 'active-class': language === item.value }"
      text
      tile
      small
      v-for="item in languages"
      :key="item.text"
      v-on="on"
      @click="changeLang(item.value)"
    >
      {{ item.text }}
      <!--            <span-->
      <!--              v-on="on"-->
      <!--              :class="[flagCommonStyles, flagStyles(item.value)]"-->
      <!--            ></span>-->
    </v-btn>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "LangButtonsSeparate",

  data: () => ({
    languages: [
      { value: "ee", text: "EST" },
      { value: "en", text: "ENG" }
    ]
  }),

  computed: {
    ...mapState("settings", ["language"]),

    flagCommonStyles() {
      return {
        flag: true,
        "flag-squared": true,
        "flag-circle": true,
        "lang-button": true
      };
    }
  },

  mounted() {
    if (this.language !== this.$i18n.locale)
      this.updateLanguage(this.$i18n.locale);
  },

  methods: {
    ...mapActions("settings", ["updateLanguage"]),

    flagStyles(lang) {
      if (!lang) lang = this.language;
      return {
        "flag-ee": lang === "ee",
        "flag-en": lang === "en"
      };
    },

    changeLang(newLang) {
      if (this.language === newLang) return;
      this.$i18n.locale = newLang;
      this.updateLanguage(newLang);
      this.$router.replace({
        name: this.$route.name,
        params: newLang !== "ee" ? { locale: newLang } : {},
        query: { ...this.$route.query }
      });
    }
  }
};
</script>

<style scoped>
.lang-button {
  height: 24px;
  width: 24px !important;
}
.flag {
  position: relative;
  display: inline-block;
  width: 1.33333333em;
  line-height: 1em;
  background-size: cover;
  background-position: 50%;
  background-repeat: no-repeat;
}
.flag-en {
  background-image: url("https://files.geocollections.info/img/geocase/flags/en.svg");
}
.flag-ee {
  background-image: url("https://files.geocollections.info/img/geocase/flags/ee.svg");
}
.flag-squared {
  width: 1em;
}
.flag-circle {
  border-radius: 100%;
}
</style>
