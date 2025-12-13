"use client";

import React, { useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { ApiResponse, } from "@/api/types/apiResponse";
import { register } from "@/api/apiMethods";
import { RegisterDto } from "@/api/types/auth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation"; // ✅
import { AuthResponseDto } from "@/api/types/user";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState<RegisterDto>({
    email: "",
    userName: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<
    Partial<Record<keyof RegisterDto, string>>
  >({});

  const handleChange = (key: keyof RegisterDto, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const registerResponse: ApiResponse<AuthResponseDto> = await register(form);

    if (registerResponse.succeeded) {
      toast.success(registerResponse.message || "Kayıt başarılı!");
    } else {
      if (registerResponse.validationErrors) {
        const newErrors: typeof errors = {};
        Object.entries(registerResponse.validationErrors).forEach(
          ([key, messages]) => {
            newErrors[key as keyof RegisterDto] = messages.join(", ");
          }
        );
        setErrors(newErrors);
      }
      toast.error(registerResponse.message || "Kayıt işlemi başarısız.");
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 bg-white rounded shadow space-y-4"
      >
        <h1 className="text-2xl font-bold text-center text-black">Register</h1>

        <Input
          label="Email"
          value={form.email}
          onChange={(v) => handleChange("email", v)}
          type="email"
          required
          errorMessage={errors.email}
          pattern={/^[^\s@]+@[^\s@]+\.[^\s@]+$/}
        />

        <Input
          label="Username"
          value={form.userName}
          onChange={(v) => handleChange("userName", v)}
          required
          errorMessage={errors.userName}
        />

        <Input
          label="Password"
          value={form.password}
          onChange={(v) => handleChange("password", v)}
          type="password"
          required
          errorMessage={errors.password}
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Register"}
        </Button>
        <div className="text-center mt-2">
          <button
            type="button"
            className="text-blue-500 hover:underline"
            onClick={() => router.push("/site/login")}
          >
            Already have an account? Login
          </button>
        </div>
      </form>
    </div>
  );
}
