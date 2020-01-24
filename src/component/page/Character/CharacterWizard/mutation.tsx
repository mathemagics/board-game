import gql from 'graphql-tag';

export const UPDATE_SPECIES = gql`
  mutation UpdateCharacter($species: String!) {
    species(species: $species) {
      id
      species
    }
  }
`;

export const UPDATE_NAME = gql`
  mutation UpdateCharacter($name: String!) {
    name(name: $name) {
      id
      name
    }
  }
`;
