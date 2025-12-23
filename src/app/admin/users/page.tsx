"use client";

import DataTable from "@/components/DataTable";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useModal } from "@/context/ModalContext";
import { UserDto } from "@/api/types/user";
import { getUsers, deleteUser } from "@/api/apiMethods";

export default function UsersPage() {
  const router = useRouter();
  const [userList, setUserList] = useState<UserDto[]>([]);
  const [loading, setLoading] = useState(true);
  const { openModal } = useModal();

  const fetchUsers = async () => {
    setLoading(true);
    const result = await getUsers();
    if (result.succeeded) {
      setUserList(result.data || []);
    } else {
      toast.error(result.message || "Kullanıcılar yüklenirken bir hata oluştu");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = (user: UserDto) => {
    openModal({
      title: "Kullanıcıyı Sil",
      message: `"${user.userName}" adlı kullanıcıyı silmek istediğinizden emin misiniz?`,
      confirmText: "Sil",
      cancelText: "Vazgeç",
      onConfirm: async () => {
        const result = await deleteUser(user.id);
        if (result.succeeded) {
          toast.success("Kullanıcı silindi.");
          setUserList((prev) => prev.filter((u) => u.id !== user.id));
        } else {
          toast.error(result.message || "Hata oluştu.");
        }
      },
    });
  };

  return (
    <div className="space-y-6">
      <DataTable
        data={userList}
        title="Kullanıcı Yönetimi"
        loading={loading}
        pageSize={10}
        searchKeys={["userName", "email"]}
        columns={[
          {
            key: "userName",
            label: "Kullanıcı Bilgisi",
            sortable: true,
            render: (item: UserDto) => (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 text-white rounded-xl flex items-center justify-center font-bold shadow-sm">
                  {item.userName?.[0]?.toUpperCase() || "U"}
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-gray-800 text-sm">
                    {item.userName}
                  </span>
                  <span className="text-xs text-gray-500">{item.email}</span>
                </div>
              </div>
            ),
          },
          {
            key: "roleName",
            label: "Yetki",
            sortable: true,
            render: (item: UserDto) => (
              <span
                className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                  item.roleName === "Admin"
                    ? "bg-purple-50 text-purple-700 border-purple-100"
                    : "bg-blue-50 text-blue-700 border-blue-100"
                }`}
              >
                {item.roleName}
              </span>
            ),
          },
          {
            key: "createdDate",
            label: "Kayıt Tarihi",
            sortable: true,
            render: (item: UserDto) => {
              const date = item.createdDate ? new Date(item.createdDate) : null;
              return (
                <span className="text-sm text-gray-600 font-medium">
                  {date && !isNaN(date.getTime())
                    ? date.toLocaleDateString("tr-TR", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : "—"}
                </span>
              );
            },
          },
          { key: "actions", label: "" }, // Sağ taraf boş kalsın, butonlar gelecek
        ]}
        onEdit={(user) => router.push(`/admin/users/${user.id}/edit`)}
        onDelete={handleDelete}
      />
    </div>
  );
}
