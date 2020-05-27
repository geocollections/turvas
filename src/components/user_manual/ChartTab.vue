<template>
  <div class="chart-tab px-2 pb-2">
    <v-card flat class="user-manual-tab-card">
      <v-card-title>
        Graafikute tutvustus ja õpetus
      </v-card-title>

      <v-card
        flat
        class="d-flex flex-column-reverse flex-xl-row justify-space-between user-manual-tab-card"
      >
        <v-card flat class="user-manual-tab-card">
          <v-card-text class="pa-2">
            <div class="mb-2">
              <b>Y-telg</b> näitab kui <b>sügavalt</b> maapinnast on proov
              võetud, ning <b>X-telg</b> näitab valitud parameetri
              <b>väärtust</b>.
            </div>

            Graafik koosneb järgnevatest funktsioonidest:
            <ol>
              <li>
                Graafikul <b>kuvatava andmestiku valimine</b>, igale valikule
                vastab üks graafik.
              </li>

              <li>
                Graafiku <b>legend</b>, mis näitab värvidena, et mis info
                graafikul asetseb
              </li>

              <li>
                Graafiku legendi peale <b>vajutades</b> on võimalik
                <b>peita ja kuvada</b> konkreetset andmestikku graafikul.
              </li>

              <li>
                Graafikul olev andmestik on kuvatud <b>mummudena</b>. Ette antud
                näite puhul on näha siirdesooturba ja rabaturba andmed.
              </li>

              <li>
                Turba lagunemisastme puhul on lisaks näha
                <b>roheliste ja punaste mummudena</b>, et kas on
                <b>hästi- või vähelagunenud turvas</b>
              </li>
            </ol>

            <v-card flat class="d-flex flex-column mt-3 user-manual-tab-card">
              <v-card flat class="mb-2 user-manual-tab-card">
                Turba lagunemisastme puhul on toodud alljärgnevatel piltidel
                näide, kuidas graafiku legendi peale vajutades on võimalik
                kuvatavaid andmeid sisse ja välja lülitada.
              </v-card>
              <v-card flat class="d-flex flex-row flex-wrap justify-space-around user-manual-tab-card">
                <v-card flat class="user-manual-tab-card pb-4 px-2">
                  <v-img
                    max-width="250px"
                    height="344px"
                    :src="
                      require('@/assets/img/user_manual/chart/chart_on.png')
                    "
                  />
                </v-card>

                <v-card flat class="user-manual-tab-card pb-4 px-2">
                  <v-img
                    max-width="250px"
                    height="344px"
                    :src="
                      require('@/assets/img/user_manual/chart/chart_off.png')
                    "
                  />
                </v-card>
              </v-card>
            </v-card>
          </v-card-text>
        </v-card>

        <v-card flat class="align-self-center align-self-xl-start pa-2 user-manual-tab-card">
          <v-img
            max-width="700px"
            :src="require('@/assets/img/user_manual/chart/chart.png')"
          />
        </v-card>
      </v-card>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "ChartTab"
};
</script>

<style scoped></style>
