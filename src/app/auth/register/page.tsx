"use client";

import React, { useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { ApiResponse } from "@/api/types/apiResponse";
import { register } from "@/api/apiMethods";
import { RegisterDto } from "@/api/types/auth";
import { AuthResponseDto } from "@/api/types/user";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>(
    {}
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setErrors({});

    const payload: RegisterDto = { email, username, password };
    const registerResponse: ApiResponse<AuthResponseDto> = await register(
      payload
    );

    if (registerResponse.succeeded) {
      toast.success(
        registerResponse.message || "Kaydınız başarıyla oluşturuldu!"
      );
      router.push("/auth/login");
    } else {
      if (registerResponse.validationErrors) {
        const fieldErrors: { [key: string]: string } = {};
        Object.entries(registerResponse.validationErrors).forEach(
          ([key, messages]) => {
            fieldErrors[key.toLowerCase()] = messages.join(" | ");
          }
        );
        setErrors(fieldErrors);
      }
      toast.error(registerResponse.message || "Kayıt işlemi başarısız.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/50 p-4 antialiased">
      <div className="w-full max-w-[460px] animate-fadeIn">
        <div className="flex flex-col items-center mb-10 text-center">
          <div
            onClick={() => router.push("/")}
            className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center text-white text-xl font-bold mb-6 shadow-xl cursor-pointer hover:scale-105 transition-transform"
          >
            NÇ
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            Yeni Hesap Oluştur
          </h1>
          <p className="text-sm text-gray-400 mt-2 font-medium">
            Topluluğumuza katılmak için bilgilerinizi girin.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] space-y-6"
        >
          <div className="space-y-4">
            <Input
              label="E-posta Adresi"
              value={email}
              onChange={setEmail}
              type="email"
              required
              errorMessage={errors.email}
            />

            <Input
              label="Kullanıcı Adı"
              value={username}
              onChange={setUsername}
              type="text"
              required
              errorMessage={errors.username}
            />

            <Input
              label="Şifre"
              value={password}
              onChange={setPassword}
              type="password"
              required
              errorMessage={errors.password}
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl font-bold shadow-lg shadow-blue-100 transition-all active:scale-[0.98]"
            >
              {loading ? "Hesap Oluşturuluyor..." : "Kayıt Ol"}
            </Button>
          </div>

          <div className="text-center mt-6">
            <button
              type="button"
              className="text-[11px] font-bold text-gray-400 hover:text-blue-600 transition-colors uppercase tracking-[0.2em]"
              onClick={() => router.push("/auth/login")}
            >
              Zaten bir hesabınız var mı?{" "}
              <span className="text-blue-500 underline underline-offset-4">
                Giriş Yapın
              </span>
            </button>
          </div>
        </form>
        <div className="text-center mt-8">
          <button
            onClick={() => router.push("/")}
            className="text-xs font-bold text-gray-300 hover:text-gray-900 transition-colors uppercase tracking-widest"
          >
            ← Ana Sayfaya Dön
          </button>
        </div>
      </div>
    </div>
  );
}
