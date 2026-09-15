import React from 'react';
import { cn } from '@/lib/utils';
import { AlertTriangle, CheckCircle2, Clock, Inbox, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No items found',
  description = 'No records have been compiled for this taxonomy yet.',
  actionLabel,
  onAction,
  className,
}) => {
  return (
    <div
      className={cn(
        'p-8 text-center bg-white border-2 border-carbon brutal-shadow-sm flex flex-col items-center justify-center space-y-3',
        className
      )}
    >
      <div className="w-12 h-12 bg-paper-technical border-2 border-carbon flex items-center justify-center text-carbon">
        <Inbox className="w-6 h-6 text-carbon-muted" />
      </div>
      <div className="space-y-1">
        <h4 className="font-display font-bold text-base text-carbon">{title}</h4>
        <p className="font-mono text-xs text-carbon-muted max-w-sm">{description}</p>
      </div>
      {actionLabel && onAction && (
        <Button variant="secondary" size="sm" onClick={onAction} className="font-mono text-xs mt-2">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export interface LoadingStateProps {
  message?: string;
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'INGESTING TELEMETRY PACKETS...',
  className,
}) => {
  return (
    <div
      className={cn(
        'p-8 text-center bg-paper-technical border-2 border-carbon flex flex-col items-center justify-center space-y-3',
        className
      )}
    >
      <div className="w-10 h-10 border-2.5 border-carbon bg-kalcer-yellow flex items-center justify-center animate-spin">
        <Loader2 className="w-5 h-5 text-carbon" />
      </div>
      <span className="font-mono text-xs font-bold text-carbon tracking-wider animate-pulse">
        {message}
      </span>
    </div>
  );
};

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'SIGNAL TRANSMISSION FAILURE',
  message = 'An unexpected error occurred while parsing telemetry packets.',
  onRetry,
  className,
}) => {
  return (
    <div
      className={cn(
        'p-6 bg-red-50 border-2 border-red-600 brutal-shadow-sm flex items-start gap-4 text-left',
        className
      )}
    >
      <div className="p-2 bg-red-600 text-white font-bold shrink-0">
        <AlertTriangle className="w-5 h-5" />
      </div>
      <div className="space-y-1 flex-1">
        <h4 className="font-display font-bold text-sm text-red-900 uppercase">{title}</h4>
        <p className="font-mono text-xs text-red-700">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-2 px-3 py-1 bg-white border border-red-600 font-mono text-xs font-bold text-red-700 hover:bg-red-100 transition-colors"
          >
            RETRY TRANSMISSION
          </button>
        )}
      </div>
    </div>
  );
};
