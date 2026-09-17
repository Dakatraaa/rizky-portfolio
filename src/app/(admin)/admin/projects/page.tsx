'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { ProjectModal } from '@/components/admin/modals/project-modal';
import { DeleteConfirmModal } from '@/components/admin/modals/delete-confirm-modal';
import { EmptyState } from '@/components/ui/feedback-state';
import { usePortfolioContent } from '@/context/content-context';
import { Project } from '@/types';
import { Plus, Edit, Trash2, Eye, Star, CheckCircle } from 'lucide-react';

export default function AdminProjectsPage() {
  const {
    projects,
    addProject,
    updateProject,
    deleteProject,
    toggleProjectPublish,
    toggleProjectFeatured,
  } = usePortfolioContent();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

  const handleOpenAdd = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project: Project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleSave = (data: Partial<Project>) => {
    if (editingProject) {
      updateProject(editingProject.id, data);
    } else {
      addProject(data as Omit<Project, 'id' | 'updatedAt'>);
    }
  };

  const handleOpenDelete = (project: Project) => {
    setProjectToDelete(project);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (projectToDelete) {
      deleteProject(projectToDelete.id);
      setProjectToDelete(null);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <AdminPageHeader
        title="Projects Management"
        description="Manage lab case studies, flagship rigs, and systems implementations with live synchronization."
        actionButton={
          <Button
            onClick={handleOpenAdd}
            variant="primary"
            size="sm"
            className="gap-1.5 font-mono"
          >
            <Plus className="w-3.5 h-3.5" /> Add Project
          </Button>
        }
      />

      {projects.length === 0 ? (
        <EmptyState
          title="No projects in repository"
          description="Click the button above to add your first computational rig."
          actionLabel="Add Project"
          onAction={handleOpenAdd}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((proj) => (
            <Card
              key={proj.id}
              elevation={1}
              className={`p-4 bg-white flex flex-col justify-between transition-all ${
                proj.status === 'DRAFT' ? 'border-dashed opacity-80' : ''
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    {proj.status === 'FEATURED' && (
                      <Badge variant="yellow" pill>
                        ★ FEATURED
                      </Badge>
                    )}
                    {proj.status === 'PUBLISHED' && (
                      <Badge variant="emerald" pill>
                        ✓ PUBLISHED
                      </Badge>
                    )}
                    {proj.status === 'DRAFT' && (
                      <Badge variant="default" pill>
                        ✎ DRAFT
                      </Badge>
                    )}
                    <span className="px-1.5 py-0.5 bg-paper-technical border border-carbon text-[9px] font-mono font-bold">
                      {proj.categoryTag || 'RIG'}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-carbon-muted">
                    {proj.updatedAt}
                  </span>
                </div>

                <h3 className="font-display font-bold text-lg text-carbon">
                  {proj.title}
                </h3>
                <p className="font-body text-xs text-carbon-muted line-clamp-2">
                  {proj.headline || proj.description}
                </p>

                <div className="flex flex-wrap gap-1 pt-1">
                  {proj.techStack?.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-paper-technical border border-carbon text-[10px] font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-carbon/10 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleProjectFeatured(proj.id)}
                    className={`px-2 py-1 border border-carbon font-mono text-[10px] font-bold transition-colors ${
                      proj.status === 'FEATURED'
                        ? 'bg-kalcer-yellow text-carbon'
                        : 'bg-white hover:bg-paper-technical text-carbon-muted'
                    }`}
                    title="Toggle Featured Status"
                  >
                    <Star className="w-3 h-3 inline mr-1" />
                    Feature
                  </button>

                  <button
                    onClick={() => toggleProjectPublish(proj.id)}
                    className={`px-2 py-1 border border-carbon font-mono text-[10px] font-bold transition-colors ${
                      proj.status !== 'DRAFT'
                        ? 'bg-kalcer-emerald text-white'
                        : 'bg-neutral-200 text-carbon hover:bg-neutral-300'
                    }`}
                    title="Toggle Publish / Draft"
                  >
                    <CheckCircle className="w-3 h-3 inline mr-1" />
                    {proj.status === 'DRAFT' ? 'Draft' : 'Live'}
                  </button>
                </div>

                <div className="flex items-center gap-1.5">
                  <Link
                    href={`/projects/${proj.slug}`}
                    target="_blank"
                    className="p-1.5 border border-carbon bg-white hover:bg-paper-technical text-carbon"
                    title="View public case study"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </Link>
                  <button
                    onClick={() => handleOpenEdit(proj)}
                    aria-label={`Edit ${proj.title}`}
                    className="p-1.5 border border-carbon bg-white hover:bg-kalcer-yellow brutal-press"
                    title="Edit project"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleOpenDelete(proj)}
                    aria-label={`Delete ${proj.title}`}
                    className="p-1.5 border border-carbon bg-white hover:bg-red-500 hover:text-white brutal-press"
                    title="Delete project"
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
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={editingProject}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Project Rig"
        itemName={projectToDelete?.title}
      />
    </div>
  );
}

