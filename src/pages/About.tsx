import Hero from "../components/Hero";

const About = () => {
  return (
    <>
      {" "}
      <Hero
        text={
          "Lassen Sie sich inspirieren, kochen Sie mit Leidenschaft und erleben Sie unvergessliche Momente bei Tisch."
        }
        imgUrl={
          "https://images.unsplash.com/photo-1577308856961-8e9ec50d0c67?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
      />
      <article className="  mt-20 p-5">
        <div className="text-xl max-w-2xl  inline-block items-baseline text-center">
          <div className="flow-root my-6">
            Hallo, wir sind Minyeong und Philip und freuen uns, unsere Arbeit
            auf Rezeptwelt vorstellen zu können. Bei der Erkundung dieser
            erstaunlichen Website haben wir ein gastronomisches Universum voller
            köstlicher Rezepte, nützlicher Tipps und kulinarischer Inspiration
            entdeckt.
          </div>
          <div className="flow-root my-6">
            Rezeptwelt ist ein Ort, an dem sich erfahrene Köche und Kochanfänger
            in ihrer Leidenschaft für das Essen vereinen können. Was uns
            besonders begeistert hat, war die Vielfalt der Rezepte. Von
            traditionellen, gemütlichen Gerichten bis hin zu innovativeren
            Kreationen gibt es Optionen für jeden Geschmack und jede
            Gelegenheit.
          </div>
          <div className="flow-root my-6">
            Jedes Rezept wird sorgfältig ausgewählt und getestet, um
            sicherzustellen, dass die Ergebnisse stets schmackhaft sind und es
            sich lohnt, sie zu teilen. Neben den Rezepten bietet Rezeptwelt auch
            nützliche Tipps zur Verbesserung der eigenen Kochkünste. Von
            Zubereitungstechniken bis hin zu Vorschlägen für
            Geschmackskombinationen - die Website lädt zum Entdecken und
            Experimentieren in der Küche ein.
          </div>
          <div className="flow-root my-6">
            Es ist eine gemütliche und integrative Umgebung, in der jeder
            ermutigt wird, in die Kunst des Kochens einzutauchen und neue
            Möglichkeiten zu entdecken. Kurz gesagt, Rezeptwelt ist ein
            inspirierender gastronomischer Raum, der uns einlädt, unsere
            Leidenschaft für das Kochen zu entdecken, zu kreieren und zu teilen.
          </div>
          <div className="flow-root my-6">
            Wir hoffen, dass unsere Präsentation Ihr Interesse geweckt hat, sich
            mit uns auf diese köstliche Reise in die Rezeptwelt zu begeben!
          </div>
        </div>
      </article>
    </>
  );
};

export default About;
