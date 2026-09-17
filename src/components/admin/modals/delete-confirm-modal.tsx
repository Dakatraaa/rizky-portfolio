'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, X } from 'lucide-react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  itemName?: string;
  description?: string;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  itemName,
  description = 'This action cannot be undone. The item will be permanently removed from your content catalogue.',
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-carbon/60 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <Card
        elevation={3}
        className="w-full max-w-md bg-white border-2 border-carbon overflow-hidden"
      >
        <div className="p-4 bg-red-500 text-white flex items-center justify-between border-b-2 border-carbon">
          <div className="flex items-center gap-2 font-display font-black text-sm uppercase">
            <AlertTriangle className="w-4 h-4" />
            <span>{title}</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1 hover:bg-white/20 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-3 font-mono text-xs">
          {itemName && (
            <div className="p-3 bg-paper-technical border border-carbon font-bold text-carbon text-sm">
              &quot;{itemName}&quot;
            </div>
          )}
          <p className="text-carbon-muted leading-relaxed">{description}</p>
        </div>

        <div className="p-4 bg-paper border-t-2 border-carbon flex items-center justify-end gap-2">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-red-600 text-white hover:bg-red-700 border-carbon font-bold"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Confirm Delete
          </Button>
        </div>
      </Card>
    </div>
  );
};
