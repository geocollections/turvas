<template>
  <v-card-text>
    <div>{{ carouselText }}</div>

    <ol class="my-3">
      <li>
        Varasemate uurimistööde andmete kogumine ja digitaliseerimine (turba
        üldtehnilised näitajad: botaaniline koostis, tuhasus, niiskus, pH,
        kahjulikud elemendid, kütteväärtus jt).
      </li>

      <li>
        Turbamaardlate ja turbaalade (560) plaanide digitaliseerimine ja
        georefereerimine.
      </li>

      <li>
        Turbast võetud proovipunktide koordinaatide ja absoluutkõrguste
        määramine digitaliseeritud ruumiandmete baasil (kasutades ArcGIS
        programmi).
      </li>

      <li>
        Lühiülevaadete koostamine turbamaardlatest (turba genees, omadused,
        varude iseloomustus, perspektiivsed kasutusvõimalused) ning nende
        sidumine andmebaasides olevate andmetega.
      </li>
    </ol>

    <div v-html="carouselText2" />
  </v-card-text>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ProjectInfo",
  computed: {
    ...mapState("settings", ["carouselText", "carouselText2"])
  }
};
</script>

<style scoped></style>
