export default function Loading() {
  return (
    <div className="animate-pulse space-y-10">
      <div className="flex flex-col space-y-3 border-b border-gray-100 pb-8">
        <div className="h-9 w-48 bg-gray-200 rounded-xl"></div>
        <div className="h-4 w-72 bg-gray-100 rounded-lg"></div>
      </div>

      <div className="space-y-8">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-white border border-gray-100 rounded-[2.5rem] p-7 space-y-5 shadow-sm"
          >
            <div className="flex justify-between items-center">
              <div className="h-5 w-20 bg-blue-50/50 rounded-lg"></div>
              <div className="h-3 w-24 bg-gray-50 rounded-md"></div>
            </div>

            <div className="space-y-2">
              <div className="h-7 w-full bg-gray-100 rounded-xl"></div>
              <div className="h-7 w-2/3 bg-gray-100 rounded-xl"></div>
            </div>

            <div className="space-y-2">
              <div className="h-3 w-full bg-gray-50 rounded-md"></div>
              <div className="h-3 w-full bg-gray-50 rounded-md"></div>
              <div className="h-3 w-4/5 bg-gray-50 rounded-md"></div>
            </div>

            <div className="pt-5 border-t border-gray-50 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-50"></div>
                <div className="h-3 w-16 bg-gray-100 rounded-md"></div>
              </div>
              <div className="h-8 w-24 bg-blue-50/50 rounded-xl"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
