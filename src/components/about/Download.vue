<template>
  <v-card-text>
    <ul>
      <li class="my-1" v-for="link in downloadLinks" :key="link.id">
        <div
          class="font-weight-bold"
          v-if="link.additionalLinks && link.additionalLinks.length > 0"
        >
          {{ $t(link.text) }}
          <span v-for="(item, index) in link.additionalLinks" :key="item.id">
            <a
              :href="item.src"
              :title="$t(item.title)"
              class="table-link"
              :target="item.target"
              >{{ $t(item.text) }}</a
            >
            <span v-if="index !== link.additionalLinks.length - 1">, </span>
          </span>
        </div>

        <a
          v-else
          :href="link.src"
          :title="$t(link.title)"
          class="table-link"
          :target="link.target"
          >{{ $t(link.text) }}
        </a>
      </li>
    </ul>
  </v-card-text>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Download",
  computed: {
    ...mapState("settings", ["downloadLinks"])
  },
  metaInfo() {
    const title = this.$t("header.download");
    return {
      title: title
    };
  }
};
</script>

<style scoped></style>
