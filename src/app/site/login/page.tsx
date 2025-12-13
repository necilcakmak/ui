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
      const tokenData = loginResponse.data;

      if (tokenData && tokenData.token && tokenData.role == "Admin") {
        toast.success(loginResponse.message || "Giriş başarılı.");
        router.push("/admin");
      } else {
        toast.error("Beklenmedik bir hata oluştu: Token verisi eksik.");
      }
    } else {
      if (loginResponse.validationErrors) {
        const fieldErrors: { [key: string]: string } = {};

        Object.entries(loginResponse.validationErrors).forEach(
          ([key, messages]) => {
            fieldErrors[key] = messages.join(" | ");
          }
        );
debugger
        setErrors(fieldErrors);
        toast.error(
          loginResponse.message || "Lütfen formdaki hataları düzeltin."
        );
      } else {
        toast.error(loginResponse.message || "Bilinmeyen bir hata oluştu.");
      }
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 bg-white rounded shadow space-y-6"
      >
        <h1 className="text-2xl font-bold text-center text-black">Login</h1>
        <Input
          label="Email"
          value={identifier}
          onChange={setIdentifier}
          type="text"
          required
          errorMessage={errors.identifier} // Hata mesajını alan adına göre çekiyoruz
        />
        <Input
          label="Password"
          value={password}
          onChange={setPassword}
          type="password"
          required
          errorMessage={errors.password} // Hata mesajını alan adına göre çekiyoruz
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Giriş Yapılıyor..." : "Login"}
        </Button>
        <div className="text-center mt-2">
          <button
            type="button"
            className="text-blue-500 hover:underline"
            onClick={() => router.push("/site/register")}
          >
            Hesabınız yok mu? Kaydolun.
          </button>
        </div>
      </form>
    </div>
  );
}
