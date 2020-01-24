import gql from 'graphql-tag';

export const UPDATE_SPECIES = gql`
  mutation UpdateCharacter($id: String!, $species: String!) {
    updateCharacter(id: $id, input: {species: $species}) {
      character {
        id
        species
      }
    }
  }
`;

export const UPDATE_NAME = gql`
   mutation UpdateCharacter($id: String!, $name: String!) {
    updateCharacter(id: $id, input: {name: $name}) {
      character {
        id
        name
      }
    }
  }
`;

// TODO: Add IDs
export const UPDATE_PLAYBOOK = gql`
   mutation UpdateCharacter($id: String!, $playbook : String!) {
    updateCharacter(id: $id, input: {playbookId: $playbook}) {
      character {
        id
        playbook {
          name
        }
      }
    }
  }
`;

export const CREATE_CHARACTER = gql`
  mutation CreateCharacter {
    createCharacter {
      id
    }
  }
  `;
