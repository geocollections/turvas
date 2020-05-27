<template>
  <div class="table-tab px-2 pb-2">
    <v-card flat class="user-manual-tab-card">
      <v-card-title>
        Tabeli tutvustus ja õpetus
      </v-card-title>

      <v-card flat class="d-flex flex-column flex-md-row justify-space-between user-manual-tab-card">
        <v-card flat class="user-manual-tab-card">
          <v-card-text class="pa-2">
            Tabel koosneb järgnevatest funktsioonidest:
            <ol>
              <li>
                <b>Valikukast</b>, mis võimaldab muuta tabelis kuvatavate
                kirjete hulka.
              </li>

              <li>
                Tabeli <b>lehekülgede</b> valik, mis võimaldab liikuda tabeli
                lehekülgede vahel.
              </li>

              <li>
                Tabeli <b>kiirotsingu</b> väli, mis otsib tabelist kirjeid
                kõikide väljade pealt.
              </li>

              <li>
                Kirjeid on võimalik <b>sorteerida</b> vajutades tabeli päises
                olevate välja pealkirjade peale (sorteerimisel on võimalik
                kasutada mitut välja).
              </li>
            </ol>
          </v-card-text>
        </v-card>

        <v-card flat class="align-self-center pa-2 user-manual-tab-card">
          <v-img
            max-width="600px"
            :src="require('@/assets/img/user_manual/table/table.png')"
          />
        </v-card>
      </v-card>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "TableTab"
};
</script>

<style scoped></style>
