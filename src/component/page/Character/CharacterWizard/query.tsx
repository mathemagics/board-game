import gql from 'graphql-tag';

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
