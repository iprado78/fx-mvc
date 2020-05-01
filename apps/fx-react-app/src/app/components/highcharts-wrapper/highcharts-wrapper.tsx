import React from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { FxCard } from '../fx-card/fx-card';

export interface HighchartsWrapperProps {
  title?: string;
  options: Highcharts.Options;
}
export const HighchartsWrapper = ({
  title,
  options
}: HighchartsWrapperProps) => {
  return (
    <FxCard title={title}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </FxCard>
  );
};
