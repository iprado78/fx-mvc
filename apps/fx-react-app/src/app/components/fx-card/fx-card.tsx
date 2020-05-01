import React, { ReactNode } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

interface FxCardProps {
  children: ReactNode;
  title?: string;
  subtitle?: ReactNode;
  className?: string;
}

export const FxCard = ({
  children,
  title,
  subtitle,
  className
}: FxCardProps) => (
  <Card className={className}>
    {title || subtitle ? (
      <CardHeader title={title} subheader={subtitle}></CardHeader>
    ) : null}
    <CardContent>{children}</CardContent>
  </Card>
);
