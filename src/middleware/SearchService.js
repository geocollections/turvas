import axios from "axios";
import cloneDeep from "lodash/cloneDeep";

const API_URL = "https://api.geocollections.info/";
const SOLR_URL = "https://api.geocollections.info/solr/";
const RAW_SOLR_URL = "https://api.geocollections.info/raw_solr/";

const GEOSERVER_URL_WMS =
  "https://gis.geocollections.info/geoserver/turvas/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&INFO_FORMAT=application/json&FEATURE_COUNT=1&X=50&Y=50&SRS=EPSG:3301&STYLES=&WIDTH=101&HEIGHT=101&exceptions=text/javascript";
const GEOSERVER_URL_WFS =
  "https://gis.geocollections.info/geoserver/turvas/ows?service=WFS&version=1.0.0&request=GetFeature&maxFeatures=50&outputFormat=application%2Fjson";

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
      let searchParams = cloneDeep(params);

      let start = 0;
      let paginateBy = 100;
      if (searchParams.page && searchParams.paginateBy) {
        start = (searchParams.page - 1) * searchParams.paginateBy;
        paginateBy = searchParams.paginateBy;
      }
      let sort = buildSort(searchParams.sortBy, searchParams.sortDesc);
      let filter = searchParams.filter || "";
      delete searchParams.page;
      delete searchParams.paginateBy;
      delete searchParams.sortBy;
      delete searchParams.sortDesc;
      delete searchParams.filter;
      let queryParams = encodeQueryData(searchParams, true);
      if (queryParams.length > 0) queryParams = "&fq=" + queryParams;
      if (sort.length > 0) queryParams += "&sort=" + sort;
      if (filter.length > 0) filter = `&q=*${encodeURIComponent(filter)}*`;
      let url = `${SOLR_URL}${table}/?start=${start}&rows=${paginateBy}${filter}${queryParams}&defType=edismax`;

      const res = await axios.get(url);
      if (res.status === 200) return res.data;
      else return buildErrorMessage(table);
    } catch (err) {
      return buildErrorMessage(table);
    }
  };

  static doSolrFacetSearch = async (table, facetFields) => {
    try {
      let url = `${RAW_SOLR_URL}${table}/?facet=true&facet.sort=index&facet.limit=-1&format=json`;

      let fields = buildFacetFields(facetFields);

      if (fields.length > 0) url += "&" + fields;

      const res = await axios.get(url);
      if (res.status === 200) return res.data;
      else return buildErrorMessage(table);
    } catch (err) {
      return buildErrorMessage(table);
    }
  };

  static doGeoserverRequest = async (params, useWMS = true) => {
    try {
      let queryParams = encodeQueryData(params);
      let url = `${
        useWMS ? GEOSERVER_URL_WMS : GEOSERVER_URL_WFS
      }&${queryParams}`;

      const res = await axios.get(url);
      if (res.status === 200) return res.data;
      else return "Päring geoserverist ebaõnnestus";
    } catch (err) {
      return "Päring geoserverist ebaõnnestus";
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
  let start = "*";
  let end = "*";
  let depthExists = false;

  for (let item in data) {
    if (item === "depth_start" || item === "depth_end") {
      if (isSolr) {
        depthExists = true;
        if (item === "depth_start") start = encodeURIComponent(data[item]);
        else end = encodeURIComponent(data[item]);
      }
    } else {
      let encodedObject = `${encodeURIComponent(item)}${
        isSolr ? ":" : "="
      }${encodeURIComponent(data[item])}`;

      encodedData.push(encodedObject);
    }
  }

  if (depthExists) {
    let encodedObject = `depth:[${start} TO ${end}] OR depth_interval:[${start} TO ${end}]`;
    encodedData.push(encodedObject);
  }

  return encodedData.join(isSolr ? "&fq=" : "&");
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

function buildFacetFields(fields) {
  let fieldsQuery = "";
  if (fields && fields.length > 0) {
    fields.forEach(field => (fieldsQuery += "facet.field=" + field + "&"));

    if (fieldsQuery.length > 0)
      fieldsQuery = fieldsQuery.substring(0, fieldsQuery.length - 1);
  }
  return fieldsQuery;
}

export default SearchService;
