'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { ContentModal } from '@/components/admin/modals/content-modal';
import { DeleteConfirmModal } from '@/components/admin/modals/delete-confirm-modal';
import { EmptyState } from '@/components/ui/feedback-state';
import { usePortfolioContent } from '@/context/content-context';
import { ContentItem } from '@/types';
import { Plus, Edit, Trash2, ExternalLink, CheckCircle } from 'lucide-react';

export default function AdminContentPage() {
  const {
    contentItems,
    addContentItem,
    updateContentItem,
    deleteContentItem,
    toggleContentPublish,
  } = usePortfolioContent();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<ContentItem | null>(null);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: ContentItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleSave = (data: Partial<ContentItem>) => {
    if (editingItem) {
      updateContentItem(editingItem.id, data);
    } else {
      addContentItem(data as Omit<ContentItem, 'id'>);
    }
  };

  const handleOpenDelete = (item: ContentItem) => {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      deleteContentItem(itemToDelete.id);
      setItemToDelete(null);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <AdminPageHeader
        title="Creator Dispatches"
        description="Manage YouTube devlogs, Substack essays, and video podcast drops with live synchronization."
        actionButton={
          <Button
            onClick={handleOpenAdd}
            variant="primary"
            size="sm"
            className="gap-1.5 font-mono"
          >
            <Plus className="w-3.5 h-3.5" /> New Episode
          </Button>
        }
      />

      {contentItems.length === 0 ? (
        <EmptyState
          title="No creator dispatches found"
          description="Click the button above to publish your first video, podcast or essay."
          actionLabel="Add Episode"
          onAction={handleOpenAdd}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contentItems.map((item) => (
            <Card
              key={item.id}
              elevation={1}
              className={`p-4 bg-white flex flex-col justify-between transition-all ${
                item.status === 'DRAFT' ? 'border-dashed opacity-80' : ''
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Badge variant={item.platform === 'YOUTUBE' ? 'orange' : 'yellow'}>
                      {item.platform}
                    </Badge>
                    <span className="font-mono text-[10px] text-carbon-muted">
                      {item.platformTag || item.category}
                    </span>
                    {item.status === 'DRAFT' && (
                      <Badge variant="default" pill>
                        ✎ DRAFT
                      </Badge>
                    )}
                  </div>
                  <span className="font-mono text-xs text-carbon-muted">{item.publishDate}</span>
                </div>
                <h3 className="font-display font-bold text-base text-carbon">{item.title}</h3>
                <p className="font-body text-xs text-carbon-muted line-clamp-2">{item.summary}</p>
              </div>

              <div className="pt-3 mt-3 border-t border-carbon/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleContentPublish(item.id)}
                    className={`px-2 py-0.5 border border-carbon font-mono text-[9px] font-bold ${
                      item.status !== 'DRAFT'
                        ? 'bg-kalcer-emerald text-white'
                        : 'bg-neutral-200 text-carbon hover:bg-neutral-300'
                    }`}
                    title="Toggle Publish Status"
                  >
                    <CheckCircle className="w-2.5 h-2.5 inline mr-1" />
                    {item.status === 'DRAFT' ? 'Draft' : 'Live'}
                  </button>
                  <span className="font-mono text-xs font-bold text-kalcer-cobalt">
                    {item.metricHighlight}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  {(item.url || item.externalUrl) && (
                    <a
                      href={item.url || item.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 border border-carbon bg-white hover:bg-paper-technical"
                      title="Open source dispatch link"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <button
                    onClick={() => handleOpenEdit(item)}
                    aria-label={`Edit ${item.title}`}
                    className="p-1.5 border border-carbon bg-white hover:bg-kalcer-yellow"
                    title="Edit dispatch"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleOpenDelete(item)}
                    aria-label={`Delete ${item.title}`}
                    className="p-1.5 border border-carbon bg-white hover:bg-red-500 hover:text-white"
                    title="Delete dispatch"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Editor Modal */}
      <ContentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={editingItem}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Content Dispatch"
        itemName={itemToDelete?.title}
      />
    </div>
  );
}


