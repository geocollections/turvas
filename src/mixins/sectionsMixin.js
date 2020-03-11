import { mapActions, mapState } from "vuex";

const sectionsMixin = {
  computed: {
    ...mapState("settings", ["block"])
  },

  methods: {
    ...mapActions("settings", ["updateBlock"])
  }
};

export default sectionsMixin;
