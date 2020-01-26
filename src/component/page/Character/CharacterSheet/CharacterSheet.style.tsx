import styled from 'styled-components';

export const StatsContainer = styled.div`
  display: flex;

  & > :not(:first-child) {
    margin-left: 32px;
  }
`;

export const TracksContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
