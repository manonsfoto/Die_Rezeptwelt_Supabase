const About = () => {
  return (
    <section className="md:max-w-7xl   mt-12 w-full ">
      <div className="flex flex-col md:flex-row md:gap-12">
        <article className="text-3xl  md:text-6xl">
          "Rezeptwelt ist mehr als eine Sammlung von Kochanleitungen – es ist
          ein Ort der Inspiration für Hobbyköche und Profis gleichermaßen."
        </article>
        <figure className="w-full rounded-3xl overflow-hidden h-1/4 my-12 md:h-1/2 md:my-0">
          <img
            src="https://images.unsplash.com/photo-1675096000167-4b8a276b6187?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="man holding a dish filled with food"
            className="w-full h-full object-cover"
          />
        </figure>
      </div>
      <article className="text-3xl md:text-5xl md:my-12 w-full md:h-fit bg-accent p-4 rounded-3xl font-light relative flex flex-col justify-end">
        <div className="self-end max-w-2xl">
          Hier findest du eine bunte Vielfalt an Rezepten: von traditionellen
          Wohlfühlgerichten bis hin zu kreativen, modernen Kreationen. Jedes
          Rezept wird sorgfältig ausgewählt und getestet, damit du immer das
          beste Ergebnis erzielst.
        </div>
      </article>{" "}
      <div className="flex flex-col md:flex-row md:gap-12 md:my-12">
        <figure className="w-full rounded-3xl overflow-hidden  my-12  md:my-0">
          <img
            src="https://images.unsplash.com/photo-1471478108131-9b2335c21611?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="a plate with pancakes"
            className="w-full h-full object-cover"
          />
        </figure>

        <article className="text-3xl mt-12 md:mt-0 md:text-5xl md:w-1/2">
          {" "}
          Neben Rezepten bieten wir hilfreiche Tipps, Tricks und Inspiration für
          deine Küche – egal, ob es um die perfekte Zubereitungstechnik oder
          spannende Geschmackskombinationen geht.
        </article>
      </div>
    </section>
  );
};

export default About;
