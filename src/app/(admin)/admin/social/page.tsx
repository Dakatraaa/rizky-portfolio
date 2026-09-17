'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { SocialModal } from '@/components/admin/modals/social-modal';
import { DeleteConfirmModal } from '@/components/admin/modals/delete-confirm-modal';
import { EmptyState } from '@/components/ui/feedback-state';
import { usePortfolioContent } from '@/context/content-context';
import { SocialLink } from '@/types';
import { Plus, Edit, Trash2, ExternalLink } from 'lucide-react';

export default function AdminSocialPage() {
  const { socialLinks, addSocialLink, updateSocialLink, deleteSocialLink } = usePortfolioContent();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSocial, setEditingSocial] = useState<SocialLink | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [socialToDelete, setSocialToDelete] = useState<SocialLink | null>(null);

  const handleOpenAdd = () => {
    setEditingSocial(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (social: SocialLink) => {
    setEditingSocial(social);
    setIsModalOpen(true);
  };

  const handleSave = (data: Partial<SocialLink>) => {
    if (editingSocial) {
      updateSocialLink(editingSocial.id, data);
    } else {
      addSocialLink(data as Omit<SocialLink, 'id'>);
    }
  };

  const handleOpenDelete = (social: SocialLink) => {
    setSocialToDelete(social);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (socialToDelete) {
      deleteSocialLink(socialToDelete.id);
      setSocialToDelete(null);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <AdminPageHeader
        title="Social Channels & Platforms"
        description="Manage links, follower counts, and public channels with live store sync."
        actionButton={
          <Button
            onClick={handleOpenAdd}
            variant="primary"
            size="sm"
            className="gap-1.5 font-mono"
          >
            <Plus className="w-3.5 h-3.5" /> Add Channel
          </Button>
        }
      />

      {socialLinks.length === 0 ? (
        <EmptyState
          title="No social channels configured"
          description="Click the button above to add your first social platform link."
          actionLabel="Add Channel"
          onAction={handleOpenAdd}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {socialLinks.map((soc) => (
            <Card key={soc.id} elevation={1} className="p-4 bg-white flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: soc.accentColor || '#0052FF' }}
                  />
                  <span className="font-display font-black text-base text-carbon">{soc.label}</span>
                </div>
                <div className="font-mono text-xs text-kalcer-cobalt font-semibold mt-0.5">{soc.handle}</div>
                <div className="font-mono text-[10px] text-carbon-muted mt-1">
                  {soc.metricLabel}: <span className="font-bold text-carbon">{soc.metricValue}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                {soc.url && (
                  <a
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 border border-carbon bg-white hover:bg-paper-technical"
                    title="Open link"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                <button
                  onClick={() => handleOpenEdit(soc)}
                  aria-label={`Edit ${soc.label}`}
                  className="p-1.5 border border-carbon bg-white hover:bg-kalcer-yellow"
                  title="Edit channel"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleOpenDelete(soc)}
                  aria-label={`Delete ${soc.label}`}
                  className="p-1.5 border border-carbon bg-white hover:bg-red-500 hover:text-white"
                  title="Delete channel"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Editor Modal */}
      <SocialModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={editingSocial}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Social Channel"
        itemName={socialToDelete?.label}
      />
    </div>
  );
}


