import axios from "axios";
import cloneDeep from "lodash/cloneDeep";

const API_URL = "https://api.geocollections.info/";
const SOLR_URL = "https://api.geocollections.info/solr/";

class SearchService {
  static getDetailView = async (table, id, params) => {
    try {
      let queryParams = encodeQueryData(params);
      if (queryParams.length > 0) queryParams = "&" + queryParams;
      let url = `${API_URL}${table}/${id}?format=json${queryParams}`;

      const res = await axios.get(url);
      if (res.status === 200) return res.data.results[0];
      else return buildErrorMessage(table, id);
    } catch (err) {
      return buildErrorMessage(table, id);
    }
  };

  static doRegularSearch = async (table, params = {}) => {
    try {
      let orderBy = buildOrderBy(params.sortBy, params.sortDesc);
      delete params.sortBy;
      delete params.sortDesc;
      let queryParams = encodeQueryData(params);
      if (queryParams.length > 0) queryParams = "&" + queryParams;
      if (orderBy.length > 0) queryParams += "&order_by=" + orderBy;
      let url = `${API_URL}${table}/?format=json${queryParams}`;

      const res = await axios.get(url);
      if (res.status === 200) return res.data;
      else return buildErrorMessage(table);
    } catch (err) {
      return buildErrorMessage(table);
    }
  };

  static doSolrSearch = async (table, params = {}) => {
    try {
      console.log(params);
      let searchParams = cloneDeep(params);

      let start = (searchParams.page - 1) * searchParams.paginateBy;
      let sort = buildSort(searchParams.sortBy, searchParams.sortDesc);
      let paginateBy = searchParams.paginateBy;
      let filter = searchParams.filter || "";
      delete searchParams.page;
      delete searchParams.paginateBy;
      delete searchParams.sortBy;
      delete searchParams.sortDesc;
      delete searchParams.filter;
      let queryParams = encodeQueryData(searchParams, true);
      if (queryParams.length > 0) queryParams = "&fq=" + queryParams;
      if (sort.length > 0) queryParams += "&sort=" + sort;
      if (filter.length > 0) filter = "&q=" + filter;
      let url = `${SOLR_URL}${table}/?start=${start}&rows=${paginateBy}${filter}${queryParams}&defType=edismax`;

      const res = await axios.get(url);
      if (res.status === 200) return res.data;
      else return buildErrorMessage(table);
    } catch (err) {
      return buildErrorMessage(table);
    }
  };
}

function buildErrorMessage(table, id) {
  if (table && id) {
    return `Päring tabelist <b>${table}</b>, mille ID on <b>${id}</b> ebaõnnestus`;
  } else return `Päring tabelist <b>${table}</b> ebaõnnestus`;
}

function encodeQueryData(data, isSolr = false) {
  const encodedData = [];
  for (let item in data) {
    let encodedObject = `${encodeURIComponent(item)}${
      isSolr ? ":" : "="
    }${encodeURIComponent(data[item])}`;
    encodedData.push(encodedObject);
  }
  return encodedData.join("&fq=");
}

function buildOrderBy(sortBy, sortDesc) {
  if (sortBy && sortDesc && sortBy.length > 0 && sortDesc.length > 0) {
    let orderBy = "";

    sortBy.forEach((field, index) => {
      orderBy += (sortDesc[index] ? "-" : "") + field + ",";
    });

    if (orderBy.length > 0) orderBy = orderBy.substring(0, orderBy.length - 1);
    else orderBy = "";

    return orderBy;
  } else return "";
}

function buildSort(sortBy, sortDesc) {
  let sort = "";
  if (sortBy && sortDesc && sortBy.length > 0 && sortDesc.length > 0) {
    sortBy.forEach((field, index) => {
      sort += field + (sortDesc[index] ? " desc" : " asc") + ",";
    });

    if (sort.length > 0) sort = sort.substring(0, sort.length - 1);
  }
  return sort;
}

export default SearchService;
