const { gql } = require("apollo-server-express");

exports.typeDefs = gql`
  type Tweet {
    id: ID!
    body: String
    date: Date
    Author: User
    Stats: Stat
    read: Boolean
  }

  type User {
    id: ID!
    username: String
    first_name: String
    last_name: String
    full_name: String
    name: String @deprecated
    avatar_url: String
  }

  type Stat {
    views: Int
    likes: Int
    retweets: Int
    responses: Int
  }

  type Notification {
    id: ID
    date: Date
    body: String!
    type: String
  }

  type Meta {
    count: Int
  }

  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
    Tweets: [Tweet]
  }

  scalar Date

  type Query {
    hello: String!
    Tweet(id: ID!): Tweet
    Tweets(
      limit: Int
      skip: Int
      sort_field: String
      sort_order: String
    ): [Tweet]
    TweetsMeta: Meta
    User(id: ID!): User
    Notifications(limit: Int): [Notification]
    NotificationsMeta: Meta
    Login(username: String, password: String): AuthData
  }

  type Mutation {
    createTweet(body: String): Tweet
    deleteTweet(id: ID!): Tweet
    markTweetRead(id: ID!): Boolean
  }
`;
