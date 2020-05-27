<template>
  <div class="common-tab px-2 pb-2">
    <v-card flat>
      <v-card-title>
        Turbauuringute andmebaasi veebirakendus: TurbA
      </v-card-title>

      <v-card-text>
        Veebirakendus koosneb järgmistest põhivaadest ja funktsioonidest:

        <ul>
          <li>
            Avalehekülg kaardivaatega, kus vaikimisi kuvatakse turbaalade piire
            ja uuringupunkte, millele klikates jõuab kasutaja vastava
            detailvaate juurde.
          </li>

          <li>
            Turbaalade loend ja otsing (<router-link to="/turbaala"
              >https://turba.geoloogia.info/turbaala</router-link
            >), kus kasutajal on võimalus alasid võimalik filtreerida nimes või
            kirjelduses sisalduvate märksõnade järgi.
          </li>

          <li>
            Turbaala detailvaade (<router-link to="/turbaala/514"
              >https://turba.geoloogia.info/turbaala/514</router-link
            >), mille osaks on ala asukoha kaardikuva, ala info ning
            proovipunktide nimekiri. Turbaala info hulka kuulub ala tekstiline
            iseloomustus ning viited uuringuaruannetele Geoloogiafondis, maardla
            detailinfole Maa-ameti maardlate nimistus ning looduskaitselistele
            objektidele Keskkonnaregistri portaalis. Turbaala vaatest saab
            kasutaja kaardi või proovipunktide kaudu liikuda proovipunktise
            detailinfoni.
          </li>

          <li>
            Proovipunktide nimekiri ja otsing (nt
            <router-link to="/proovipunkt"
              >https://turba.geoloogia.info/proovipunkt</router-link
            >), kus kasutaja saab selekteerida huvipakkuva maakonna
            uuringupunktide nimekirja, või sooritada päring proovipunktide nime
            vm kriteeriumite järgi. Proovipunktide nimekirjast või kaardivaatest
            suundub kasutaja reeglina proovipunkti detailinfo juurde.
          </li>

          <li>
            Proovipunkti detailvaade (nt
            <router-link to="/proovipunkt/7975"
              >https://turba.geoloogia.info/proovipunkt/7975</router-link
            >), kus kuvatakse punkti asukohta kaardil, detailinfot, punktist
            kogutud proovide nimekirja, analüüsitud parameetrite variatsioonide
            graafikuid (vaikimisi niiskus, tuhasus ja lagunemisaste, kuid
            kasutaja valikul ka kõiki teisi analüüsitud parameetreid).
          </li>

          <li>
            Proovide nimekirja ja otsingu vaates (<router-link to="/proov"
              >https://turba.geoloogia.info/proov</router-link
            >) saab kasutaja filtreerida andmeid maakonna, turbalala,
            uuringupunkti nime, proovi sügavuse, turba liigi ning kõigi
            analüüsitud arvuliste näitajate järgi; viimaste hulka kuuluvad ka
            turbast määratud taimeliigid. Erinevad otsinguparameetrid
            summeeruvad, nii saab kasutaja teha näiteks päringu otsimaks proove
            ja alasid, kus pilliroo osakaal on üle 50% ja lagunemisaste 40–50%.
            Otsingutulemusi kuvatakse nii tabelis kui kaardivaates, mille kaudu
            jõuab kasutaja konkreetse proovi või proovipunkti detailinfoni.
          </li>

          <li>
            Proovi detailvaade (<router-link to="/proov/171117"
              >https://turba.geoloogia.info/proov/171117</router-link
            >), kus näidatakse proovi infot, proovist tehtud analüüse ning nende
            analüüside tulemusi. Turba botaanilise koostise analüüsi olemasolu
            korral kuvatakse ka määratud taimenimesid eesti ja ladina keeles
            ning poolkvantatiatiivset koostist ringdiagrammina.
          </li>
        </ul>

        <div class="mt-2">
          Kõigis põhivaadetes kuvataval kaardil on võimalik selekteerida sobiv
          aluskaart (vaikimisi Maa-ameti ortofoto), ning lisada täiendavaid
          infokihte (nt maardlate kiht, soosetete levik pinnakatte geoloogilise
          kaardi komplektist). Samuti saab kasutaja aktiveerida veebirakenduses
          maakondade kaupa turbaalade tehnilise plaanide kuvamise (nägemiseks
          vajalik sisse suumida; NB! üksteisega kattuvate plaanide korral
          kuvatakse ainult ülemist plaani; alumise info kasutamiseks tuleb
          vastava maakonna georefereeritud plaanid alla laadida ja avada need
          töölauarakenduses (nt QGISis).
        </div>

        <div class="mt-2">
          Lisaks on rakenduses eraldi staatilised vaated projekti
          tutvustamiseks, andmete allalaadimiseks ning abiinfo kuvamiseks.
          Vaadete vahel liikumine toimub ka linkide kaudu, kaardilt pinkte ja
          alasid valides või lehekülje päises alaliselt kuvatava menüüriba
          kaudu. Menüüriba kaudu on võimalik kiire otsing turbaala nime järgi
          ning kaardikuva lubamine / keelamine.
        </div>

        <div class="mt-2">
          Rakenduse kõigile detailvaadetele saab viidata aadressi kaudu, mis
          sisaldab andmeobjekti ID koodi, nt proovi 171102 detailinfo juurde
          jõuab aadressil:
          <router-link to="/proov/171102"
            >https://turba.geoloogia.info/proov/171102</router-link
          >.
        </div>

        <div class="mt-2">
          Tehniliselt on TurbA veebirakendus on loodud nn SPA (single page
          application) rakendusena javascripti raamistiku Vue.js (<a
            href="https://vuejs.org"
            target="VueWindow"
            title="Vue.js raamistiku koduleht"
            >https://vuejs.org</a
          >) ning mitmete lisamoodulite baasil. Rakenduse lähtekood on avatud
          GitHubi keskkonnas (<a
            href="https://github.com/geocollections/turvas"
            target="GithubWindow"
            title="Projekti GitHub repositoorium"
            >https://github.com/geocollections/turvas</a
          >) ning vabalt kasutatav ja edasiarendatav GPL-3.0 litsentsi
          tingimustel.
        </div>
      </v-card-text>
    </v-card>

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
                  max-width="40px"
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
