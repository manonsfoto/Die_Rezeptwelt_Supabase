import { FC } from "react";

interface HeroProps {
  text: string | undefined;
  imgUrl: string | undefined | null;
}

const Hero: FC<HeroProps> = ({ text, imgUrl }) => {
  return (
    <div
      className="hero min-h-44 rounded-3xl mt-4 bg-base-100 overflow-hidden"
      style={{
        backgroundImage: `url(${imgUrl})`,
      }}
    >
      <div className="hero-overlay bg-black bg-opacity-30"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-2xl">
          <p className="mb-5 text-2xl  font-caprasimo text-base-100">{text}</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
