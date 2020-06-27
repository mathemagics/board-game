import styled from 'styled-components';

// TODO Dedupe this with CardGroup
export const Container = styled.div`
  align-items: center;
  display: flex;
  height: ${({theme}) => theme.sizes.cardSize};
`;

export const Cards = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row wrap;
  margin-left: 8px;
`;
