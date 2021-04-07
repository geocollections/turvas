<template>
  <v-card tile class="cookie-law pa-3" elevation="12">
    <div class="d-flex flex-row justify-center">
      <div
        class="align-self-center pr-3"
        :class="{
          'cookie-law-text-sm': $vuetify.breakpoint.smAndDown
        }"
      >
        {{ $t("cookie.info") }}
        <v-dialog
          v-model="cookieDialog"
          max-width="500px"
          style="z-index: 150000;"
        >
          <template v-slot:activator="{ on }">
            <a
              class="table-link"
              v-on="on"
              :title="$t('cookie.termsOfUseTitle')"
              >{{ $t("cookie.readMore") }}</a
            >
          </template>
          <v-card>
            <v-card-title>{{ $t("cookie.termsOfUse") }}</v-card-title>
            <v-card-text>{{ $t("cookie.termsOfUseText") }}</v-card-text>
          </v-card>
        </v-dialog>
      </div>

      <div class="align-self-center">
        <v-btn
          color="primary"
          @click="$emit('accept')"
          :title="$t('cookie.close')"
        >
          OK
        </v-btn>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "CookieLaw",
  data: () => ({
    cookieDialog: false
  })
};
</script>

<style scoped>
.cookie-law {
  position: fixed;
  bottom: 0;
  z-index: 100000;
  width: 100%;
}

.cookie-law-text-sm {
  font-size: 14px;
}
</style>
