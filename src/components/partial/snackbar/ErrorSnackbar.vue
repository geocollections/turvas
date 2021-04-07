<template>
  <v-snackbar
    :value="error"
    color="error"
    style="z-index: 3000;"
    @input="$emit('update:error', $event)"
  >
    <div v-html="message" />
    <v-btn
      color="black"
      icon
      @click="$emit('update:error', !error)"
      :title="$t('snackbar.close')"
    >
      <v-icon small>fas fa-times</v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  name: "ErrorSnackbar",
  props: {
    error: {
      type: Boolean,
      required: true
    },
    message: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped></style>
