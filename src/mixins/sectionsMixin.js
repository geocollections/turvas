import { mapActions, mapState } from "vuex";

const sectionsMixin = {
  computed: {
    ...mapState("settings", ["block"])
  },

  methods: {
    ...mapActions("settings", ["updateBlock"]),

    updateBlockState(index, value) {
      let route = "search";
      if (this.$route.name.includes("Detail")) {
        route = this.$route.meta.object;
      }
      let payload = {
        route: route,
        index: index,
        value: value
      };
      this.updateBlock(payload);
    }
  }
};

export default sectionsMixin;
