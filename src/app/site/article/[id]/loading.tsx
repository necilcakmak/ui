export default function Loading() {
  return (
    <div className="animate-pulse space-y-8">
      <header className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="h-5 w-16 bg-blue-50/50 rounded-md"></div>
          <div className="h-3 w-3 bg-gray-100 rounded-full"></div>
          <div className="h-4 w-24 bg-gray-50 rounded-md"></div>
        </div>

        <div className="space-y-3">
          <div className="h-10 w-full bg-gray-200 rounded-xl"></div>
          <div className="h-10 w-4/5 bg-gray-200 rounded-xl"></div>
        </div>

        <div className="flex items-center justify-between py-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-gray-100"></div>
            <div className="h-4 w-28 bg-gray-100 rounded-md"></div>
          </div>
          <div className="h-5 w-16 bg-gray-50 rounded-md"></div>
        </div>
      </header>

      <div className="space-y-10">
        <div className="space-y-3">
          <div className="h-4 w-full bg-gray-50 rounded-md"></div>
          <div className="h-4 w-full bg-gray-50 rounded-md"></div>
          <div className="h-4 w-full bg-gray-50 rounded-md"></div>
          <div className="h-4 w-3/4 bg-gray-50 rounded-md"></div>
        </div>

        <div className="w-full h-64 bg-gray-100 rounded-[2.5rem]"></div>

        <div className="space-y-3">
          <div className="h-4 w-full bg-gray-50 rounded-md"></div>
          <div className="h-4 w-full bg-gray-50 rounded-md"></div>
          <div className="h-4 w-5/6 bg-gray-50 rounded-md"></div>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-100">
        <div className="flex space-x-3">
          <div className="h-5 w-16 bg-gray-50 rounded-md"></div>
          <div className="h-5 w-16 bg-gray-50 rounded-md"></div>
          <div className="h-5 w-16 bg-gray-50 rounded-md"></div>
        </div>
      </div>
    </div>
  );
}
