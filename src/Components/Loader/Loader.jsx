export const ProductSkeleton = () => {
  return (
    <div className="group animate-pulse">
      <div className="rounded-2xl lg:rounded-3xl shadow-sm bg-white p-2 lg:p-2.5 h-[190px] lg:h-[350px] w-full overflow-hidden mb-3">
        <div className="relative w-full h-full bg-[#eceef0] rounded-2xl lg:rounded-3xl">
          <div className="w-full h-full bg-gray-300 rounded-2xl lg:rounded-3xl" />
          <div className="absolute top-0 left-0 w-14 lg:w-20 h-6 lg:h-8 bg-gray-300 rounded-tl-3xl rounded-br-3xl" />
        </div>
      </div>
      <div className="h-5 lg:h-6 bg-gray-300 rounded w-3/4 mb-2 lg:mb-3" />
      <div className="h-9 lg:h-[52px] bg-gray-300 rounded-lg w-full" />
    </div>
  );
};

export const CategorySkeleton = () => {
  return (
    <div className="relative bg-gray-300 rounded-t-lg first:rounded-tl-4xl w-full h-64 sm:h-80 overflow-hidden animate-pulse">
      <div className="absolute inset-0 bg-gray-300" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
        <div className="h-6 w-32 bg-gray-300 rounded-md" />
        <div className="size-10 bg-gray-300 rounded-lg" />
      </div>
    </div>
  );
};
