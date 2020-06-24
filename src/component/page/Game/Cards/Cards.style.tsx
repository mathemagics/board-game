import styled from "styled-components";

export const Container = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Button = styled.button`
  padding: 4px;
  border: 1px solid black;
  border-radius: 3px;
`;

export const Controls = styled.div`
  display: flex;
  padding: 20px;

  & > *:not(first-child) {
    margin-right: 8px;
  }
`;

export const Hand = styled.div`
  display: flex;
  flex-flow: row wrap;
  & > *:not(first-child) {
    margin-left: 2px;
  }
`;

export const Info = styled.span`
  padding: 8px;

  &:first-child {
    margin-right: 8px;
  }
`;

export const InfoBar = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
`;
