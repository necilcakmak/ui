"use client";

import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { useEffect, useRef } from "react";

interface Props {
  content: string;
  onChange: (html: string) => void;
  error?: string;
}

const Icons = {
  Bold: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
      <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
    </svg>
  ),
  Italic: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="19" y1="4" x2="10" y2="4" />
      <line x1="14" y1="20" x2="5" y2="20" />
      <line x1="15" y1="4" x2="9" y2="20" />
    </svg>
  ),
  Link: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  ),
  Image: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  ),
};

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  if (!editor) return null;

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        editor.chain().focus().setImage({ src: result }).run();
      };
      reader.readAsDataURL(file);
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const addLink = () => {
    const url = window.prompt("URL giriniz:");
    if (url) editor.chain().focus().setLink({ href: url }).run();
    else if (url === "") editor.chain().focus().unsetLink().run();
  };

  const btnClass = (active: boolean) =>
    `p-2 border rounded transition-all ${
      active
        ? "bg-blue-600 text-white border-blue-600 shadow-sm"
        : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
    }`;

  return (
    <div className="flex flex-wrap gap-1 p-2 bg-gray-50 border-b border-gray-300">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={btnClass(editor.isActive("bold"))}
      >
        <Icons.Bold />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={btnClass(editor.isActive("italic"))}
      >
        <Icons.Italic />
      </button>
      <div className="w-px h-6 bg-gray-300 mx-1 self-center" />
      <button
        type="button"
        onClick={addLink}
        className={btnClass(editor.isActive("link"))}
      >
        <Icons.Link />
      </button>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileUpload}
      />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className={btnClass(false)}
        title="Resim Yükle"
      >
        <Icons.Image />
      </button>
    </div>
  );
};

export default function TiptapEditor({ content, onChange, error }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: "İçeriği buraya yazın..." }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: "text-blue-600 underline cursor-pointer" },
      }),
      Image.configure({
        allowBase64: true, // Base64 resimlerin render edilmesi için kritik
        HTMLAttributes: {
          class: "rounded-lg max-w-full h-auto block my-4 shadow-sm",
        },
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm focus:outline-none min-h-[300px] max-w-none p-4 text-black prose-img:block prose-img:max-w-full",
      },
    },
  });

  // Edit sayfasındaki veri değişimini yakalayan stabil useEffect
  useEffect(() => {
    if (!editor) return;

    // Eğer editor boşsa veya dışarıdaki content değişmişse içeriği güncelle
    const isSameContent = editor.getHTML() === content;

    // API'den veri ilk geldiğinde veya form resetlendiğinde çalışır
    if (!isSameContent && content !== undefined) {
      // setTimeout kullanımı Tiptap'ın render döngüsüyle çakışmayı önler
      setTimeout(() => {
        editor.commands.setContent(content, { emitUpdate: false });
      }, 0);
    }
  }, [content, editor]);

  return (
    <div className="w-full">
      <div
        className={`flex flex-col border rounded-md overflow-hidden bg-white shadow-sm transition-colors ${
          error
            ? "border-red-500 ring-1 ring-red-500"
            : "border-gray-300 focus-within:border-blue-400"
        }`}
      >
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
      </div>
      {error && (
        <p className="text-red-500 text-xs mt-1 font-medium">{error}</p>
      )}
    </div>
  );
}
