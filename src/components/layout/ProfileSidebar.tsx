export default function ProfileSidebar() {
  return (
    <div className="lg:sticky lg:top-28">
      <div className="bg-gray-50 border border-gray-100 p-6 rounded-[2.5rem]">
        {/* Logo/Profil Avatar */}
        <div className="w-14 h-14 bg-gray-900 rounded-2xl flex items-center justify-center text-white text-xl font-bold mb-4 shadow-md transition-transform hover:scale-105">
          NÇ
        </div>

        {/* İsim ve Ünvan */}
        <h2 className="text-lg font-bold text-gray-900 leading-tight">
          Necil Çakmak
        </h2>
        <p className="text-[11px] text-gray-400 mt-1 mb-4 font-bold uppercase tracking-widest text-blue-600">
          Full Stack Developer
        </p>

        {/* Kısa Tanıtım */}
        <p className="text-gray-600 text-[13px] leading-relaxed mb-6">
          .NET ve Next.js ile modern web mimarileri üzerine araştırmalar ve
          notlar.
        </p>

        {/* Sosyal Medya İkonları */}
        <div className="flex items-center gap-3">
          {/* GitHub */}
          <a
            href="https://github.com/necilcakmak"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 bg-white border border-gray-100 rounded-xl text-gray-600 hover:text-black hover:border-gray-300 hover:shadow-sm transition-all"
            aria-label="GitHub"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com/in/necilcakmak"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 bg-white border border-gray-100 rounded-xl text-gray-600 hover:text-blue-600 hover:border-blue-100 hover:shadow-sm transition-all"
            aria-label="LinkedIn"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com/necilcakmak"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 bg-white border border-gray-100 rounded-xl text-gray-600 hover:text-pink-600 hover:border-pink-100 hover:shadow-sm transition-all"
            aria-label="Instagram"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
