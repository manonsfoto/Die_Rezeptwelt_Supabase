const SkeletonSortingBar = () => {
  return (
    <div className="w-full mb-12 border-b-font-semibold">
      <div className="py-3 flex flex-col gap-6">
        <div className="flex flex-wrap gap-3" role="group">
    
          <div className="btn-sorting bg-gray-200 animate-pulse w-24 h-10"></div>
          <div className="btn-sorting bg-gray-200 animate-pulse w-16 h-10"></div>
          <div className="btn-sorting bg-gray-200 animate-pulse w-16 h-10"></div>

         
          <div className="border-l-2 border-gray-200 h-10 mx-2"></div>

       
          <div className="btn-sorting bg-gray-200 animate-pulse w-32 h-10"></div>
          <div className="btn-sorting bg-gray-200 animate-pulse w-24 h-10"></div>
          <div className="btn-sorting bg-gray-200 animate-pulse w-28 h-10"></div>
          <div className="btn-sorting bg-gray-200 animate-pulse w-26 h-10"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonSortingBar;
