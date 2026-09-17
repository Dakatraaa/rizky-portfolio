'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { ExperienceModal } from '@/components/admin/modals/experience-modal';
import { DeleteConfirmModal } from '@/components/admin/modals/delete-confirm-modal';
import { EmptyState } from '@/components/ui/feedback-state';
import { usePortfolioContent } from '@/context/content-context';
import { Experience } from '@/types';
import { Plus, Edit, Trash2 } from 'lucide-react';

export default function AdminExperiencePage() {
  const { experiences, addExperience, updateExperience, deleteExperience } = usePortfolioContent();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState<Experience | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [expToDelete, setExpToDelete] = useState<Experience | null>(null);

  const handleOpenAdd = () => {
    setEditingExp(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (exp: Experience) => {
    setEditingExp(exp);
    setIsModalOpen(true);
  };

  const handleSave = (data: Partial<Experience>) => {
    if (editingExp) {
      updateExperience(editingExp.id, data);
    } else {
      addExperience(data as Omit<Experience, 'id'>);
    }
  };

  const handleOpenDelete = (exp: Experience) => {
    setExpToDelete(exp);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (expToDelete) {
      deleteExperience(expToDelete.id);
      setExpToDelete(null);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <AdminPageHeader
        title="Experience & Education"
        description="Manage career history, academic milestones, and apprentice workshops with live store sync."
        actionButton={
          <Button
            onClick={handleOpenAdd}
            variant="secondary"
            size="sm"
            className="gap-1.5 font-mono"
          >
            <Plus className="w-3.5 h-3.5" /> Add Experience
          </Button>
        }
      />

      {experiences.length === 0 ? (
        <EmptyState
          title="No career milestones recorded"
          description="Click the button above to add your first work or education experience."
          actionLabel="Add Experience"
          onAction={handleOpenAdd}
        />
      ) : (
        <div className="space-y-4">
          {experiences.map((exp) => (
            <Card key={exp.id} elevation={1} className="p-4 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant={exp.isCurrent ? 'emerald' : 'default'}>
                    {exp.type}
                  </Badge>
                  <span className="font-mono text-xs text-carbon-muted">
                    {exp.startDate} – {exp.endDate}
                  </span>
                  {exp.isCurrent && (
                    <span className="px-1.5 py-0.2 bg-kalcer-emerald/20 text-kalcer-emerald text-[10px] font-mono font-bold">
                      CURRENT
                    </span>
                  )}
                </div>
                <h3 className="font-display font-bold text-lg text-carbon mt-1">{exp.role}</h3>
                <p className="font-mono text-xs text-kalcer-cobalt font-bold">
                  {exp.organization} // {exp.location}
                </p>
                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="mt-2 space-y-0.5 text-xs font-body text-carbon-muted list-disc list-inside">
                    {exp.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(exp)}
                  aria-label={`Edit ${exp.role}`}
                  className="p-1.5 border border-carbon bg-white hover:bg-kalcer-yellow brutal-press"
                  title="Edit milestone"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleOpenDelete(exp)}
                  aria-label={`Delete ${exp.role}`}
                  className="p-1.5 border border-carbon bg-white hover:bg-red-500 hover:text-white brutal-press"
                  title="Delete milestone"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Editor Modal */}
      <ExperienceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={editingExp}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Experience Milestone"
        itemName={`${expToDelete?.role} @ ${expToDelete?.organization}`}
      />
    </div>
  );
}


