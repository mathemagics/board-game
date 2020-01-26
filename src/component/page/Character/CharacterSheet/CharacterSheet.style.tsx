import styled from 'styled-components';

export const StatsContainer = styled.div`
  display: flex;
  align-items: center;

  & > :not(:first-child) {
    margin-left: 32px;
  }
`;

export const TracksContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 24px;

  & > :not(:first-child) {
    margin-top: 16px;
  }
`;

export const Name = styled.div`
  font-size: ${({theme}) => theme.fontSizes.xxLarge};
  margin-bottom: 16px;
  text-align: center;
`;

export const Header = styled.div`
  display: flex;
`;
