import styled from 'styled-components';

export const Container = styled.button`
  border: 1px solid black;
  border-radius: 2px;
  height: ${({theme}) => theme.sizes.cardSize};
  width: ${({theme}) => theme.sizes.cardSize};
`;
