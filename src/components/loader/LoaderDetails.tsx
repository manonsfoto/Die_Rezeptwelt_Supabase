const LoaderDetails = () => {
  return (
    <div className="w-full flex flex-col gap-12">
      <div className="skeleton h-80 w-full"></div>
      <article className="flex flex-col gap-9 w-full items-center justify-center ">
        <div className="flex flex-col gap-9">
          <div className="skeleton h-11 w-56 mt-8  "></div>
          <div className="skeleton h-7 w-44  "></div>
          <div className="skeleton h-4 w-48 "></div>{" "}
          <div className="skeleton h-7 w-44  "></div>
          <div className="skeleton h-4 w-52 "></div>{" "}
          <div className="skeleton h-7 w-60 mt-6 "></div>{" "}
          <div className="skeleton h-4 w-96  "></div>{" "}
          <div className="skeleton h-4 w-96  "></div>{" "}
          <div className="skeleton h-4 w-96  "></div>{" "}
          <div className="skeleton h-4 w-96  "></div>{" "}
          <div className="skeleton h-4 w-96  "></div>{" "}
          <div className="skeleton h-4 w-96  "></div>{" "}
          <div className="skeleton h-4 w-96  "></div>
        </div>
      </article>
    </div>
  );
};

export default LoaderDetails;
