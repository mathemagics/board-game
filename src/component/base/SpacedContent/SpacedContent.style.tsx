import styled, {css} from 'styled-components';

interface ContainerProps {
  horizontal: boolean;
  center: boolean;
  ref: React.Ref<HTMLDivElement>;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: ${({horizontal}) => (horizontal ? 'row' : 'column')};
  align-items: ${({center}) => (center ? 'center' : 'stretch')};
  height: 100%;
  width: 100%;
`;

interface ChildElementProps {
  grow: boolean;
  header: number;
  horizontal: boolean;
  isHeader: boolean;
  isTrailer: boolean;
  space: number;
  trailer: number;
}

export const ChildElement = styled.div<ChildElementProps>`
  ${({isHeader, isTrailer, grow, header, trailer, space, horizontal}) => {
    const before = isHeader ? header : space / 2;
    const after = isTrailer ? trailer : space / 2;
    return horizontal
      ? css`
          ${grow && 'flex-grow: 1'};
          padding-left: ${before * 8}px;
          padding-right: ${after * 8}px;
        `
      : css`
          ${grow && 'flex-grow: 1'};
          padding-top: ${before * 8}px;
          padding-bottom: ${after * 8}px;
        `;
  }};
`;
