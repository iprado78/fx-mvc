import React, { ReactNode } from 'react';

import styled from '@emotion/styled';

export interface ColProps {
  children?: ReactNode;
}

const StyledCol = styled.div`
  flex: 1;
  margin-right: 20px;
  &:last-child {
    margin-right: 0;
  }
`;

export const Col = ({ children }: ColProps) => (
  <StyledCol>{children}</StyledCol>
);
