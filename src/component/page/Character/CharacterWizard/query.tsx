import gql from 'graphql-tag';

export const GET_SPECIES = gql`
  {
    listSpecies {
      name
    }
  }
`;
