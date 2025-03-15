const HomeHero = () => {
  return (
    <div
      className="hero h-svh rounded-3xl mt-4 bg-base-100 overflow-hidden"
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1486419952281-2b1734713e54?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
      }}
    >
      <div className="hero-overlay bg-black bg-opacity-40"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-2xl">
          <p className="mb-5 text-3xl md:text-5xl  font-caprasimo text-base-100">
            Lassen Sie sich
            <br />
            <span className="text-primary font-gaegu font-semibold italic text-5xl md:text-7xl">
              inspirieren
            </span>
            <br />
            und{" "}
            <span className="text-secondary font-gaegu font-semibold italic text-5xl md:text-7xl">
              kochen
            </span>{" "}
            Sie
            <br />
            mit Leidenschaft.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeHero;
