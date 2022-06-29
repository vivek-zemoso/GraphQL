exports.Product = {
  category: ({ categoryId }, args, { categories }) => {
    return categories.find((category) => categoryId === category.id);
  },

  reviews: ({ id }, args, { reviews }) => {
    return reviews.filter((review) => id === review.productId);
  },
};
