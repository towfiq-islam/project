export default function ProductSkeleton() {
  return (
    <div className="group animate-pulse">
      {/* Image Skeleton */}
      <div className="bg-gray-200 rounded-2xl overflow-hidden mb-3 aspect-square relative" />

      {/* Title Skeleton */}
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />

      {/* Price Skeleton */}
      <div className="h-4 bg-gray-200 rounded w-1/3 mb-3" />

      {/* Button Skeleton */}
      <div className="h-10 bg-gray-200 rounded-lg w-full" />
    </div>
  );
}
