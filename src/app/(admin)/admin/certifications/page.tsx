'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { CertificationModal } from '@/components/admin/modals/certification-modal';
import { DeleteConfirmModal } from '@/components/admin/modals/delete-confirm-modal';
import { EmptyState } from '@/components/ui/feedback-state';
import { usePortfolioContent } from '@/context/content-context';
import { Certification } from '@/types';
import { Plus, Edit, Trash2, ExternalLink, Star, CheckCircle } from 'lucide-react';

export default function AdminCertificationsPage() {
  const {
    certifications,
    addCertification,
    updateCertification,
    deleteCertification,
    toggleCertPublish,
  } = usePortfolioContent();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState<Certification | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [certToDelete, setCertToDelete] = useState<Certification | null>(null);

  const handleOpenAdd = () => {
    setEditingCert(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cert: Certification) => {
    setEditingCert(cert);
    setIsModalOpen(true);
  };

  const handleSave = (data: Partial<Certification>) => {
    if (editingCert) {
      updateCertification(editingCert.id, data);
    } else {
      addCertification(data as Omit<Certification, 'id'>);
    }
  };

  const handleOpenDelete = (cert: Certification) => {
    setCertToDelete(cert);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (certToDelete) {
      deleteCertification(certToDelete.id);
      setCertToDelete(null);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <AdminPageHeader
        title="Certifications & Credentials"
        description="Manage industry certifications, olympiad awards, and cryptographic verification IDs with live store sync."
        actionButton={
          <Button
            onClick={handleOpenAdd}
            variant="yellow"
            size="sm"
            className="gap-1.5 font-mono"
          >
            <Plus className="w-3.5 h-3.5" /> Add Credential
          </Button>
        }
      />

      {certifications.length === 0 ? (
        <EmptyState
          title="No credentials on record"
          description="Click the button above to register your first verified certification."
          actionLabel="Add Credential"
          onAction={handleOpenAdd}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certifications.map((cert) => (
            <Card
              key={cert.id}
              elevation={1}
              className={`p-4 bg-white flex flex-col justify-between transition-all ${
                !cert.published ? 'border-dashed opacity-80' : ''
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Badge variant="cobalt">{cert.category}</Badge>
                    {cert.isFeatured && (
                      <Badge variant="yellow" pill>
                        ★ FEATURED
                      </Badge>
                    )}
                    {!cert.published && (
                      <Badge variant="default" pill>
                        ✎ DRAFT
                      </Badge>
                    )}
                  </div>
                  <span className="font-mono text-xs text-carbon-muted">{cert.issueDate}</span>
                </div>
                <h3 className="font-display font-bold text-base text-carbon">{cert.title}</h3>
                <p className="font-mono text-xs text-carbon-muted">ISSUER: {cert.issuer}</p>
                {cert.description && (
                  <p className="font-body text-xs text-carbon-muted line-clamp-2">{cert.description}</p>
                )}
              </div>

              <div className="pt-3 mt-3 border-t border-carbon/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleCertPublish(cert.id)}
                    className={`px-2 py-0.5 border border-carbon font-mono text-[9px] font-bold ${
                      cert.published
                        ? 'bg-kalcer-emerald text-white'
                        : 'bg-neutral-200 text-carbon hover:bg-neutral-300'
                    }`}
                    title="Toggle Publish Status"
                  >
                    <CheckCircle className="w-2.5 h-2.5 inline mr-1" />
                    {cert.published ? 'Live' : 'Draft'}
                  </button>
                  <span className="font-mono text-[10px] text-carbon-muted truncate max-w-[120px]">
                    ID: {cert.credentialId}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  {(cert.verifyUrl || cert.verificationUrl) && (
                    <a
                      href={cert.verifyUrl || cert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 border border-carbon bg-white hover:bg-paper-technical"
                      title="Verify credential link"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <button
                    onClick={() => handleOpenEdit(cert)}
                    aria-label={`Edit ${cert.title}`}
                    className="p-1.5 border border-carbon bg-white hover:bg-kalcer-yellow"
                    title="Edit credential"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleOpenDelete(cert)}
                    aria-label={`Delete ${cert.title}`}
                    className="p-1.5 border border-carbon bg-white hover:bg-red-500 hover:text-white"
                    title="Delete credential"
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
      <CertificationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={editingCert}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Credential"
        itemName={certToDelete?.title}
      />
    </div>
  );
}


