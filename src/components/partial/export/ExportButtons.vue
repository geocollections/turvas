<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <v-btn v-on="on">
        <span>Ekspordi</span>
        <v-icon small right>fas fa-file-export</v-icon>
      </v-btn>
    </template>

    <v-list dense>
      <v-list-item @click="exportToCSV">
        <v-list-item-title>
          <span>Lae alla CSV</span>
          <v-icon right small>fas fa-file</v-icon>
        </v-list-item-title>
      </v-list-item>

      <v-list-item @click="copyToClipboard">
        <v-list-item-title>
          <span>Kopeeri lõikelauale</span>
          <v-icon right small>fas fa-copy</v-icon>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "ExportButtons",

  props: {
    filename: {
      type: String,
      default: "Turbageoloogia andmebaas"
    },
    tableData: {
      type: Array
    },
    clipboardClass: {
      type: String,
      required: false
    }
  },

  methods: {
    ...mapActions("error", ["updateErrorState", "updateErrorMessage"]),
    ...mapActions("success", ["updateSuccessState", "updateSuccessMessage"]),

    exportToCSV() {
      let csvString = this.convertJsonToCsv(this.tableData);

      if (csvString.length === 0) {
        this.updateErrorState(true);
        this.updateErrorMessage("Allalaadimine ebaõnnestus: Andmed puuduvad!");
        return;
      }

      let file = new Blob([csvString], { type: "text/plain" });

      if (window.navigator.msSaveOrOpenBlob)
        // IE10+
        window.navigator.msSaveOrOpenBlob(file, this.filename + ".csv");
      else {
        // Others
        let a = document.createElement("a");
        let url = URL.createObjectURL(file);
        a.href = url;
        a.download = this.filename + ".csv";
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }, 0);
      }

      this.updateSuccessState(true);
      this.updateSuccessMessage("Andmed eksporditi CSV-sse");
    },

    convertJsonToCsv(jsonArray) {
      const { Parser } = require("json2csv");

      // Possibility to export exact fields for each object
      const fields = Object.keys(jsonArray[0]);
      const opts = { fields };

      try {
        const parser = new Parser(opts);
        return parser.parse(jsonArray);
      } catch (err) {
        this.updateErrorState(true);
        this.updateErrorMessage(err);
        return "";
      }
    },

    copyToClipboard() {
      let el;
      if (this.clipboardClass) {
        el = document.getElementsByClassName(this.clipboardClass);
      } else {
        el = document.getElementsByClassName("v-data-table");
      }

      let body = document.body,
        range,
        sel;
      if (document.createRange && window.getSelection) {
        range = document.createRange();
        sel = window.getSelection();
        sel.removeAllRanges();
        try {
          range.selectNodeContents(el[0]);
          sel.addRange(range);
        } catch (e) {
          range.selectNode(el[0]);
          sel.addRange(range);
        }
      } else if (body.createTextRange) {
        range = body.createTextRange();
        range.moveToElementText(el[0]);
        range.select();
      }
      document.execCommand("Copy");
      sel.removeAllRanges();

      this.updateSuccessState(true);
      this.updateSuccessMessage("Andmed kopeeritud!");
    }
  }
};
</script>

<style scoped></style>
