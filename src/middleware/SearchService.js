import axios from "axios";

const API_URL = "https://api.geocollections.info/";

class SearchService {
  static getDetailView = async (table, id) => {
    try {
      let url = `${API_URL}${table}/${id}.json`;

      const res = await axios.get(url);
      if (res.status === 200) return res.data.results[0];
      else return buildDetailViewErrorMessage(table, id);
    } catch (err) {
      return buildDetailViewErrorMessage(table, id);
    }
  };

  static doRegularSearch = async (table, params) => {
    console.log(table);
    console.log(params);
  };
}

function buildDetailViewErrorMessage(table, id) {
  return `Päring tabelist <b>${table}</b>, mille ID on <b>${id}</b> ebaõnnestus`;
}

export default SearchService;
