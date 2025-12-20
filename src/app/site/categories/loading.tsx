export default function Loading() {
  return (
    <div className="py-10 animate-pulse">
      <div className="mb-10 text-center">
        {/* Başlık İskeleti */}
        <div className="h-10 w-48 bg-gray-200 rounded-full mx-auto mb-4"></div>
        {/* Alt Metin İskeleti */}
        <div className="h-5 w-64 bg-gray-100 rounded-full mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm h-64 flex flex-col justify-between">
            <div>
              <div className="flex justify-between mb-4">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl"></div>
                <div className="w-16 h-6 bg-gray-50 rounded-md"></div>
              </div>
              <div className="h-8 w-3/4 bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-10 w-full bg-gray-50 rounded-xl mt-3"></div>
            </div>
            <div className="mt-8 pt-4 border-t border-gray-50 flex justify-between">
              <div className="h-5 w-24 bg-blue-100 rounded-md"></div>
              <div className="h-5 w-5 bg-blue-100 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}