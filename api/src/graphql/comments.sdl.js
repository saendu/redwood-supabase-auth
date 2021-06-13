export const schema = gql`
  type Comment {
    id: Int!
    name: String!
    body: String!
    post: Post!
    postId: Int!
    createdAt: DateTime!
    userId: Int!
  }

  type Query {
    comments(postId: Int!): [Comment!]!
  }

  input CreateCommentInput {
    name: String!
    body: String!
    postId: Int!
    userId: Int! = 1
  }

  input UpdateCommentInput {
    name: String
    body: String
    postId: Int
    userId: Int
  }

  type Mutation {
    createComment(input: CreateCommentInput!): Comment!
    deleteComment(id: Int!): Comment!
  }
`
