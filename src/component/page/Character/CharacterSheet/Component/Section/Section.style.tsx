import styled from 'styled-components';

export const HorizontalRule = styled.span`
  flex: 1;
  border-top: 2px solid ${({theme}) => theme.colors.black};
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
`;

export const Label = styled.div`
  margin: 0 8px;
  font-size: ${({theme}) => theme.fontSizes.large};
`;
