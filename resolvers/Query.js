exports.Query = {
  hello: () => ["hello", "world of", "graphQL"],

  numberExample: () => 100,

  price: () => 45.56,

  isHotProduct: () => true,

  products: (parent, args, { products }) => products,

  product: (parent, { id }, { products }) => {
    return products.find((product) => id === product.id);
  },

  categories: (parent, args, { categories }) => categories,

  category: (parent, { id }, { categories }) => {
    return categories.find((category) => id === category.id);
  },
};
