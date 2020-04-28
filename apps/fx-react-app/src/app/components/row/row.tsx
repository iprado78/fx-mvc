import React, { ReactNode } from 'react';

import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface RowProps {
  children: ReactNode;
}

const StyledRow = styled.section`
  display: flex;
  flex-direction: row;
  height: 60px;
`;

export const Row = ({ children }: RowProps) => (
  <StyledRow>{children}</StyledRow>
);
