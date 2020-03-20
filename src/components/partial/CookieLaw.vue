<template>
  <v-card tile class="cookie-law pa-3" elevation="12">
    <div class="d-flex flex-row justify-center">
      <div
        class="align-self-center pr-3"
        :class="{
          'cookie-law-text-sm': $vuetify.breakpoint.smAndDown
        }"
      >
        See veebileht kasutab küpsiseid. Veebilehe kasutamist jätkates nõustute
        küpsiste kasutamisega.
        <v-dialog
          v-model="cookieDialog"
          max-width="500px"
          style="z-index: 150000;"
        >
          <template v-slot:activator="{ on }">
            <a class="table-link" v-on="on" title="Loe kasutustingimusi"
              >Loe lähemalt</a
            >
          </template>
          <v-card>
            <v-card-title>Kasutustingimused</v-card-title>
            <v-card-text
              >Veebilehe külastajate andmeid kasutatakse ainult mitteisikustatud
              statistiliseks analüüsiks ning lehekülje funktsionaalsuse
              parandamiseks. Andmeid ei edastada kolmandatele
              osapooltele.</v-card-text
            >
          </v-card>
        </v-dialog>
      </div>

      <div class="align-self-center">
        <v-btn
          color="primary"
          @click="$emit('accept')"
          title="Sulge küpsiste teavitus"
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
