const { AuthenticationError } = require("apollo-server");
const { v4: uuid } = require("uuid");

exports.Mutation = {
  createTweet: (parent, { body }, { db, user }) => {
    const newTweet = {
      id: uuid(),
      body,
      date: new Date(),
      AuthorId: user.id,
      StatsId: "stat4",
      read: false,
    };

    db.tweets.push(newTweet);
    return newTweet;
  },

  deleteTweet: (parent, { id }, { db, user }) => {
    const deletedTweet = db.tweets.find((tweet) => tweet.id === id);

    if (deletedTweet.AuthorId !== user.id) {
      throw new AuthenticationError("You are not authorised !!");
    }

    db.tweets = db.tweets.filter((tweet) => tweet.id !== id);
    return deletedTweet;
  },

  markTweetRead: (parent, { id }, { db }) => {
    const index = db.tweets.findIndex((tweet) => tweet.id === id);
    if (index === -1) return false;
    db.tweets[index].read = true;
    return true;
  },
};
