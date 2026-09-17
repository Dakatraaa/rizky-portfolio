'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { ActivityModal } from '@/components/admin/modals/activity-modal';
import { DeleteConfirmModal } from '@/components/admin/modals/delete-confirm-modal';
import { EmptyState } from '@/components/ui/feedback-state';
import { usePortfolioContent } from '@/context/content-context';
import { Activity } from '@/types';
import { Plus, Edit, Trash2, Eye, CheckCircle } from 'lucide-react';

export default function AdminActivitiesPage() {
  const {
    activities,
    addActivity,
    updateActivity,
    deleteActivity,
    toggleActivityPublish,
  } = usePortfolioContent();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [activityToDelete, setActivityToDelete] = useState<Activity | null>(null);

  const handleOpenAdd = () => {
    setEditingActivity(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (activity: Activity) => {
    setEditingActivity(activity);
    setIsModalOpen(true);
  };

  const handleSave = (data: Partial<Activity>) => {
    if (editingActivity) {
      updateActivity(editingActivity.id, data);
    } else {
      addActivity(data as Omit<Activity, 'id' | 'updatedAt'>);
    }
  };

  const handleOpenDelete = (activity: Activity) => {
    setActivityToDelete(activity);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (activityToDelete) {
      deleteActivity(activityToDelete.id);
      setActivityToDelete(null);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <AdminPageHeader
        title="Field Ops & Scrapbook"
        description="Log marathon pacing runs, tech meetups, and printmaker workshops with live telemetry updates."
        actionButton={
          <Button
            onClick={handleOpenAdd}
            variant="secondary"
            size="sm"
            className="gap-1.5 font-mono"
          >
            <Plus className="w-3.5 h-3.5" /> Log Activity
          </Button>
        }
      />

      {activities.length === 0 ? (
        <EmptyState
          title="No field logs in scrapbook"
          description="Click the button above to log your first field activity dispatch."
          actionLabel="Log Activity"
          onAction={handleOpenAdd}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activities.map((act) => (
            <Card
              key={act.id}
              elevation={1}
              className={`p-4 bg-white flex flex-col justify-between transition-all ${
                act.status === 'DRAFT' ? 'border-dashed opacity-80' : ''
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Badge variant="lime">{act.category}</Badge>
                    {act.status === 'DRAFT' && (
                      <Badge variant="default" pill>
                        ✎ DRAFT
                      </Badge>
                    )}
                  </div>
                  <span className="font-mono text-xs text-carbon-muted">{act.date}</span>
                </div>
                <h3 className="font-display font-bold text-base text-carbon">{act.title}</h3>
                <p className="font-body text-xs text-carbon-muted line-clamp-2">{act.summary}</p>
                {act.telemetry && (
                  <div className="text-[10px] font-mono text-kalcer-orange font-bold pt-1">
                    {act.telemetry.distanceKm}KM // PACE: {act.telemetry.paceMinPerKm} // {act.telemetry.splitTime}
                  </div>
                )}
              </div>

              <div className="pt-3 mt-3 border-t border-carbon/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleActivityPublish(act.id)}
                    className={`px-2 py-0.5 border border-carbon font-mono text-[9px] font-bold ${
                      act.status !== 'DRAFT'
                        ? 'bg-kalcer-emerald text-white'
                        : 'bg-neutral-200 text-carbon hover:bg-neutral-300'
                    }`}
                    title="Toggle Publish Status"
                  >
                    <CheckCircle className="w-2.5 h-2.5 inline mr-1" />
                    {act.status === 'DRAFT' ? 'Draft' : 'Live'}
                  </button>
                  <span className="font-mono text-[10px] text-kalcer-cobalt font-bold truncate max-w-[100px]">
                    {act.location}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Link
                    href={`/activities/${act.slug}`}
                    target="_blank"
                    className="p-1.5 border border-carbon bg-white hover:bg-paper-technical"
                    title="View public dispatch page"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </Link>
                  <button
                    onClick={() => handleOpenEdit(act)}
                    aria-label={`Edit ${act.title}`}
                    className="p-1.5 border border-carbon bg-white hover:bg-kalcer-yellow"
                    title="Edit dispatch"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleOpenDelete(act)}
                    aria-label={`Delete ${act.title}`}
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
      <ActivityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={editingActivity}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Field Activity"
        itemName={activityToDelete?.title}
      />
    </div>
  );
}


