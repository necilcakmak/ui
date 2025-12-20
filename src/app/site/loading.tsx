export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-12 animate-pulse">
      <div className="text-center space-y-4">
        <div className="h-12 w-64 bg-gray-200 rounded-2xl mx-auto"></div>
        <div className="h-5 w-80 bg-gray-100 rounded-full mx-auto"></div>
      </div>

      <div className="space-y-10">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-[32px] p-8 space-y-6">
            <div className="flex justify-between">
              <div className="h-6 w-20 bg-blue-50 rounded-full"></div>
              <div className="h-4 w-24 bg-gray-100 rounded-md"></div>
            </div>
            <div className="h-10 w-full bg-gray-200 rounded-xl"></div>
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-100 rounded-md"></div>
              <div className="h-4 w-5/6 bg-gray-100 rounded-md"></div>
            </div>
            <div className="pt-6 border-t border-gray-50 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                <div className="h-4 w-20 bg-gray-200 rounded-md"></div>
              </div>
              <div className="h-6 w-24 bg-blue-100 rounded-md"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}