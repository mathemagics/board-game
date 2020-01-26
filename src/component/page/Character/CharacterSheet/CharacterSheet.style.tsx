import styled from 'styled-components';

export const StatsContainer = styled.div`
  display: flex;
  align-items: center;

  & > :not(:first-child) {
    margin-left: 46px;
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
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const SectionRow = styled.div`
  display: flex;

  & > :first-child {
    flex: 3;
    margin-right: 16px;
  }

  & > :last-child {
    flex: 1;
  }
`;

export const WideColumn = styled.div`
  flex: 3;
`;

export const NarrowColumn = styled.div`
  flex: 1;
`;
