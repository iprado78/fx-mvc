import React from "react";

import { Grid } from "@material-ui/core";

interface TabColProps {
  top: JSX.Element;
  bottom: JSX.Element;
}

export const TabCol = ({ top, bottom }: TabColProps) => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        {top}
      </Grid>
      <Grid item xs={12}>
        {bottom}
      </Grid>
    </Grid>
  );
};
