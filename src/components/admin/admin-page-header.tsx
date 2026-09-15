import React from 'react';

export interface AdminPageHeaderProps {
  title: string;
  description: string;
  actionButton?: React.ReactNode;
}

export const AdminPageHeader: React.FC<AdminPageHeaderProps> = ({
  title,
  description,
  actionButton,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2.5 border-carbon">
      <div>
        <h1 className="font-display font-black text-2xl sm:text-3xl uppercase text-carbon tracking-tight">
          {title}
        </h1>
        <p className="font-mono text-xs text-carbon-muted mt-0.5">
          {description}
        </p>
      </div>
      {actionButton && <div>{actionButton}</div>}
    </div>
  );
};
