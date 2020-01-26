import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Name = styled.div`
  text-align: center;
  margin-bottom: 4px;
  font-size: ${({theme}) => theme.fontSizes.large};
`;

export const BoxContainer = styled.div`
  display: flex;

   & > :not(:first-child) {
    margin-left: 8px;
  }
`;

export const Box = styled.span`
  height: 28px;
  width: 36px;
  border: 2px solid ${({theme}) => theme.colors.black};
  border-radius: 8px;
`;
