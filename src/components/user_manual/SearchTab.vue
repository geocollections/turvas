<template>
  <div class="search-tab px-2 pb-2">
    <v-card flat class="user-manual-tab-card">
      <v-card-title class="headline">
        Otsingu tutvustus ja õpetus
      </v-card-title>

      <v-card flat class="d-flex flex-column flex-md-row justify-space-between user-manual-tab-card">
        <v-card flat class="user-manual-tab-card">
          <v-card-text class="pa-2">
            Otsing koosneb järgnevatest funktsioonidest:
            <ol>
              <li>
                Erinevad otsingu väljad: <b>vabatekstilised</b> (nt
                proovipunkt/proov ja turbaliik) kui ka
                <b>etteantud valikutega</b> (maakond, turbaala).
              </li>

              <li>
                <b>Parameetrite</b> otsing. Maksimum parameetrite hulk mille
                järgi saab otsida on 10. <b>Pluss</b> nupp lisab parameetri
                otsingu võimaluse ning <b>miinus</b> nupp eemaldab sellel real
                oleva parameetri otsingust
              </li>

              <li><b>Veergude</b> valik, valitud veerud ilmuvad ka tabelis.</li>

              <li>
                Tabeli <b>andmete eksportimise</b> võimalus. Andmeid on võimalik
                eksportida <b>csv</b> failina või <b>kopeerida lõikelauale</b>.
              </li>

              <li><b>Taastab</b> otsingu algsätted.</li>
            </ol>
          </v-card-text>
        </v-card>

        <v-card flat class="align-self-center pa-2 user-manual-tab-card">
          <v-img
            max-width="600px"
            :src="require('@/assets/img/user_manual/search/search.png')"
          />
        </v-card>
      </v-card>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "SearchTab"
};
</script>

<style scoped></style>
