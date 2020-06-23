import styled from "styled-components";

// TODO: set up breakpoints and this page size
export const Container = styled.div`
  margin: ${({ theme }) => theme.sizes.headerHeight} auto 0;
  width: 1124px;
`;
