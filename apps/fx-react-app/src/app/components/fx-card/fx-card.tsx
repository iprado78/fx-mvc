import React, { ReactNode } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

interface FxCardProps {
  children: ReactNode;
  title: string;
  subtitle?: ReactNode;
}

export const FxCard = ({ children, title, subtitle }: FxCardProps) => (
  <Card>
    <CardHeader title={title} subheader={subtitle}></CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);
