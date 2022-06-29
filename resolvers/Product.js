exports.Product = {
  category: ({ categoryId }, args, { db }) => {
    return db.categories.find((category) => categoryId === category.id);
  },

  reviews: ({ id }, args, { db }) => {
    return db.reviews.filter((review) => id === review.productId);
  },
};
