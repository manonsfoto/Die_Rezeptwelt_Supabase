import { FC } from "react";

interface HeroProps {
  text: string;
  imgUrl: string;
}

const Hero: FC<HeroProps> = ({ text, imgUrl }) => {
  return (
    <div
      className="hero min-h-80"
      style={{
        backgroundImage: `url(${imgUrl})`,
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-2xl">
          <p className="mb-5 text-3xl font-bold">{text}</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
