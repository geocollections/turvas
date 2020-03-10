<template>
  <div class="chart">
    <b>Fields:</b> {{ fields }}
    <br />
    <br />
    <b>Data:</b> {{ data }}
  </div>
</template>

<script>
export default {
  name: "Chart",
  props: {
    fields: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped></style>
