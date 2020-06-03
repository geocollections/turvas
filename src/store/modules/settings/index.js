import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

const state = {
  showMap: true,
  projectInfoText1:
    '<a href="https://kik.ee" title="KIK" target="KikWindow" class="table-link">Keskkonnainvesteeringute Keskuse</a> projektid nr 12623 "Turbaalaste uurimistulemuste digitaliseerimine ja andmebaasi koostamine I etapp (Harju, Rapla, Pärnu maakond)" ja nr 14460 “Turbaalaste uurimistulemuste digitaliseerimine ja andmebaasi koostamine II etapp (jätkuprojekt)” eesmärgiks oli turba uurimisel kogutud andmestiku alusel koostada üldsusele kättesaadav andmebaas nii, et see oleks ühildatav geoloogilise kaardistamise käigus kogutavate andmete ja keskkonnaregistri maardlate nimistu infoga.',
  projectInfoText2:
    'Projekti vastutav täitja on <a href="https://taltech.ee/geoloogia-instituut" title="TalTech geoloogia instituut" target="LinkWindow" class="table-link">Tallinna Tehnikaülikooli geoloogia instituudi</a> dotsent Mall Orru. Projekti alusandmestik on kogutud põhiliselt Eesti Geoloogiakeskuse poolt ning seda säilitatakse <a href="https://fond.egt.ee" title="https://fond.egt.ee" target="FondWindow" class="table-link">Geoloogiafondis</a>. ',
  projectInfoText3:
    'Turbauuringute andmebaas kasutab maapõue andmehaldusplatvormi <a href="https://geocollections.info" title="SARV: Maapõue infosüsteem" target="GeocollectionsWindow" class="table-link">SARV</a> struktuuri ja tehnilist lahendust, mis on osaks Eesti teadustaristu <a href="https://natarc.ut.ee" title="NATARC: Loodusteaduslikud arhiivid ja andmevõrgustik" target="NatarcWindow" class="table-link">NATARC</a> teenustest.',
  listOfLogos: [
    {
      id: 0,
      href: "https://kik.ee",
      target: "KikWindow",
      title: "KIK",
      src: "https://files.geocollections.info/img/kik_est_logo.png",
      class: "logo kik-logo"
    },
    {
      id: 1,
      href: "https://taltech.ee/geoloogia-instituut",
      target: "LinkWindow",
      title: "TalTech geoloogia instituut",
      src: "https://files.geocollections.info/img/TalTech_GI_ET.png",
      class: "logo taltech-logo"
    },
    {
      id: 2,
      href: "https://natarc.ut.ee",
      target: "NatarcWindow",
      title: "NATARC: Loodusteaduslikud arhiivid ja andmevõrgustik",
      src: "https://files.geocollections.info/img/NATARC.png",
      class: "logo natarc-logo"
    },
    {
      id: 3,
      href: "https://geocollections.info",
      target: "GeocollectionsWindow",
      title: "SARV: Maapõue infosüsteem",
      src: "https://files.geocollections.info/img/sarv_logo.svg",
      class: "logo sarv-logo"
    }
  ],
  backgroundImages: [
    {
      id: 0,
      src: "https://turba.geoloogia.info/failid/pildid/punasoo_raba.jpg"
    },
    {
      id: 1,
      src: "https://turba.geoloogia.info/failid/pildid/kakerdaja_raba.jpg"
    },
    {
      id: 2,
      src: "https://turba.geoloogia.info/failid/pildid/soosaare_raba.jpg"
    },
    {
      id: 3,
      src: "https://turba.geoloogia.info/failid/pildid/tuhu_soo.jpg"
    }
  ],
  downloadLinks: [
    {
      id: 0,
      src: "/failid/seletuskiri.pdf",
      title: "Vaata seletuskirja",
      text:
        "KIKi projekti nr 14460 seletuskiri ja kasutusjuhend (pdf vormingus, 1MB)"
    },
    {
      id: 1,
      src: "https://doi.geocollections.info/10.15152/GEO.487",
      title: "https://doi.geocollections.info/10.15152/GEO.487",
      text:
        "Eesti turbauuringute andmebaas (põhiandmed xlsx vormingus, 7MB, registreeritud andmekogum DOI:10.15152/GEO.487)",
      target: "DoiWindow"
    },
    {
      id: 2,
      src: "/failid/turbaalade_tehnilised_plaanid.tar",
      title: "Lae alla turbaalade georefereeritud tehnilised plaanid",
      text:
        "Turbaalade georefereeritud tehnilised plaanid (geotiff vormingus, ~6GB)"
    },
    {
      id: 3,
      src: "",
      title: "",
      text:
        "Mahajäetud turbaväljade failid (lingid Geoloogiafondi aruannetele):",
      additionalLinks: [
        {
          id: 0,
          src: "https://fond.egt.ee/fond/egf/7724",
          title:
            "Eesti mahajäetud turbatootmisalade revisjon. 1. etapp. Harju, Rapla ja Lääne maakond",
          text: "1. etapp",
          target: "FondWindow"
        },
        {
          id: 1,
          src: "https://fond.egt.ee/fond/egf/7804",
          title:
            "Eesti mahajäetud turbatootmisalade revisjon. 2. Etapp. Ida-Viru, Lääne-Viru, Jõgeva, Järva ja Tartu maakond",
          text: "2. etapp",
          target: "FondWindow"
        },
        {
          id: 2,
          src: "https://fond.egt.ee/fond/egf/7913",
          title:
            "Eesti mahajäetud turbatootmisalade revisjon. 3.etapp. Viljandi, Pärnu, Saare ja Hiiu maakond",
          text: "3. etapp",
          target: "FondWindow"
        },
        {
          id: 3,
          src: "https://fond.egt.ee/fond/egf/8030",
          title:
            "Eesti mahajäetud turbatootmisalade revisjon. 4.etapp. Valga, Võru ja Põlva maakond",
          text: "4. etapp",
          target: "FondWindow"
        }
      ]
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
