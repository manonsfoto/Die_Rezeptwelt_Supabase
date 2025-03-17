import { useContext } from "react";
import { UserContext } from "../context/Context";

const Greeting = () => {
  const { user } = useContext(UserContext);
  return (
    <div className=" rounded-full w-fit mt-4 bg-primary font-gaegu text-2xl font-bold  place-content-center px-2  ">
      <span>Welcome back, {user?.user_metadata.first_name}!</span>
    </div>
  );
};

export default Greeting;
