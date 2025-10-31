export default function Loading() {
  return (
    <div className="p-6 max-w-4xl mx-auto animate-pulse">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-300 h-[400px] w-full rounded-lg"></div>
        <div className="space-y-4">
          <div className="h-8 bg-gray-300 rounded w-3/4"></div>
          <div className="h-5 bg-gray-300 rounded w-1/3"></div>
          <div className="h-6 bg-gray-300 rounded w-1/2"></div>
          <div className="h-24 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-400 rounded w-1/3"></div>
        </div>
      </div>
    </div>
  );
}
