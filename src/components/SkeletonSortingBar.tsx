const SkeletonSortingBar = () => {
  return (
    <div className="w-full mb-12 border-b-font-semibold">
      <div className="py-3 flex gap-3" role="group">
        <div className="btn-sorting bg-gray-200 animate-pulse  w-24 h-10"></div>
        <div className="btn-sorting bg-gray-200 animate-pulse  w-16 h-10"></div>
        <div className="btn-sorting bg-gray-200 animate-pulse  w-16 h-10"></div>
      </div>
    </div>
  );
};

export default SkeletonSortingBar;
