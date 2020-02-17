import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

const state = {
  showMap: true,
  carouselSlides: [
    {
      id: 1,
      src: "https://kik.ee/sites/default/files/43_9787e1e4-aa3b-45b3-9510-73c4dd61501a.jpg",
      text:
        'Keskkonnainvesteeringute Keskuse projekt nr 12623 "Turbaalaste uurimistulemuste digitaliseerimine ja andmebaasi koostamine I etapp (Harju, Rapla, Pärnu maakond)" eesmärgiks oli turba uurimisel kogutud andmestiku alusel koostada üldsusele kättesaadav andmebaas nii, et see oleks ühildatav geoloogilise kaardistamise käigus kogutavate andmete ja keskkonnaregistri maardlate nimistu infoga.'
    },
    {
      id: 2,
      src: "https://i.picsum.photos/id/95/1920/1080.jpg",
      text:
        "1. Varasemate uurimistööde andmete kogumine ja digitaliseerimine (turba üldtehnilised näitajad: botaaniline koostis, tuhasus, niiskus, pH, kahjulikud elemendid, kütteväärtus jt)."
    },
    {
      id: 3,
      src: "https://i.picsum.photos/id/51/1920/1080.jpg",
      text:
        "2. Turbamaardlate (140) plaanide digitaliseerimine ja georefereerimine."
    },
    {
      id: 4,
      src: "https://i.picsum.photos/id/54/1920/1080.jpg",
      text:
        "3. Turbast võetud proovipunktide koordinaatide ja absoluutkõrguste määramine digitaliseeritud ruumiandmete baasil (kasutades ArcGIS programmi)."
    },
    {
      id: 5,
      src: "https://i.picsum.photos/id/100/1920/1080.jpg",
      text:
        "4. Lühiülevaadete koostamine turbamaardlatest (turba genees, omadused, varude iseloomustus, perspektiivsed kasutusvõimalused ning nende sidumine andmebaasides olevate andmetega."
    },
    {
      id: 6,
      src: "https://i.picsum.photos/id/128/1920/1080.jpg",
      text:
        "Projekti vastutav täitja on TTÜ geoloogia instituudi dotsent Mall Orru. Projekti alusandmestik on kogutud Eesti Geoloogiakeskuse poolt ning seda säilitatakse Geoloogiafondis."
    }
  ]
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
