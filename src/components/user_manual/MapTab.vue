<template>
  <div class="map-tab px-2 pb-2">
    <v-card flat class="user-manual-tab-card">
      <v-card-title>
        Kaardi tutvustus ja õpetus
      </v-card-title>

      <v-card
        flat
        class="d-flex flex-column flex-md-row flex-column-reverse justify-space-between user-manual-tab-card"
      >
        <v-card flat class="user-manual-tab-card">
          <v-card-text class="pa-2">
            <div class="mb-2">
              <b>Turbaplaanid</b> on nähtavad alataes <b>1km</b> kõrguselt.
            </div>

            Kaart koosneb järgnevatest funktsioonidest:
            <ol>
              <li>
                <b>Pluss</b> ja <b>miinus</b> nupp kaardi suurendamiseks ja
                vähendamiseks.
              </li>

              <li><b>"Kasti"</b> nupp kaardi täisekraanile panekuks.</li>

              <li>
                <b>Kaardikihi</b> nupp, millega saab valida erinevaid
                kaardikihte
              </li>

              <li>
                Näitab hiirekursori abil hetkelist <b>laius- ja pikkuskraadi</b>
              </li>

              <li>Kaardi <b>legend</b></li>
            </ol>

            <v-card flat class="d-flex flex-row mt-2 user-manual-tab-card">
              <v-card flat class="pr-2 user-manual-tab-card">
                <v-img
                  max-width="50px"
                  :src="
                    require('@/assets/img/user_manual/map/map_crosshair.png')
                  "
                />
              </v-card>
              <v-card flat class="align-self-center user-manual-tab-card">
                Kui kaardil olev <b>kursor</b> on <b>risti</b> kujuga, siis on
                võimalik vajutada <b>turbaalade</b> (rohelised) ja
                <b>proovipunktide</b> (punased) peale.
              </v-card>
            </v-card>

            <v-card flat class="d-flex flex-column flex-sm-row mt-2 user-manual-tab-card">
              <v-card flat class="pr-2 user-manual-tab-card">
                <v-img
                  max-width="100px"
                  :src="require('@/assets/img/user_manual/map/map_sites.png')"
                />
              </v-card>
              <v-card flat class="align-self-center user-manual-tab-card">
                Kui kaardil on näha niisugune <b>kollane ikoon</b>, siis see on
                <b>proovipunkt</b> ning selle peale vajutades suunatakse
                kasutaja proovipunkti <b>detailvaatele</b>.
              </v-card>
            </v-card>
          </v-card-text>
        </v-card>

        <v-card flat class="align-self-center pa-2 user-manual-tab-card">
          <v-img
            max-width="500px"
            :src="require('@/assets/img/user_manual/map/map.png')"
          />
        </v-card>
      </v-card>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "MapTab"
};
</script>

<style scoped></style>
