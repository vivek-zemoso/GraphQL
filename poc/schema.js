const { gql } = require("apollo-server");

exports.typeDefs = gql`
  # Coins

  type Coin {
    id: ID!
    icon: String
    name: String
    symbol: String
    rank: Int
    price: Float
    priceBtc: Float
    volume: Float
    marketCap: Float
    availableSupply: Float
    totalSupply: Float
    priceChange1h: Float
    priceChange1d: Float
    priceChange1w: Float
    websiteUrl: String
    twitterUrl: String
    contractAddress: String
    decimals: String
    exp: [String]
  }

  type CoinChart {
    chart: [[Float]]
  }

  input CoinsFilters {
    skip: Int!
    limit: Int!
    currency: String!
  }

  input CoinFilters {
    currency: String!
  }

  input CoinChartFilters {
    period: String!
    coinId: String!
  }

  # Exchange Tickers

  type Exchange {
    supportedExchanges: [String]
  }

  type Market {
    price: Float!
    exchange: String!
    link: String
    pair: String!
    volume: Float!
  }

  type Ticker {
    tickers: [TickerData]
  }

  type TickerData {
    from: String
    to: String
    exchange: String
    price: Float
  }

  input MarketFilters {
    coinId: String!
  }

  input TickerFilters {
    exchange: String!
    pair: String!
  }

  # Fiat Currencies

  type FiatCurrency {
    name: String
    rate: Float
    symbol: String
    imageUrl: String
  }

  # News

  scalar Date

  type News {
    news: [NewsData]
  }

  type NewsData {
    id: String
    feedDate: Date
    source: String
    title: String
    isFeatured: Boolean
    description: String
    imgURL: String
    link: String
    sourceLink: String
    shareURL: String
    relatedCoins: [String]
  }

  input NewsParams {
    skip: Int!
    limit: Int!
    fromDate: Date
    toDate: Date
  }

  input NewsFilter {
    filterName: FilterName!
  }

  enum FilterName {
    HANDPICKED
    TRENDING
    LATEST
    BULLISH
    BEARISH
  }

  type GitHubUsers {
    login: String
    id: Int
    node_id: String
    avatar_url: String
    gravatar_id: String
    url: String
    html_url: String
    followers_url: String
    following_url: String
    gists_url: String
    starred_url: String
    subscriptions_url: String
    organizations_url: String
    repos_url: String
    events_url: String
    received_events_url: String
    type: String
    site_admin: Boolean
  }

  type GitHubUser {
    login: String
    id: Int
    node_id: String
    avatar_url: String
    gravatar_id: String
    url: String
    html_url: String
    followers_url: String
    following_url: String
    gists_url: String
    starred_url: String
    subscriptions_url: String
    organizations_url: String
    repos_url: String
    events_url: String
    received_events_url: String
    type: String
    site_admin: Boolean
    name: String
    company: String
    blog: String
    location: String
    email: String
    hireable: Boolean
    bio: String
    twitter_username: String
    public_repos: Int
    public_gists: Int
    followers: Int
    following: Int
    created_at: Date
    updated_at: Date
  }

  type Query {
    coins(filter: CoinsFilters): [Coin]
    coin(id: ID!, filter: CoinFilters): Coin
    coinChart(filter: CoinChartFilters): CoinChart
    exchanges: Exchange
    markets(filter: MarketFilters!): [Market]
    getTickers(filter: TickerFilters!): Ticker
    fiatCurrencies: [FiatCurrency]
    getNews(params: NewsParams): News
    getFilteredNews(params: NewsParams, filter: NewsFilter): News
    getGithubUsers: [GitHubUsers]
    getGithubUser(username: String!): GitHubUser
  }
`;
