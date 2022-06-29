exports.Category = {
  products: ({ id: categoryId }, args, { products }) => {
    return products.filter((product) => categoryId === product.categoryId);
  },
};
