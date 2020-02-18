import axios from "axios";

const API_URL = "https://api.geocollections.info/";

class SearchService {
  static getDetailView = async (table, id, params) => {
    try {
      let queryParams = encodeQueryData(params);
      if (queryParams.length > 0) queryParams = "&" + queryParams;
      let url = `${API_URL}${table}/${id}?format=json${queryParams}`;

      const res = await axios.get(url);
      if (res.status === 200) return res.data.results[0];
      else return buildDetailViewErrorMessage(table, id);
    } catch (err) {
      return buildDetailViewErrorMessage(table, id);
    }
  };

  static doRegularSearch = async (table, params) => {
    try {
      let queryParams = encodeQueryData(params);
      if (queryParams.length > 0) queryParams = "&" + queryParams;
      let url = `${API_URL}${table}/?format=json${queryParams}`;

      const res = await axios.get(url);
      if (res.status === 200) return res.data;
      else return buildDetailViewErrorMessage(table);
    } catch (err) {
      return buildDetailViewErrorMessage(table);
    }
  };
}

function buildDetailViewErrorMessage(table, id) {
  if (table && id) {
    return `Päring tabelist <b>${table}</b>, mille ID on <b>${id}</b> ebaõnnestus`;
  } else return `Päring tabelist <b>${table}</b> ebaõnnestus`;
}

function encodeQueryData(data) {
  const encodedData = [];
  for (let item in data) {
    encodedData.push(
      encodeURIComponent(item) + "=" + encodeURIComponent(data[item])
    );
  }
  return encodedData.join("&");
}

export default SearchService;
