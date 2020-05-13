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
  downloadText: "Projektiga seotud failide allalaadimine",
  downloadLinks: [
    {
      id: 1,
      src: "https://fond.egt.ee/fond/egf/7724",
      title:
        "Eesti mahajäetud turbatootmisalade revisjon. 1. etapp. Harju, Rapla ja Lääne maakond",
      text: "Mahajäetud väljade failid 1. etapp",
      target: "GeoloogiateenistusWindow"
    },
    {
      id: 2,
      src: "https://fond.egt.ee/fond/egf/7804",
      title:
        "Eesti mahajäetud turbatootmisalade revisjon. 2. Etapp. Ida-Viru, Lääne-Viru, Jõgeva, Järva ja Tartu maakond",
      text: "Mahajäetud väljade failid 2. etapp",
      target: "GeoloogiateenistusWindow"
    },
    {
      id: 3,
      src: "https://fond.egt.ee/fond/egf/7913",
      title:
        "Eesti mahajäetud turbatootmisalade revisjon. 3.etapp. Viljandi, Pärnu, Saare ja Hiiu maakond",
      text: "Mahajäetud väljade failid 3. etapp",
      target: "GeoloogiateenistusWindow"
    },
    {
      id: 4,
      src: "https://fond.egt.ee/fond/egf/8030",
      title:
        "Eesti mahajäetud turbatootmisalade revisjon. 4.etapp. Valga, Võru ja Põlva maakond",
      text: "Mahajäetud väljade failid 4. etapp",
      target: "GeoloogiateenistusWindow"
    },
    {
      id: 5,
      src: "/seletuskiri",
      title: "Projekti seletuskiri",
      text: "Projekti seletuskiri"
    },
    {
      id: 6,
      src: "/kasutusjuhend",
      title: "Tutvu rakenduse kasutusjuhendiga",
      text: "Kasutusjuhend",
      isRouterLink: true
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
