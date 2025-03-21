const SkeletonCard = () => {
  return (
    <li className="w-96 relative">
      <div className="rounded-3xl flex-center h-80 overflow-hidden skeleton"></div>
      <div className="pt-6">
        <div className="headline-2 skeleton h-8 w-48 mb-2"></div>
        <div className="flex-between border-b-2 border-black">
          <div className="h-16 skeleton w-48"></div>
          <div className="border-l-2 border-black h-16 p-5 w-14"></div>
        </div>
        <div className="absolute top-3 right-3 w-14 h-14 rounded-full skeleton"></div>
      </div>
    </li>
  );
};

export default SkeletonCard;
