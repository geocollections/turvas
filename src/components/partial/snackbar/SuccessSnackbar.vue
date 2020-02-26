<template>
  <v-snackbar
    :value="success"
    color="success"
    style="z-index: 3000;"
    @input="$emit('update:success', $event)"
  >
    <div v-html="message" />
    <v-btn
      color="white"
      icon
      @click="$emit('update:success', !success)"
      title="Sulge sõnum"
    >
      <v-icon small>fas fa-times</v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  name: "SuccessSnackbar",
  props: {
    success: {
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
