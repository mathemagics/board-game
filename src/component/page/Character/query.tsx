import gql from 'graphql-tag';

export const GET_CHARACTER = gql`
  query getCharacter($id: String!){
    character(id: $id) {
      id
      name
      species
    }
  }
`;

export const GET_SPECIES = gql`
  {
    listSpecies {
      name
    }
  }
`;

export const GET_PLAYBOOKS = gql`
  {
    listPlaybooks {
      name
      id
    }
  }
`;
