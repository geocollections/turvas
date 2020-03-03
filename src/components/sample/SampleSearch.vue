<template>
  <v-card flat>
    <v-row no-gutters class="pt-1 px-1">
      <v-col cols="12" md="6" lg="4" class="pa-1">
        <TextFieldWrapper
          :value="sampleSearchParams.maakond"
          @input="updateParam($event, 'maakond')"
          label="Maakond"
        />
      </v-col>

      <v-col cols="12" md="6" lg="4" class="pa-1">
        <TextFieldWrapper
          :value="sampleSearchParams.area"
          @input="updateParam($event, 'area')"
          label="Turbaala"
        />
      </v-col>

      <v-col cols="12" md="6" lg="4" class="pa-1">
        <TextFieldWrapper
          :value="sampleSearchParams.site"
          @input="updateParam($event, 'site')"
          label="Proovipunkt/proov"
        />
      </v-col>

      <v-col cols="12" md="6" lg="4" class="pa-1">
        <TextFieldWrapper
          :value="sampleSearchParams.depth"
          @input="updateParam($event, 'depth')"
          label="Sügavus"
        />
      </v-col>

      <v-col cols="12" md="6" lg="4" class="pa-1">
        <TextFieldWrapper
          :value="sampleSearchParams.rock"
          @input="updateParam($event, 'rock')"
          label="Turbaliik"
        />
      </v-col>

      <v-col cols="12" md="6" lg="4" class="pa-1">
        <TextFieldWrapper
          :value="sampleSearchParams.egf"
          @input="updateParam($event, 'egf')"
          label="EGF"
        />
      </v-col>
    </v-row>

    <v-row no-gutters class="px-1">
      <v-col cols="12" class="pa-1">
        <SelectWrapper
          label="Veerud"
          chips
          clearable
          multiple
          :items="listParameters"
          return-object
          item-text="name"
          @input="updateSampleHeaders"
        />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import TextFieldWrapper from "../partial/inputs/TextFieldWrapper";
import { mapActions, mapState } from "vuex";
import { cloneDeep } from "lodash";
import SelectWrapper from "../partial/inputs/SelectWrapper";
export default {
  name: "SampleSearch",
  components: { SelectWrapper, TextFieldWrapper },
  computed: {
    ...mapState("search", ["sampleSearchParams", "listParameters"])
  },
  created() {
    // Params from peat_taxa and peat_analysis tables
    this.fetchListParameters();
  },
  methods: {
    ...mapActions("search", ["fetchListParameters", "updateSampleHeaders"]),

    updateParam(value, field) {
      if (value && value.length > 0) {
        this.$router
          .push({
            query: { ...this.$route.query, [field]: value, page: 1 }
          })
          .catch(err => {});
      } else {
        let query = cloneDeep(this.$route.query);
        delete query[field];

        this.$router.push({ query: query }).catch(err => {});
      }
    }
  }
};
</script>

<style scoped></style>
