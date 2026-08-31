"use client";

import {
  CenterMorphModal,
  CenterMorphModalContent,
  CenterMorphModalTrigger,
} from "@/components/motion/center-morph-modal";
import { Checkbox } from "@/components/motion/checkbox";
import { Table, type TableColumn } from "@/components/motion/table";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  RiAddLine,
  RiAlertLine,
  RiDeleteBinLine,
  RiFolderLine,
  RiPencilLine,
} from "@remixicon/react";
import type { Category } from "@rentora/types";
import Image from "next/image";
import React, { useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";

interface CategoryFormProps {
  defaultValues?: Partial<Category>;
  isActive: boolean;
  onIsActiveChange: (v: boolean) => void;
  error: string;
  loading: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  submitLabel: string;
}

function CategoryForm({
  defaultValues,
  isActive,
  onIsActiveChange,
  error,
  loading,
  onSubmit,
  onCancel,
  submitLabel,
}: CategoryFormProps) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col space-y-5">
      {error && (
        <div className="p-3 bg-rose-50 text-rose-600 text-sm rounded-lg font-medium">
          {error}
        </div>
      )}

      <div className="flex flex-col space-y-1.5">
        <label
          htmlFor="cat-name"
          className="text-sm font-semibold text-zinc-700"
        >
          Name *
        </label>
        <input
          required
          type="text"
          id="cat-name"
          name="name"
          defaultValue={defaultValues?.name}
          className="flex h-11 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
          placeholder="e.g. SUV"
        />
      </div>

      <div className="flex flex-col space-y-1.5">
        <label
          htmlFor="cat-description"
          className="text-sm font-semibold text-zinc-700"
        >
          Description
        </label>
        <textarea
          id="cat-description"
          name="description"
          rows={3}
          defaultValue={defaultValues?.description}
          className="flex w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 resize-none"
          placeholder="Spacious vehicles for families (optional)"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col space-y-1.5">
          <label
            htmlFor="cat-order"
            className="text-sm font-semibold text-zinc-700"
          >
            Order
          </label>
          <input
            type="number"
            min="0"
            id="cat-order"
            name="order"
            defaultValue={defaultValues?.order}
            className="flex h-11 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
            placeholder="e.g. 1"
          />
        </div>

        <div className="flex flex-col space-y-1.5">
          <label className="text-sm font-semibold text-zinc-700">Status</label>
          <div className="flex items-center h-11">
            <Checkbox
              checked={isActive}
              onCheckedChange={onIsActiveChange}
              label="Active"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-1.5">
        <label
          htmlFor="cat-image"
          className="text-sm font-semibold text-zinc-700"
        >
          Image {defaultValues ? "(leave blank to keep current)" : "(Optional)"}
        </label>
        <input
          type="file"
          id="cat-image"
          name="image"
          accept="image/*"
          className="flex h-11 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
        />
        {defaultValues?.image && (
          <div className="mt-1 flex items-center gap-2">
            <div className="h-8 w-8 relative rounded overflow-hidden bg-zinc-100 shrink-0">
              <Image
                src={defaultValues.image}
                alt="Current"
                fill
                className="object-cover"
              />
            </div>
            <span className="text-xs text-zinc-500">Current image</span>
          </div>
        )}
      </div>

      <div className="flex gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="flex-1 border-zinc-200 h-12 text-base"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          size="lg"
          disabled={loading}
          className="flex-1 bg-orange-600 hover:bg-orange-700 text-white h-12 text-base"
        >
          {loading ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}

interface RowActionsProps {
  row: Category;
  onEdit: (c: Category) => void;
  onDelete: (c: Category) => void;
}

function RowActions({ row, onEdit, onDelete }: RowActionsProps) {
  const [confirming, setConfirming] = useState(false);

  if (confirming) {
    return (
      <div className="flex items-center gap-1">
        <span className="text-xs text-rose-600 font-medium whitespace-nowrap">
          Delete?
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(row);
            setConfirming(false);
          }}
          className="inline-flex items-center justify-center h-7 px-2 rounded text-xs font-semibold bg-rose-600 text-white hover:bg-rose-700 transition-colors"
        >
          Yes
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setConfirming(false);
          }}
          className="inline-flex items-center justify-center h-7 px-2 rounded text-xs font-semibold bg-zinc-100 text-zinc-600 hover:bg-zinc-200 transition-colors"
        >
          No
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onEdit(row);
        }}
        className="inline-flex items-center justify-center h-8 w-8 rounded-full text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors"
        aria-label={`Edit ${row.name}`}
      >
        <RiPencilLine className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setConfirming(true);
        }}
        className="inline-flex items-center justify-center h-8 w-8 rounded-full text-zinc-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
        aria-label={`Delete ${row.name}`}
      >
        <RiDeleteBinLine className="h-4 w-4" />
      </button>
    </div>
  );
}

export default function CategoriesClientPage({
  initialData,
}: {
  initialData: Category[];
}) {
  const [categories, setCategories] = useState<Category[]>(
    Array.isArray(initialData) ? initialData : [],
  );

  const [createOpen, setCreateOpen] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState("");
  const [createIsActive, setCreateIsActive] = useState(true);

  const [editTarget, setEditTarget] = useState<Category | null>(null);
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState("");
  const [editIsActive, setEditIsActive] = useState(true);

  const [deleteError, setDeleteError] = useState("");

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCreateLoading(true);
    setCreateError("");

    const formData = new FormData(e.currentTarget);
    formData.set("isActive", String(createIsActive));

    try {
      const res = await fetch(`${API}/categories`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Failed to create category");
      const json = await res.json();
      const newCategory: Category = json.data ?? json;
      setCategories((prev) => [...prev, newCategory]);
      setCreateOpen(false);
      setCreateIsActive(true);
      (e.target as HTMLFormElement).reset();
    } catch (err: unknown) {
      setCreateError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setCreateLoading(false);
    }
  };

  const openEdit = (category: Category) => {
    setEditTarget(category);
    setEditIsActive(category.isActive);
    setEditError("");
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editTarget) return;
    setEditLoading(true);
    setEditError("");

    const formData = new FormData(e.currentTarget);
    formData.set("isActive", String(editIsActive));

    try {
      const res = await fetch(`${API}/categories/${editTarget.id}`, {
        method: "PATCH",
        body: formData,
      });
      if (!res.ok) throw new Error("Failed to update category");
      const json = await res.json();
      const updated: Category = json.data ?? json;
      setCategories((prev) =>
        prev.map((c) => (c.id === updated.id ? updated : c)),
      );
      setEditTarget(null);
    } catch (err: unknown) {
      setEditError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setEditLoading(false);
    }
  };

  const handleDelete = async (category: Category) => {
    setDeleteError("");
    try {
      const res = await fetch(`${API}/categories/${category.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete category");
      setCategories((prev) => prev.filter((c) => c.id !== category.id));
    } catch (err: unknown) {
      setDeleteError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const categoryColumns: TableColumn<Category>[] = [
    {
      key: "name",
      header: "Category",
      align: "left",
      cell: (row) => (
        <div className="flex items-center gap-3 py-2">
          {row.image ? (
            <div className="h-10 w-10 relative rounded-md overflow-hidden bg-zinc-100 shrink-0">
              <Image
                src={row.image}
                alt={row.name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="h-10 w-10 rounded-md bg-zinc-100 flex items-center justify-center shrink-0">
              <RiFolderLine className="h-5 w-5 text-zinc-400" />
            </div>
          )}
          <div className="flex flex-col">
            <span className="font-semibold text-zinc-900">{row.name}</span>
            {row.description && (
              <span className="text-xs text-zinc-500 truncate max-w-[260px]">
                {row.description}
              </span>
            )}
          </div>
        </div>
      ),
    },
    {
      key: "isActive",
      header: "Status",
      align: "center",
      width: "18%",
      cell: (row) => (
        <span
          className={cn(
            "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold",
            row.isActive
              ? "bg-emerald-100 text-emerald-700"
              : "bg-zinc-100 text-zinc-700",
          )}
        >
          {row.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
    { key: "order", header: "Order", align: "center", width: "12%" },
    {
      key: "id",
      header: "",
      align: "right",
      width: "14%",
      cell: (row) => (
        <RowActions row={row} onEdit={openEdit} onDelete={handleDelete} />
      ),
    },
  ];

  return (
    <div className="flex flex-col space-y-6 max-w-[1600px] mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">
            Categories
          </h1>
          <p className="text-sm text-zinc-500 font-medium mt-1">
            Manage vehicle categories.
          </p>
        </div>

        {}
        <CenterMorphModal open={createOpen} onOpenChange={setCreateOpen}>
          <CenterMorphModalTrigger>
            <Button className="bg-orange-600 hover:bg-orange-700 text-white gap-2">
              <RiAddLine className="h-4 w-4" />
              Add Category
            </Button>
          </CenterMorphModalTrigger>

          <CenterMorphModalContent
            ariaLabel="Create category"
            className="max-w-[38rem]"
          >
            <div className="p-8">
              <h2 className="text-xl font-bold text-zinc-900 mb-1">
                New Category
              </h2>
              <p className="text-sm text-zinc-500 mb-6">
                Add a new vehicle category to the system.
              </p>
              <CategoryForm
                isActive={createIsActive}
                onIsActiveChange={setCreateIsActive}
                error={createError}
                loading={createLoading}
                onSubmit={handleCreate}
                onCancel={() => setCreateOpen(false)}
                submitLabel="Create Category"
              />
            </div>
          </CenterMorphModalContent>
        </CenterMorphModal>
      </div>

      {}
      {deleteError && (
        <div className="flex items-center gap-2 p-3 bg-rose-50 text-rose-600 text-sm rounded-lg font-medium">
          <RiAlertLine className="h-4 w-4 shrink-0" />
          {deleteError}
          <button
            type="button"
            className="ml-auto text-rose-400 hover:text-rose-600"
            onClick={() => setDeleteError("")}
          >
            ✕
          </button>
        </div>
      )}

      {}
      <CenterMorphModal
        open={editTarget !== null}
        onOpenChange={(open) => {
          if (!open) setEditTarget(null);
        }}
      >
        <CenterMorphModalContent
          ariaLabel="Edit category"
          className="max-w-[38rem]"
        >
          <div className="p-8">
            <h2 className="text-xl font-bold text-zinc-900 mb-1">
              Edit Category
            </h2>
            <p className="text-sm text-zinc-500 mb-6">
              Update the details for{" "}
              <span className="font-semibold text-zinc-700">
                {editTarget?.name}
              </span>
              .
            </p>
            {editTarget && (
              <CategoryForm
                defaultValues={editTarget}
                isActive={editIsActive}
                onIsActiveChange={setEditIsActive}
                error={editError}
                loading={editLoading}
                onSubmit={handleUpdate}
                onCancel={() => setEditTarget(null)}
                submitLabel="Save Changes"
              />
            )}
          </div>
        </CenterMorphModalContent>
      </CenterMorphModal>

      <Card className="shadow-sm border-zinc-200 flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-border/40 shrink-0">
          <CardTitle className="text-base font-bold text-zinc-900">
            All Categories
          </CardTitle>
        </CardHeader>
        <div className="p-0 overflow-hidden rounded-b-xl border-t-0 flex-1 min-h-[400px]">
          <Table
            data={categories}
            columns={categoryColumns}
            rowHeight={64}
            className="border-none rounded-none h-full"
            emptyState="No categories found."
          />
        </div>
      </Card>
    </div>
  );
}
