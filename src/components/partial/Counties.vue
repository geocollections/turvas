<template>
  <v-card flat tile class="counties">
    <v-row no-gutters>
      <v-col cols="12" class="pa-2">
        <span class="font-weight-bold">Maakonnad: </span>
        <span v-for="(item, index) in counties" :key="item.id">
          <router-link
            :to="{
              path: `/${$route.meta.object}`,
              query: {
                ...$route.query,
                maakond: item.maakond,
                page: 1,
                paginateBy: 500
              }
            }"
            class="table-link"
            exact-active-class="font-weight-bold primary--text text--darken-1"
          >
            {{ item.maakond }}
          </router-link>
          <span v-if="index !== counties.length - 1">|</span>
        </span>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "Counties",
  props: {
    counties: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped></style>
