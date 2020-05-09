<template>
  <div class="more px-2 pb-2">
    <v-card flat>
      <v-card-title class="pb-1">
        Avalik API
      </v-card-title>

      <v-card-text class="pa-2">
        <div>
          API (application programming interface) muudab andmed masinloetavaks
          ning loob võimalused standardseks juurdepääsuks, erinevate
          tarkvaralahenduste ühendamiseks ning andmepõhiste teenuste
          arendamiseks. Turbauuringute andmestik on kättesaadav infosüsteemi
          SARV avaliku API liidese kaudu (<a
            href="https://api.geocollections.info"
            title="SARV avalik API"
            target="ApiWindow"
            >https://api.geocollections.info</a
          >), mida saab kasutada nt andmete allalaadimiseks või automatiseeritud
          päringute tegemiseks.
        </div>

        <div class="mt-2">
          Konkreetsete andmeobjektide detailinfo päring töötab API liideses
          kirjete ID koodide kaudu. Näiteks turba andmebaasi uuringupunkti ID
          7782 andmed JSON vormingus saab kätte päringuga:
          <a
            href="https://api.geocollections.info/site/7782?format=json"
            title="SARV avalik API"
            target="ApiWindow"
            >https://api.geocollections.info/site/7782?format=json</a
          >
          ning proovi ID 168303 infot näeb päringuga
          <a
            href="https://api.geocollections.info/sample/168303?format=json"
            title="SARV avalik API"
            target="ApiWindow"
            >https://api.geocollections.info/sample/168303?format=json</a
          >
        </div>

        <div class="mt-2">
          Otsingute sooritamiseks tuleks eelnevalt tutvuda näidete ja
          juhendmaterjalidega API teenuse avalehel. Näiteks järgmine päring
          kuvab nimekirja proovipunktidest kus turba paksus on üle 9 m:
          <a
            href="https://api.geocollections.info/site/?project=20&depth__gte=8&format=json"
            title="SARV avalik API"
            target="ApiWindow"
            >https://api.geocollections.info/site/?project=20&depth__gte=8&format=json</a
          >. Oluline on täiendava kriteeriumina kasutada proovipunktide otsingus
          parameetrit 'project=20', mis eristab turba uuringutepunkte muudest
          andmetest. Proovide otsingu tuleb kasutada lisaparameetrit
          'series_id=258', mis piirab tulemused turba andmebaasi kirjetega.
        </div>
      </v-card-text>
    </v-card>

    <v-card flat>
      <v-card-title class="pb-1">
        Kaardiserver
      </v-card-title>

      <v-card-text class="pa-2">
        <div>
          Turbauuringute andmebaasi ruumiobjektide (turbaalad, proovipunktid,
          turbaalade tehnilised plaanid) kuvamine veebiportaali kaardivaates
          ning muudes rakenduses on võimalik WMS ja WFS teenuste vahendusel.
          Vastav tehniline lahendus baseerub GeoServer veebi-kaardiserveri
          tarkvaral. Teenus on kättesaadav aadressil:
          <a
            href="https://gis.geocollections.info/geoserver/wms?"
            title="Kaardiserver"
            target="GeoserverWindow"
            >https://gis.geocollections.info/geoserver/wms?</a
          >
          Turbauuringute andmebaasi olulisemad kaardikihid on "turvas:Turbaalad"
          ja "turvas:Turbapunktid".
        </div>

        <div class="mt-2">
          Näite WMS teenuse kasutamiseks Leaflet.js rakenduses leiab
          turbauuringute veebiportaali lähtekoodist (<a
            href="https://github.com/geocollections/turvas"
            title="Projekti GitHub repositoorium"
            target="GithubWindow"
            >https://github.com/geocollections/turvas</a
          >). Turbauuringute WMS/WFS kaardikihte saab kasutada ka
          töölauarakendustes, nt QGISis.
        </div>
      </v-card-text>
    </v-card>

    <v-card flat>
      <v-card-title class="pb-1">
        Andmete allalaadimine
      </v-card-title>

      <v-card-text class="pa-2">
        <div>
          Turbauuringute põhiandmestik on allalaetav veebiportaali vahendusel
          *.xlsx vormingus failina, kus peamised andmeobjekid on jaotatud eraldi
          töölehtedele (turbaalad, proovipunktid, proovid ja analüüside
          tulemused). See koondfail on arhiveeritud ka Eesti maapõueandmete
          repositooriumis ning varustatud DOI numbriga, mis tagab selle püsiva
          kättesaadavuse ja mugava viidatavuse (<a
            href="https://doi.org/"
            title="DOI system"
            target="DoiWindow"
            >https://doi.org/...</a
          >).
        </div>

        <div class="mt-2">
          Digiteeritud turbaalade plaanid on allalaetavad veebiportaali
          vahendusel georefereeritud *.tif vormingus (geotiff, EPSG:3301
          projektsioon) maakondade kaupa kokkupakituna. Failid on kasutatavad
          kõigi levinud GIS programmidega, nt QGIS, ArcGIS ja Mapinfo.
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "MoreTab"
};
</script>

<style scoped></style>
