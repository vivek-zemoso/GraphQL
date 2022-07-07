require("dotenv").config({ path: __dirname + "/../.env" });
const axios = require("axios").default;

exports.Query = {
  coins: async (parent, { filter }) => {
    const params = { ...filter };
    const url = new URL(`${process.env.API_URL}/coins`);
    for (let param in params) {
      url.searchParams.append(param, params[param]);
    }

    const result = await axios.get(url.toString());
    return result.data.coins;
  },

  coin: async (parent, { id, filter }) => {
    const params = { ...filter };
    const url = new URL(`${process.env.API_URL}/coins/${id}`);
    for (let param in params) {
      url.searchParams.append(param, params[param]);
    }

    const result = await axios.get(url.toString());
    return result.data.coin;
  },

  coinChart: async (parent, { filter }) => {
    const params = { ...filter };
    const url = new URL(`${process.env.API_URL}/charts`);
    for (let param in params) {
      url.searchParams.append(param, params[param]);
    }

    const result = await axios.get(url.toString());
    return result.data;
  },

  exchanges: async () => {
    const url = new URL(`${process.env.API_URL}/exchanges`);
    const result = await axios.get(url.toString());
    return result.data;
  },

  markets: async (parent, { filter }) => {
    const params = { ...filter };
    const url = new URL(`${process.env.API_URL}/markets`);
    for (let param in params) {
      url.searchParams.append(param, params[param]);
    }

    const result = await axios.get(url.toString());
    return result.data;
  },

  getTickers: async (parent, { filter }) => {
    const params = { ...filter };
    const url = new URL(`${process.env.API_URL}/tickers`);
    for (let param in params) {
      url.searchParams.append(param, params[param]);
    }

    const result = await axios.get(url.toString());
    return result.data;
  },

  fiatCurrencies: async () => {
    const url = new URL(`${process.env.API_URL}/fiats`);
    const result = await axios.get(url.toString());
    return result.data;
  },

  getNews: async (parent, { params }) => {
    params = {
      ...params,
      toDate: params.toDate?.getTime(),
      fromDate: params.fromDate?.getTime(),
    };
    const url = new URL(`${process.env.API_URL}/news`);
    for (let param in params) {
      url.searchParams.append(param, params[param]);
    }

    const result = await axios.get(url.toString());
    return result.data;
  },

  getFilteredNews: async (parent, { params, filter }) => {
    const filterName = filter.filterName.toLowerCase();
    const url = new URL(`${process.env.API_URL}/news/${filterName}`);
    for (let param in params) {
      url.searchParams.append(param, params[param]);
    }

    const result = await axios.get(url.toString());
    return result.data;
  },

  getGithubUsers: async () => {
    const url = new URL(`${process.env.GITHUB_API_URL}/users`);
    const result = await axios.get(url.toString());
    return result.data;
  },

  getGithubUser: async (parent, { username }) => {
    const url = new URL(`${process.env.GITHUB_API_URL}/users/${username}`);
    const result = await axios.get(url.toString());
    return result.data;
  },
};
