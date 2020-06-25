import styled from 'styled-components';

export const Info = styled.span`
  padding: 8px;

  &:not(first-child) {
    margin-left: 16px;
  }
`;

export const Container = styled.div`
  width: 600px;
  height: 42px;
  display: flex;
  align-items: center;
`;

export const Pool = styled.div`
  & > *:not(first-child) {
    margin-left: 4px;
  }
`;
