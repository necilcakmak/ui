export default function ProfileSidebar() {
  return (
    <div className="lg:sticky lg:top-28">
      <div className="bg-gray-50 border border-gray-100 p-6 rounded-[2.5rem]">
        <div className="w-14 h-14 bg-gray-900 rounded-2xl flex items-center justify-center text-white text-xl font-bold mb-4 shadow-md">
          NÇ
        </div>
        <h2 className="text-lg font-bold text-gray-900 leading-tight">Necil Çakmak</h2>
        <p className="text-[11px] text-gray-400 mt-1 mb-4 font-bold uppercase tracking-widest">Full Stack Developer</p>
        <p className="text-gray-600 text-[13px] leading-relaxed">
          .NET ve Next.js ile modern web mimarileri üzerine notlar.
        </p>
      </div>
    </div>
  );
}