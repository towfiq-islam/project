export default function ProductSkeleton() {
  return (
    <div className="group animate-pulse">
      <div className="rounded-3xl shadow-sm bg-gray-300 p-2.5 h-[370px] w-full overflow-hidden mb-3">
        <div className="relative w-full h-full bg-gray-300 rounded-3xl">
          <div className="w-full h-full bg-gray-300 rounded-3xl" />
          <div className="absolute top-0 left-0 w-16 h-8 bg-gray-300 rounded-tl-3xl rounded-br-3xl" />
        </div>
      </div>
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-3" />
      <div className="h-13 bg-gray-300 rounded-lg w-full" />
    </div>
  );
}
