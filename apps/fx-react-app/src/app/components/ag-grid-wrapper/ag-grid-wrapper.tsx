import React from 'react';
import { AgGridReact, AgGridReactProps } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { FxCard } from '../fx-card/fx-card';

interface AgGridWrapperProps extends AgGridReactProps {
  title?: string;
}
export const AgGridWrapper = ({ title, ...rest }: AgGridWrapperProps) => {
  return (
    <FxCard title={title}>
      <div
        className="ag-theme-balham"
        style={{ height: '600px', maxWidth: '1400px', width: '100%' }}
      >
        <AgGridReact {...rest} />
      </div>
    </FxCard>
  );
};
