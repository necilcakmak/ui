"use client";

import React, { useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { ApiResponse } from "@/api/types/apiResponse";
import { login } from "@/api/apiMethods";
import { LoginDto } from "@/api/types/auth";
import { AuthResponseDto } from "@/api/types/user";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>(
    {}
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const payload: LoginDto = { identifier, password };
    const loginResponse: ApiResponse<AuthResponseDto> = await login(payload);

    if (loginResponse.succeeded) {
      toast.success(loginResponse.message || "Giriş başarılı.");
      router.push("/");
    } else {
      if (loginResponse.validationErrors) {
        const fieldErrors: { [key: string]: string } = {};
        Object.entries(loginResponse.validationErrors).forEach(
          ([key, messages]) => {
            fieldErrors[key.toLowerCase()] = messages.join(" | ");
          }
        );
        setErrors(fieldErrors);
      }
      toast.error(loginResponse.message || "Giriş başarısız.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/50 p-4 antialiased">
      <div className="w-full max-w-[440px] animate-fadeIn">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] space-y-6"
        >
          <div className="space-y-4">
            <Input
              label="E-posta veya Kullanıcı Adı"
              value={identifier}
              onChange={setIdentifier}
              type="text"
              required
              errorMessage={errors.identifier || errors.username}
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
              {loading ? "Giriş Yapılıyor..." : "Sisteme Giriş Yap"}
            </Button>
          </div>

          <div className="text-center mt-6">
            <button
              type="button"
              className="text-[11px] font-bold text-gray-400 hover:text-blue-600 transition-colors uppercase tracking-[0.2em]"
              onClick={() => router.push("/auth/register")}
            >
              Hesabınız yok mu?{" "}
              <span className="text-blue-500">Kayıt Olun</span>
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
