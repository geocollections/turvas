<template>
  <div class="common-tab px-2 pb-2">
    <v-card flat>
      <v-card-title>
        Üldine tutvustus ja õpetus
      </v-card-title>

      <v-card flat class="d-flex flex-column">
        <v-card flat>
          <v-card-text class="pa-2">
            <v-card flat class="d-flex flex-column">
              <v-card flat>
                <v-img
                  max-width="1000px"
                  :src="
                    require('@/assets/img/user_manual/common/common_navbar.png')
                  "
                />
              </v-card>
              <v-card flat>
                Navigatsioonireal olevad asjad paremalt vasakule: Pealkiri (viib
                tagasi esilehele), lingid, turbaala otsing (viib turbaala
                vaatele) ja kaardi kuvamise/peitmise nupp.
              </v-card>
            </v-card>

            <v-card flat class="d-flex flex-column mt-2">
              <v-card flat>
                <v-img
                  max-width="500px"
                  :src="
                    require('@/assets/img/user_manual/common/common_navbar_mobile.png')
                  "
                />
              </v-card>
              <v-card flat>
                Navigatsiooniriba väiksemate ekraanide korral. Vasakul olev nupp
                avab külgrea, kus on kõik samad lingid ja otsinguväli, mis on
                nähtvad pika navigatsiooni rea korral.
              </v-card>
            </v-card>

            <v-divider class="my-2" />

            <v-card flat class="d-flex flex-row">
              <v-card flat class="pr-2">
                <v-img
                  max-width="100px"
                  :src="
                    require('@/assets/img/user_manual/common/common_link.png')
                  "
                />
              </v-card>
              <v-card flat class="align-self-center">
                Enamus tekstidest, mis on <b>rohelist</b> värvi on
                <b>lingid</b> ja neid saab vajutada.
              </v-card>
            </v-card>

            <v-card flat class="d-flex flex-column flex-sm-row mt-2">
              <v-card flat class="pr-2">
                <v-img
                  max-width="150px"
                  :src="
                    require('@/assets/img/user_manual/common/common_map_button.png')
                  "
                />
              </v-card>
              <v-card flat class="align-self-center">
                Rakenduse navigatsiooni real paremal asuv <b>nupp</b>, mis
                võimaldab <b>kaarti näidata ja peita</b>. Nupp on nähtav ainult
                nendel vaadetel, kus on võimalik kaarti paralleelselt tabeli või
                kirje detailinfoga kasutada.
              </v-card>
            </v-card>
          </v-card-text>
        </v-card>
      </v-card>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "CommonTab"
};
</script>

<style scoped></style>
