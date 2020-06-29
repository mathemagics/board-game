import styled, {css} from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: ${({horizontal}) => (horizontal ? 'row' : 'column')};
  align-items: stretch;
  height: 100%;
  width: 100%;
`;

export const ChildElement = styled.div`
  ${({isHeader, isTrailer, header, trailer, space, horizontal}) => {
    const before = isHeader ? header : space / 2;
    const after = isTrailer ? trailer : space / 2;
    return horizontal
      ? css`
          padding-left: ${before * 8}px;
          padding-right: ${after * 8}px;
        `
      : css`
          padding-top: ${before * 8}px;
          padding-bottom: ${after * 8}px;
        `;
  }};
`;
