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

    <v-row
      no-gutters
      class="px-1"
      v-if="activeListParameters && activeListParameters.length > 0"
    >
      <v-col
        cols="12"
        class="pa-1"
        v-for="(entity, index) in activeListParameters"
        :key="index"
      >
        <v-row no-gutters>
          <v-col cols="4" class="pr-1">
            <SelectWrapper
              label="Parameeter"
              :items="listParameters"
              return-object
              item-text="name"
              :value="entity"
              @input="
                updateActiveListParameters({ event: $event, index: index })
              "
            />
          </v-col>

          <v-col cols="6" v-if="entity.isText">
            <v-row no-gutters>
              <v-col cols="5" class="px-1">
                <SelectWrapper
                  label="Otsingutüüp"
                  :items="lookUpTypes"
                  :value="entity.lookUpType"
                  @input="updateActiveParam($event, 'lookUpType', index)"
                />
              </v-col>

              <v-col cols="7" class="px-1">
                <TextFieldWrapper
                  label="Tekstiväli"
                  :value="entity.text"
                  @input="updateActiveParam($event, 'text', index)"
                />
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="6" v-else>
            <v-row no-gutters>
              <v-col cols="5" class="px-1">
                <TextFieldWrapper
                  label="Alates"
                  type="number"
                  :value="entity.start"
                  @input="updateActiveParam($event, 'start', index)"
                />
              </v-col>

              <v-col cols="5" class="px-1">
                <TextFieldWrapper
                  label="Kuni"
                  type="number"
                  :value="entity.end"
                  @input="updateActiveParam($event, 'end', index)"
                />
              </v-col>

              <v-col
                cols="2"
                align-self="end"
                class="font-weight-bold text-center"
              >
                {{ entity.unit }}
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="1" align-self="center" class="text-center">
            <v-btn icon @click="addActiveListParameter" color="success">
              <v-icon>fas fa-plus</v-icon>
            </v-btn>
          </v-col>

          <v-col
            cols="1"
            align-self="center"
            class="text-center"
            v-if="activeListParameters.length > 1"
          >
            <v-btn icon @click="removeActiveListParameter(index)" color="error">
              <v-icon>fas fa-minus</v-icon>
            </v-btn>
          </v-col>
        </v-row>
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
          :value="distinctActiveListParameters"
          @input="updateSampleHeaders"
          deletable-chips
          small-chips
        />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import TextFieldWrapper from "../partial/inputs/TextFieldWrapper";
import {mapActions, mapGetters, mapState} from "vuex";
import { cloneDeep } from "lodash";
import SelectWrapper from "../partial/inputs/SelectWrapper";
export default {
  name: "SampleSearch",
  components: { SelectWrapper, TextFieldWrapper },
  computed: {
    ...mapState("search", [
      "sampleSearchParams",
      "listParameters",
      "activeListParameters",
      "lookUpTypes"
    ]),

    ...mapGetters("search", ["distinctActiveListParameters"])
  },
  created() {
    // Params from peat_taxa and peat_analysis tables
    this.fetchListParameters();
  },
  methods: {
    ...mapActions("search", [
      "fetchListParameters",
      "updateSampleHeaders",
      "updateActiveListParameters",
      "addActiveListParameter",
      "removeActiveListParameter",
      "updateActiveListParameter"
    ]),

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
    },

    updateActiveParam(value, key, index) {
      this.updateActiveListParameter({
        newValue: value,
        key: key,
        index: index
      });

      let object = this.activeListParameters[index];

      if (object && object.query && object.query.length > 0) {
        this.$router
          .push({
            query: {
              ...this.$route.query,
              [object.value]: object.query,
              page: 1
            }
          })
          .catch(err => {});
      } else {
        let query = cloneDeep(this.$route.query);
        delete query[object.value];

        this.$router.push({ query: query }).catch(err => {});
      }
    }
  }
};
</script>

<style scoped></style>
