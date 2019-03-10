import gql from "graphql-tag"

export const repsQuery = gql`
    query search($query: String!, $first: Int, $last: Int, $after: String, $before: String){
  search(   query: $query,
            type: REPOSITORY,
            first: $first,
            last: $last,
            after: $after,
            before: $before
  ) {
    repositoryCount
    pageInfo {
      endCursor
      hasNextPage
      startCursor
    }
    edges {
      node {
        ... on Repository {
          id
          name
          owner {
            login
          }
          nameWithOwner
          url
          description
        }
      }
    }
  }
}`;