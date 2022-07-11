exports.Category = {
  products: ({ id: categoryId }, { filter }, { db }) => {
    const categoryProducts = db.products.filter(
      (product) => categoryId === product.categoryId
    );

    let filteredCategoryProducts = categoryProducts;
    if (filter) {
      const { onSale, avgRating } = filter;

      if (onSale !== null) {
        filteredCategoryProducts = filteredCategoryProducts.filter(
          (product) => {
            return onSale === product.onSale;
          }
        );
      }

      if ([1, 2, 3, 4, 5].includes(avgRating)) {
        filteredCategoryProducts = filteredCategoryProducts.filter(
          (product) => {
            let sumRating = 0;
            let numberOfReviews = 0;

            reviews.forEach((review) => {
              if (review.productId === product.id) {
                numberOfReviews++;
                sumRating += review.rating;
              }
            });

            const averageProductRating = sumRating / numberOfReviews;
            return averageProductRating >= avgRating;
          }
        );
      }
    }

    return filteredCategoryProducts;
  },
};
