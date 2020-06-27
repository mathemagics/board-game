import styled from 'styled-components';

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

  & > *:not(:first-child) {
    margin-left: 2px;
  }
`;
