require("dotenv").config({ path: __dirname + "/../.env" });
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.Query = {
  Tweets: (parent, args, { db }) => {
    const { limit, skip, sort_field, sort_order } = args;
    let filteredTweets = db.tweets;

    if (skip > 0) filteredTweets = filteredTweets.slice(skip);

    if (limit > 0) filteredTweets = filteredTweets.slice(0, limit);

    if (sort_field !== null) {
      filteredTweets.sort((tweet1, tweet2) => {
        const tweet1Stats = db.stats.find((stat) => tweet1.StatsId === stat.id);
        const tweet2Stats = db.stats.find((stat) => tweet2.StatsId === stat.id);

        if (sort_order === "desc") {
          return tweet1Stats[sort_field] - tweet2Stats[sort_field];
        } else if (sort_order === "asc") {
          return tweet2Stats[sort_field] - tweet1Stats[sort_field];
        } else return 0;
      });
    }

    return filteredTweets;
  },

  Tweet: (parent, { id }, { db }) => {
    return db.tweets.find((tweet) => id === tweet.id);
  },

  TweetsMeta: (parent, args, { db }) => ({ count: db.tweets.length }),

  User: (parent, { id }, { db }) => {
    return db.users.find((user) => user.id === id);
  },

  Notifications: (parent, args, { db }) => {
    return db.notifications;
  },

  NotificationsMeta: (parent, args, { db }) => ({
    count: db.notifications.length,
  }),

  Login: async (parent, { username, password }, { db }) => {
    console.log("I am coming here!");

    const user = db.users.find((user) => user.username === username);
    if (!user) {
      throw new Error("User does not exist!");
    }

    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new Error("Password is incorrect!");
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.SECRET_KEY,
      { expiresIn: "24h" }
    );

    return {
      userId: user.id,
      token: token,
      tokenExpiration: 24,
      Tweets: db.tweets,
    };
  },
};
