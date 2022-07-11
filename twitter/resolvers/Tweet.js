exports.Tweet = {
  Author: ({ AuthorId }, args, { db }) => {
    return db.users.find((user) => user.id === AuthorId);
  },

  Stats: ({ StatsId }, args, { db }) => {
    return db.stats.find((stat) => stat.id === StatsId);
  },
};
