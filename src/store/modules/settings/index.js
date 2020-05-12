import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

const state = {
  showMap: true,
  carouselText:
    'Keskkonnainvesteeringute Keskuse projektid nr 12623 "Turbaalaste uurimistulemuste digitaliseerimine ja andmebaasi koostamine I etapp (Harju, Rapla, Pärnu maakond)" ja nr 14460 “Turbaalaste uurimistulemuste digitaliseerimine ja andmebaasi koostamine II etapp (jätkuprojekt)” eesmärgiks oli turba uurimisel kogutud andmestiku alusel koostada üldsusele kättesaadav andmebaas nii, et see oleks ühildatav geoloogilise kaardistamise käigus kogutavate andmete ja keskkonnaregistri maardlate nimistu infoga.',
  carouselText2:
    "Projekti vastutav täitja on TTÜ geoloogia instituudi dotsent <b>Mall Orru</b>. Projekti alusandmestik on kogutud põhiliselt Eesti Geoloogiakeskuse poolt ning seda säilitatakse Geoloogiafondis. ",
  carouselSlides: [
    {
      id: 1,
      src: "https://turvas.geoloogia.info/failid/pildid/punasoo_raba.jpg"
    },
    {
      id: 2,
      src: "https://turvas.geoloogia.info/failid/pildid/kakerdaja_raba.jpg"
    },
    {
      id: 3,
      src: "https://turvas.geoloogia.info/failid/pildid/soosaare_raba.jpg"
    },
    {
      id: 4,
      src: "https://turvas.geoloogia.info/failid/pildid/tuhu_soo.jpg"
    }
  ],
  block: {
    area: [true, true, true],
    site: [true, true, true, true],
    sample: [true, true, true],
    search: [true]
  },
  cookieLaw: true
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
