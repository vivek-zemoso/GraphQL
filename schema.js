const { gql } = require("apollo-server");

exports.typeDefs = gql`
  type Query {
    hello: [String!]!
    numberExample: Int
    price: Float
    isHotProduct: Boolean
    products(filter: ProductFilters): [Product!]!
    product(id: ID!): Product
    categories: [Category!]!
    category(id: ID!): Category
  }

  type Product {
    id: ID!
    name: String!
    description: String!
    image: String!
    quantity: Int!
    price: Float!
    onSale: Boolean!
    category: Category
    reviews: [Review!]!
  }

  type Category {
    id: ID!
    name: String!
    products(filter: ProductFilters): [Product!]!
  }

  type Review {
    id: ID!
    date: String!
    title: String!
    comment: String!
    rating: Int!
  }

  type Mutation {
    addCategory(input: AddCategory!): Category!
    addProduct(input: AddProduct): Product!
    addReview(input: AddReview): Review!
    deleteCategory(id: ID!): Boolean!
    deleteProduct(id: ID!): Boolean!
    deleteReview(id: ID!): Boolean!
    updateCategory(id: ID!, input: UpdateCategory!): Category
    updateProduct(id: ID!, input: UpdateProduct!): Product
    updateReview(id: ID!, input: UpdateReview!): Review
  }

  input ProductFilters {
    onSale: Boolean
    avgRating: Int
  }

  input AddCategory {
    name: String!
  }

  input UpdateCategory {
    name: String!
  }

  input AddProduct {
    name: String!
    description: String!
    image: String!
    quantity: Int!
    price: Float!
    onSale: Boolean!
    categoryId: ID
  }

  input UpdateProduct {
    name: String!
    description: String!
    image: String!
    quantity: Int!
    price: Float!
    onSale: Boolean!
    categoryId: ID
  }

  input AddReview {
    date: String!
    title: String!
    comment: String!
    rating: Int!
    productId: ID!
  }

  input UpdateReview {
    date: String!
    title: String!
    comment: String!
    rating: Int!
    productId: ID!
  }
`;
