exports.Query = {
  hello: () => ["hello", "world of", "graphQL"],

  numberExample: () => 100,

  price: () => 45.56,

  isHotProduct: () => true,

  products: (parent, { filter }, { db }) => {
    let filteredProducts = db.products;
    if (filter) {
      const { onSale, avgRating } = filter;

      if (onSale !== null) {
        filteredProducts = filteredProducts.filter((product) => {
          return onSale === product.onSale;
        });
      }

      if ([1, 2, 3, 4, 5].includes(avgRating)) {
        filteredProducts = filteredProducts.filter((product) => {
          let sumRating = 0;
          let numberOfReviews = 0;

          db.reviews.forEach((review) => {
            if (review.productId === product.id) {
              numberOfReviews++;
              sumRating += review.rating;
            }
          });

          const averageProductRating = sumRating / numberOfReviews;
          return averageProductRating >= avgRating;
        });
      }
    }

    return filteredProducts;
  },

  product: (parent, { id }, { db }) => {
    return db.products.find((product) => id === product.id);
  },

  categories: (parent, args, { db }) => db.categories,

  category: (parent, { id }, { db }) => {
    return db.categories.find((category) => id === category.id);
  },
};
