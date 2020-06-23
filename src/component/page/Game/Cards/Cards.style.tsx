import styled from "styled-components";

export const Container = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
`;

export const Button = styled.button`
  padding: 4px;
  border: 1px solid black;
  border-radius: 3px;
`;

export const Controls = styled.div`
  display: flex;
  padding: 20px;
`;

export const Hand = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

export const Info = styled.span`
  padding: 8px;

  &:first-child {
    margin-right: 8px;
  }
`;
