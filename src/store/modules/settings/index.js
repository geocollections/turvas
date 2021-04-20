import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

const state = {
  language: "ee",
  projectVersion: "1.4.0",
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
    },
    {
      id: 4,
      href: "https://www.turbaliit.ee/",
      target: "TurbaliitWindow",
      title: "Eesti Turbaliit",
      src: require("@/assets/img/logos/etl_logo.png"),
      class: "logo etl-logo"
    },
    {
      id: 5,
      href: "https://www.mikskaar.com/",
      target: "MikskaarWindow",
      title:
        "Mikskaar: Kvaliteetne kasvuturvas ja turbatoote kõigile taimedele",
      src: require("@/assets/img/logos/mikskaar_logo.png"),
      class: "logo mikskaar-logo"
    },
    {
      id: 6,
      href: "https://asbgreenworld.com/en/",
      target: "ASBWindow",
      title: "ASB Greenworld",
      src: require("@/assets/img/logos/asb_logo.svg"),
      class: "logo asb-logo"
    },
    {
      id: 7,
      href: "https://www.kekkila-bvb.com/",
      target: "KekkilaWindow",
      title: "Kekkilä: Kasvades ja kasvatades koos parema tuleviku nimel",
      src: require("@/assets/img/logos/kekkila_logo.png"),
      class: "logo kekkila-logo"
    },
    {
      id: 8,
      href: "",
      target: "",
      title: "Kalloveen Eesti OÜ",
      src: require("@/assets/img/logos/kalloveen_logo.png"),
      class: "logo kalloveen-logo"
    }
  ],
  backgroundImages: [
    {
      id: 0,
      src: "https://turba.geoloogia.info/failid/pildid/punasoo_raba_1.jpg"
    },
    {
      id: 1,
      src: "https://turba.geoloogia.info/failid/pildid/Turvas-0001_1.jpg"
    },
    {
      id: 2,
      src: "https://turba.geoloogia.info/failid/pildid/kakerdaja_raba_1.jpg"
    },
    {
      id: 3,
      src: "https://turba.geoloogia.info/failid/pildid/Turvas-0007_1.jpg"
    }
  ],
  downloadLinks: [
    {
      id: 0,
      src: "/failid/seletuskiri.pdf",
      title: "download.kikTitle",
      text: "download.kik"
    },
    {
      id: 1,
      src: "https://doi.geocollections.info/10.15152/GEO.487",
      title: "download.doiTitle",
      text: "download.doi",
      target: "DoiWindow"
    },
    {
      id: 2,
      src: "/failid/turbaalade_tehnilised_plaanid.tar",
      title: "download.plansTitle",
      text: "download.plans"
    },
    {
      id: 3,
      src: "",
      title: "",
      text: "download.files",
      additionalLinks: [
        {
          id: 0,
          src: "https://fond.egt.ee/fond/egf/7724",
          title: "download.files1Title",
          text: "download.files1",
          target: "FondWindow"
        },
        {
          id: 1,
          src: "https://fond.egt.ee/fond/egf/7804",
          title: "download.files2Title",
          text: "download.files2",
          target: "FondWindow"
        },
        {
          id: 2,
          src: "https://fond.egt.ee/fond/egf/7913",
          title: "download.files3Title",
          text: "download.files3",
          target: "FondWindow"
        },
        {
          id: 3,
          src: "https://fond.egt.ee/fond/egf/8030",
          title: "download.files4Title",
          text: "download.files4",
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
