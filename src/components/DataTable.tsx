"use client";

import {
  ArrowsUpDownIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import { useMemo, useState } from "react";

interface Column<T> {
  key: keyof T | "actions";
  label: string;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  pageSize?: number;
  searchKeys?: (keyof T)[];
  loading?: boolean;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onView?: (item: T) => void;
  title?: string;
  actions?: React.ReactNode;
}

export default function DataTable<T extends { id: string | number }>({
  columns,
  data,
  pageSize = 10,
  searchKeys,
  loading = false,
  onEdit,
  onDelete,
  onView,
  title,
  actions,
}: DataTableProps<T>) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const filteredData = useMemo(() => {
    if (!search || !searchKeys) return data;
    return data.filter((item) =>
      searchKeys.some((key) =>
        String(item[key] || "")
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    );
  }, [search, data, searchKeys]);

  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;
    return [...filteredData].sort((a: any, b: any) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (aVal === bVal) return 0;
      const res = aVal > bVal ? 1 : -1;
      return sortOrder === "asc" ? res : -res;
    });
  }, [filteredData, sortKey, sortOrder]);

  const totalPages = Math.ceil(sortedData.length / pageSize) || 1;
  const currentData = sortedData.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Table Header */}
      <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          {title && (
            <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          )}
          <p className="text-sm text-gray-500">
            Toplam {sortedData.length} kayıt bulundu.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {searchKeys && (
            <input
              type="text"
              placeholder="Ara..."
              className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all w-64"
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          )}
          {actions}
        </div>
      </div>

      {/* Table Body */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50/50">
            <tr>
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className={`p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider ${
                    col.sortable
                      ? "cursor-pointer hover:text-indigo-600 transition"
                      : ""
                  }`}
                  onClick={() =>
                    col.sortable &&
                    col.key !== "actions" &&
                    (setSortKey(col.key as keyof T),
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc"))
                  }
                >
                  <div className="flex items-center gap-2">
                    {col.label}
                    {col.sortable && (
                      <ArrowsUpDownIcon className="w-3 h-3 opacity-50" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="p-12 text-center text-gray-400"
                >
                  Yükleniyor...
                </td>
              </tr>
            ) : (
              currentData.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-indigo-50/30 transition-colors group"
                >
                  {columns.map((col) => (
                    <td key={String(col.key)} className="p-4">
                      {col.key === "actions" ? (
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          {onView && (
                            <button
                              onClick={() => onView(item)}
                              className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-white rounded-lg shadow-sm transition"
                            >
                              <EyeIcon className="w-4 h-4" />
                            </button>
                          )}
                          {onEdit && (
                            <button
                              onClick={() => onEdit(item)}
                              className="p-2 text-gray-400 hover:text-amber-600 hover:bg-white rounded-lg shadow-sm transition"
                            >
                              <PencilIcon className="w-4 h-4" />
                            </button>
                          )}
                          {onDelete && (
                            <button
                              onClick={() => onDelete(item)}
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-white rounded-lg shadow-sm transition"
                            >
                              <TrashIcon className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ) : col.render ? (
                        col.render(item)
                      ) : (
                        <span className="text-sm text-gray-700 font-medium">
                          {String(item[col.key as keyof T] || "")}
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
        <span className="text-xs text-gray-500 font-medium">
          Sayfa {page} / {totalPages}
        </span>
        <div className="flex gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 text-xs font-bold bg-white border border-gray-200 rounded-lg shadow-sm disabled:opacity-50"
          >
            Geri
          </button>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 text-xs font-bold bg-white border border-gray-200 rounded-lg shadow-sm disabled:opacity-50"
          >
            İleri
          </button>
        </div>
      </div>
    </div>
  );
}
