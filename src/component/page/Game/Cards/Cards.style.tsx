import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Controls = styled.div`
  display: flex;
  padding: 20px;

  & > *:not(first-child) {
    margin-right: 8px;
  }
`;
