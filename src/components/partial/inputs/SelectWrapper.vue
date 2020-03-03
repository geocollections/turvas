<template>
  <v-select
    v-bind="$attrs"
    v-on="$listeners"
    hide-details
    deletable-chips
    small-chips
  />
</template>

<script>
export default {
  name: "SelectWrapper"
};
</script>

<style scoped></style>
