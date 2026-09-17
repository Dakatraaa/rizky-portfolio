'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { SkillModal } from '@/components/admin/modals/skill-modal';
import { DeleteConfirmModal } from '@/components/admin/modals/delete-confirm-modal';
import { EmptyState } from '@/components/ui/feedback-state';
import { usePortfolioContent } from '@/context/content-context';
import { Skill } from '@/types';
import { Plus, Edit, Trash2, Cpu } from 'lucide-react';

export default function AdminSkillsPage() {
  const { skills, addSkill, updateSkill, deleteSkill } = usePortfolioContent();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [skillToDelete, setSkillToDelete] = useState<Skill | null>(null);

  const handleOpenAdd = () => {
    setEditingSkill(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (skill: Skill) => {
    setEditingSkill(skill);
    setIsModalOpen(true);
  };

  const handleSave = (data: Partial<Skill>) => {
    if (editingSkill) {
      updateSkill(editingSkill.id, data);
    } else {
      addSkill(data as Omit<Skill, 'id'>);
    }
  };

  const handleOpenDelete = (skill: Skill) => {
    setSkillToDelete(skill);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (skillToDelete) {
      deleteSkill(skillToDelete.id);
      setSkillToDelete(null);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <AdminPageHeader
        title="Hardware Rigs & Stack Matrix"
        description="Curate programming languages, web systems, database infrastructure, and atelier instruments with live store sync."
        actionButton={
          <Button
            onClick={handleOpenAdd}
            variant="primary"
            size="sm"
            className="gap-1.5 font-mono"
          >
            <Plus className="w-3.5 h-3.5" /> Add Stack
          </Button>
        }
      />

      {skills.length === 0 ? (
        <EmptyState
          title="No technology stacks recorded"
          description="Click the button above to add your first technical skill or tool."
          actionLabel="Add Stack"
          onAction={handleOpenAdd}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((skill) => (
            <Card
              key={skill.id}
              elevation={1}
              className="p-4 bg-white flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold text-carbon-muted uppercase">
                    {skill.category}
                  </span>
                  <Badge variant="lime">SCORE: {skill.benchmarkScore}</Badge>
                </div>
                <h3 className="font-display font-bold text-base text-carbon mt-1">
                  {skill.name}
                </h3>
                <p className="font-body text-xs text-carbon-muted mt-1">
                  {skill.description}
                </p>
                <div className="mt-2 font-mono text-[10px] text-kalcer-cobalt font-bold">
                  {skill.proficiencyLevel}
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-carbon/10 flex items-center justify-between font-mono text-xs">
                <span className="text-kalcer-orange font-bold">
                  {skill.activeReposCount}+ Repos
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(skill)}
                    aria-label={`Edit ${skill.name}`}
                    className="p-1.5 border border-carbon bg-white hover:bg-kalcer-yellow"
                    title="Edit skill"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleOpenDelete(skill)}
                    aria-label={`Delete ${skill.name}`}
                    className="p-1.5 border border-carbon bg-white hover:bg-red-500 hover:text-white"
                    title="Delete skill"
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
      <SkillModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={editingSkill}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Technology Stack"
        itemName={skillToDelete?.name}
      />
    </div>
  );
}


