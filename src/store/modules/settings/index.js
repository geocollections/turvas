import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

const state = {
  showMap: true,
  carouselText:
    'Keskkonnainvesteeringute Keskuse projektide nr 12623 "Turbaalaste uurimistulemuste digitaliseerimine ja andmebaasi koostamine I etapp (Harju, Rapla, Pärnu maakond)" ja 14460 "Turbaalaste uurimistulemuste digitaliseerimine ja andmebaasi koostamine II etapp" eesmärgiks oli turba uurimisel kogutud andmestiku koondamine, digiteerimine ning erinevatele sihtrühmadele\n' +
    "(turbatootjad, ametnikud, keskkonnaspetsialistid, üliõpilased, loodusehuvilised) kättesaadavaks tegemine.\n" +
    "Turbageoloogiline originaalandmestik on kogutud Eesti Geoloogiakeskuse poolt ning seda säilitatakse Geoloogiafondis. Andmete digiteerimise ja andembaasi koostamise viis läbi Tallinna Tehnikaülikooli geoloogia instituut 2016-2020.",
  carouselSlides: [
    {
      id: 1,
      src: "https://turvas.geoloogia.info/3D/raba2.jpg",
      text:
        'Keskkonnainvesteeringute Keskuse projekt nr 12623 "Turbaalaste uurimistulemuste digitaliseerimine ja andmebaasi koostamine I etapp (Harju, Rapla, Pärnu maakond)" eesmärgiks oli turba uurimisel kogutud andmestiku alusel koostada üldsusele kättesaadav andmebaas nii, et see oleks ühildatav geoloogilise kaardistamise käigus kogutavate andmete ja keskkonnaregistri maardlate nimistu infoga.'
    },
    {
      id: 2,
      src: "https://turvas.geoloogia.info/3D/raba4.jpg",
      text:
        "1. Varasemate uurimistööde andmete kogumine ja digitaliseerimine (turba üldtehnilised näitajad: botaaniline koostis, tuhasus, niiskus, pH, kahjulikud elemendid, kütteväärtus jt)."
    },
    {
      id: 3,
      src: "https://turvas.geoloogia.info/3D/raba1.jpg",
      text:
        "2. Turbamaardlate (140) plaanide digitaliseerimine ja georefereerimine."
    },
    {
      id: 4,
      src: "https://turvas.geoloogia.info/3D/raba3.jpg",
      text:
        "3. Turbast võetud proovipunktide koordinaatide ja absoluutkõrguste määramine digitaliseeritud ruumiandmete baasil (kasutades ArcGIS programmi)."
    }
  ],
  block: {
    area: [true, true, true],
    site: [true, true, true, true],
    sample: [true, true, true],
    search: [true]
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
