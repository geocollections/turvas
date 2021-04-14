<template>
  <v-card flat>
    <h1>
      <CardTitleWrapper
        :text="$t('common.search')"
        :index="0"
        input-class="display-1"
      />
    </h1>

    <div v-show="block.search[0]">
      <v-row no-gutters class="px-1">
        <v-col cols="12" md="6" lg="4" class="pa-1">
          <AutocompleteWrapper
            :label="$t('common.maakond')"
            :items="getListCountiesAsArray"
            return-object
            :value="sampleSearchParams.maakond"
            @input="handleUpdateMaakond"
            chips
            deletable-chips
            multiple
            small-chips
            :search-input.sync="maakondSearchInput"
            @change="maakondSearchInput = ''"
          />
        </v-col>

        <v-col cols="12" md="6" lg="4" class="pa-1">
          <AutocompleteWrapper
            :label="$t('common.area')"
            :items="getListAreasAsArray"
            return-object
            :value="sampleSearchParams.area"
            @input="handleUpdateArea"
            chips
            deletable-chips
            multiple
            small-chips
            :search-input.sync="areaSearchInput"
            @change="areaSearchInput = ''"
          />
        </v-col>

        <v-col cols="12" md="6" lg="4" class="pa-1">
          <TextFieldWrapper
            :value="sampleSearchParams.site"
            @input="updateParam($event, 'site')"
            :label="$t('sample.siteSearch')"
          />
        </v-col>

        <v-col cols="12" md="6" lg="4" class="pa-1">
          <v-row no-gutters>
            <v-col cols="6" class="pr-1">
              <TextFieldWrapper
                :value="sampleSearchParams.depth_start"
                @input="updateParam($event, 'depth_start')"
                :label="$t('common.depthStart')"
                type="number"
                suffix="(m)"
                step="0.25"
              />
            </v-col>
            <v-col cols="6" class="pl-1">
              <TextFieldWrapper
                :value="sampleSearchParams.depth_end"
                @input="updateParam($event, 'depth_end')"
                :label="$t('common.depthEnd')"
                type="number"
                suffix="(m)"
                step="0.25"
              />
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" md="6" lg="4" class="pa-1">
          <TextFieldWrapper
            :value="sampleSearchParams.rock"
            @input="updateParam($event, 'rock')"
            :label="$t('common.peatType')"
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
              <AutocompleteWrapper
                :label="$t('common.parameter')"
                :items="distinctListParameters(entity)"
                return-object
                :item-text="$i18n.locale === 'ee' ? 'name' : 'name_en'"
                :value="entity"
                @input="
                  updateActiveListParameters({ event: $event, index: index })
                "
              />
            </v-col>

            <v-col cols="6" v-if="entity.isText">
              <v-row no-gutters>
                <v-col cols="5" class="px-1">
                  <AutocompleteWrapper
                    :label="$t('common.searchType')"
                    :items="lookUpTypes"
                    :value="entity.lookUpType"
                    @input="updateActiveParam($event, 'lookUpType', index)"
                  />
                </v-col>

                <v-col cols="7" class="px-1">
                  <TextFieldWrapper
                    :label="$t('common.textField')"
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
                    :label="$t('common.from')"
                    type="number"
                    :value="entity.start"
                    @input="updateActiveParam($event, 'start', index)"
                  />
                </v-col>

                <v-col cols="5" class="px-1">
                  <TextFieldWrapper
                    :label="$t('common.to')"
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
              <v-btn
                icon
                @click="addActiveListParameter"
                color="success"
                :disabled="activeListParameters.length >= 10"
              >
                <v-icon>fas fa-plus</v-icon>
              </v-btn>
            </v-col>

            <v-col cols="1" align-self="center" class="text-center">
              <v-btn
                icon
                @click="removeActiveListParameter(index)"
                color="error"
                :disabled="activeListParameters.length <= 1"
              >
                <v-icon>fas fa-minus</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row no-gutters class="px-1">
        <v-col cols="12" class="pa-1">
          <AutocompleteWrapper
            :label="$t('common.columns')"
            chips
            clearable
            multiple
            :items="listParameters"
            return-object
            :item-text="$i18n.locale === 'ee' ? 'name' : 'name_en'"
            item-value="string"
            :value="shownActiveListParameters"
            @input="updateSampleHeaders"
            small-chips
            deletable-chips
          />
        </v-col>
      </v-row>
    </div>
  </v-card>
</template>

<script>
import TextFieldWrapper from "../partial/inputs/TextFieldWrapper";
import { mapActions, mapGetters, mapState } from "vuex";
import { cloneDeep } from "lodash";
import AutocompleteWrapper from "../partial/inputs/AutocompleteWrapper";
import CardTitleWrapper from "../partial/CardTitleWrapper";
import searchMixin from "../../mixins/searchMixin";
export default {
  name: "SampleSearch",
  components: { CardTitleWrapper, AutocompleteWrapper, TextFieldWrapper },
  mixins: [searchMixin],
  data: () => ({
    maakondSearchInput: "",
    areaSearchInput: ""
  }),
  computed: {
    ...mapState("search", [
      "sampleSearchParams",
      "listParameters",
      "activeListParameters",
      "lookUpTypes",
      "shownActiveListParameters"
    ]),

    ...mapState("settings", ["block"]),

    ...mapGetters("search", ["distinctListParameters", "getListAreasAsArray"]),

    ...mapGetters("detail", ["getListCountiesAsArray"])
  },
  created() {
    this.fetchListAreas();
    this.fetchListParameters();
  },
  methods: {
    ...mapActions("search", [
      "fetchListParameters",
      "updateSampleHeaders",
      "updateActiveListParameters",
      "addActiveListParameter",
      "removeActiveListParameter",
      "updateActiveListParameter",
      "fetchListAreas"
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
    },

    getListParameterItemText() {

    }
  }
};
</script>

<style scoped></style>
