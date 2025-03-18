import { Link } from "react-router-dom";

const EmptyHero = ({
  mainText,
  subText,
}: {
  mainText: string;
  subText?: string;
}) => {
  return (
    <div
      className="hero h-svh rounded-3xl mt-4 bg-base-100 overflow-hidden"
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1516226392000-3536759b78e7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
      }}
    >
      <div className="hero-overlay bg-black bg-opacity-40"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-2xl">
          <p className="mb-5 text-3xl md:text-5xl  font-caprasimo text-base-100">
            {mainText}
            <br />
            <span className="text-accent font-gaegu font-semibold text-xl ">
              {subText}
            </span>
          </p>
          <Link
            to="/rezepte"
            className="btn bg-neutral  text-black rounded-full"
          >
            Zu den Rezepten
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmptyHero;
