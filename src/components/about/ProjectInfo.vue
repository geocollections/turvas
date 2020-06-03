<template>
  <v-card-text>
    <div v-html="projectInfoText1" />

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

    <div v-html="projectInfoText2" />

    <p v-html="projectInfoText3" />

    <hr class="mt-6 mb-5" />

    <div class="d-flex flex-row flex-wrap px-5 py-0 justify-space-around">
      <div
        class="align-self-end pa-1"
        v-for="logo in listOfLogos"
        :key="logo.id"
      >
        <a :href="logo.href" :target="logo.target">
          <img
            :title="logo.title"
            :alt="logo.title"
            :src="logo.src"
            :class="logo.class"
          />
        </a>
      </div>
    </div>
  </v-card-text>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ProjectInfo",
  computed: {
    ...mapState("settings", [
      "projectInfoText1",
      "projectInfoText2",
      "projectInfoText3",
      "listOfLogos"
    ])
  }
};
</script>

<style scoped>
.logo:hover {
  opacity: 0.7;
}

.kik-logo {
  height: 100px;
}

.taltech-logo {
  height: 110px;
}
.natarc-logo {
  padding: 0 0 10px 0;
}
.sarv-logo {
  height: 60px;
  padding: 0 0 10px 0;
}
</style>
