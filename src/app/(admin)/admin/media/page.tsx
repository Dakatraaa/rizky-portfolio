'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { DeleteConfirmModal } from '@/components/admin/modals/delete-confirm-modal';
import { EmptyState } from '@/components/ui/feedback-state';
import { usePortfolioContent } from '@/context/content-context';
import { MediaAsset } from '@/types';
import { Upload, Trash2, Eye, Plus } from 'lucide-react';

export default function AdminMediaPage() {
  const { mediaAssets, addMediaAsset, deleteMediaAsset } = usePortfolioContent();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [assetToDelete, setAssetToDelete] = useState<MediaAsset | null>(null);

  const handleQuickUpload = () => {
    const categories: MediaAsset['category'][] = ['PROJECT', 'DESIGN', 'ACTIVITY', 'MASCOT'];
    const randomCat = categories[Math.floor(Math.random() * categories.length)];
    addMediaAsset({
      name: `Asset_${randomCat}_${Date.now().toString().slice(-4)}.png`,
      filename: `asset-${Date.now().toString().slice(-4)}.png`,
      category: randomCat,
      sizeKb: Math.floor(Math.random() * 200) + 40,
      dimensions: '1200 × 800 px',
      url: '/mascot/mascot-master.png',
    });
  };

  const handleOpenDelete = (asset: MediaAsset) => {
    setAssetToDelete(asset);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (assetToDelete) {
      deleteMediaAsset(assetToDelete.id);
      setAssetToDelete(null);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <AdminPageHeader
        title="Media Library & Vault"
        description={`${mediaAssets.length} assets stored · Mock blob storage sync active (${(
          mediaAssets.reduce((acc, m) => acc + m.sizeKb, 0) / 1024
        ).toFixed(2)} MB / 50 MB)`}
        actionButton={
          <Button
            onClick={handleQuickUpload}
            variant="primary"
            size="sm"
            className="gap-1.5 font-mono"
          >
            <Upload className="w-3.5 h-3.5" /> Upload File
          </Button>
        }
      />

      {mediaAssets.length === 0 ? (
        <EmptyState
          title="No media assets in vault"
          description="Click the button above to upload graphic posters, screenshots or telemetry charts."
          actionLabel="Upload Asset"
          onAction={handleQuickUpload}
        />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {mediaAssets.map((asset) => (
            <Card key={asset.id} elevation={1} className="p-3 bg-white flex flex-col justify-between">
              <div className="relative w-full aspect-square bg-paper-technical border border-carbon overflow-hidden">
                <Image
                  src={asset.url}
                  alt={asset.name}
                  fill
                  className="object-contain p-2 pixelated"
                />
                <span className="absolute top-1.5 left-1.5 bg-carbon text-white font-mono text-[9px] px-1 py-0.2">
                  {asset.sizeKb} KB
                </span>
                <span className="absolute top-1.5 right-1.5 bg-kalcer-orange text-white font-mono text-[8px] px-1 py-0.2 font-bold">
                  {asset.category}
                </span>
              </div>

              <div className="pt-2">
                <div className="font-mono text-xs font-bold text-carbon truncate">{asset.name}</div>
                <div className="font-mono text-[10px] text-carbon-muted">{asset.dimensions}</div>
              </div>

              <div className="pt-2 mt-2 border-t border-carbon/10 flex items-center justify-between">
                <span className="font-mono text-[9px] text-kalcer-emerald font-bold">ACTIVE</span>
                <div className="flex items-center gap-1">
                  <a
                    href={asset.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 border border-carbon hover:bg-neutral-100"
                    title="Preview full image"
                  >
                    <Eye className="w-3 h-3" />
                  </a>
                  <button
                    onClick={() => handleOpenDelete(asset)}
                    className="p-1 border border-carbon hover:bg-red-500 hover:text-white"
                    title="Delete asset"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Media Asset"
        itemName={assetToDelete?.name}
      />
    </div>
  );
}

