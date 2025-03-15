import { useContext } from "react";
import { UserContext } from "../context/Context";

const Greeting = () => {
  const { user } = useContext(UserContext);
  return (
    <div className="alert rounded-full w-fit mt-4 bg-primary font-gaegu text-2xl font-bold h-5 place-content-center ">
      <span>Welcome back, {user?.user_metadata.first_name}!</span>
    </div>
  );
};

export default Greeting;
