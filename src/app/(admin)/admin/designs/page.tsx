'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { DesignModal } from '@/components/admin/modals/design-modal';
import { DeleteConfirmModal } from '@/components/admin/modals/delete-confirm-modal';
import { EmptyState } from '@/components/ui/feedback-state';
import { usePortfolioContent } from '@/context/content-context';
import { Design } from '@/types';
import { Plus, Edit, Trash2, Eye, Star, CheckCircle } from 'lucide-react';

export default function AdminDesignsPage() {
  const {
    designs,
    addDesign,
    updateDesign,
    deleteDesign,
    toggleDesignPublish,
    toggleDesignFeatured,
  } = usePortfolioContent();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDesign, setEditingDesign] = useState<Design | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [designToDelete, setDesignToDelete] = useState<Design | null>(null);

  const handleOpenAdd = () => {
    setEditingDesign(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (design: Design) => {
    setEditingDesign(design);
    setIsModalOpen(true);
  };

  const handleSave = (data: Partial<Design>) => {
    if (editingDesign) {
      updateDesign(editingDesign.id, data);
    } else {
      addDesign(data as Omit<Design, 'id' | 'updatedAt'>);
    }
  };

  const handleOpenDelete = (design: Design) => {
    setDesignToDelete(design);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (designToDelete) {
      deleteDesign(designToDelete.id);
      setDesignToDelete(null);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <AdminPageHeader
        title="Design Portfolio Vault"
        description="Curate Risograph posters, technical apparel kits, and brand packaging with live store updates."
        actionButton={
          <Button
            onClick={handleOpenAdd}
            variant="yellow"
            size="sm"
            className="gap-1.5 font-mono"
          >
            <Plus className="w-3.5 h-3.5" /> New Design Work
          </Button>
        }
      />

      {designs.length === 0 ? (
        <EmptyState
          title="No design artifacts in vault"
          description="Click the button above to curate your first design work."
          actionLabel="Add Design"
          onAction={handleOpenAdd}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {designs.map((des) => (
            <Card
              key={des.id}
              elevation={1}
              className={`p-4 bg-white flex flex-col justify-between transition-all ${
                !des.published ? 'border-dashed opacity-80' : ''
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Badge variant="orange">{des.category}</Badge>
                    {des.featured && (
                      <Badge variant="yellow" pill>
                        ★ FEATURED
                      </Badge>
                    )}
                    {!des.published && (
                      <Badge variant="default" pill>
                        ✎ DRAFT
                      </Badge>
                    )}
                  </div>
                  <span className="font-mono text-xs text-carbon-muted">{des.year}</span>
                </div>
                <h3 className="font-display font-bold text-base text-carbon">{des.title}</h3>
                <p className="font-body text-xs text-carbon-muted line-clamp-2">{des.printMedium || des.description}</p>
              </div>

              <div className="pt-3 mt-3 border-t border-carbon/10 space-y-3">
                <div className="flex items-center justify-between text-[10px] font-mono text-carbon-muted">
                  <span>{des.dimensions}</span>
                  <span className="font-bold" style={{ color: des.accentColor || '#FF4D00' }}>
                    {des.accentColor || '#FF4D00'}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => toggleDesignFeatured(des.id)}
                      className={`px-2 py-0.5 border border-carbon font-mono text-[9px] font-bold ${
                        des.featured
                          ? 'bg-kalcer-yellow text-carbon'
                          : 'bg-white hover:bg-paper-technical text-carbon-muted'
                      }`}
                      title="Toggle Featured on Atelier"
                    >
                      <Star className="w-2.5 h-2.5 inline mr-1" />
                      Home
                    </button>

                    <button
                      onClick={() => toggleDesignPublish(des.id)}
                      className={`px-2 py-0.5 border border-carbon font-mono text-[9px] font-bold ${
                        des.published
                          ? 'bg-kalcer-emerald text-white'
                          : 'bg-neutral-200 text-carbon hover:bg-neutral-300'
                      }`}
                      title="Toggle Publish Status"
                    >
                      <CheckCircle className="w-2.5 h-2.5 inline mr-1" />
                      {des.published ? 'Live' : 'Draft'}
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Link
                      href={`/design/${des.slug}`}
                      target="_blank"
                      className="p-1.5 border border-carbon bg-white hover:bg-paper-technical"
                      title="View public design page"
                    >
                      <Eye className="w-3 h-3" />
                    </Link>
                    <button
                      onClick={() => handleOpenEdit(des)}
                      aria-label={`Edit ${des.title}`}
                      className="p-1.5 border border-carbon bg-white hover:bg-kalcer-yellow"
                      title="Edit artwork"
                    >
                      <Edit className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => handleOpenDelete(des)}
                      aria-label={`Delete ${des.title}`}
                      className="p-1.5 border border-carbon bg-white hover:bg-red-500 hover:text-white"
                      title="Delete artwork"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Editor Modal */}
      <DesignModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={editingDesign}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Artwork Item"
        itemName={designToDelete?.title}
      />
    </div>
  );
}


