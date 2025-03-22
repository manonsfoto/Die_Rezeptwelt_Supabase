# Die Rezeptwelt

Eine All-in-One Rezeptplattform zum Entdecken, Erstellen und Verwalten von Rezepten mit integrierter Einkaufslistenfunktion.

[Hier kannst du die Live-Demo ansehen](https://rezept-supabase.netlify.app/)

## Funktionen

- **Benutzerauthentifizierung**: Vollständiges Anmelde- und Registrierungssystem mit Sitzungspersistenz
- **Rezepte entdecken**: Suche und Filterung von Rezepten mit detaillierten Ansichten
- **Eigene Rezepte**: Erstellen persönlicher Rezepte
- **Favoritensystem**: Speichern und organisieren bevorzugter Rezepte
- **Einkaufsliste**: Hinzufügen von Zutaten zur persönlichen Einkaufsliste mit Statusverwaltung
- **Responsive Design**: Optimiert für alle Geräte, von Mobiltelefonen (320px) bis Desktop

## Technologien

- **Frontend**: React, TypeScript, Tailwind CSS
- **State Management**: Zustand
- **Formularvalidierung**: Zod, React Hook Form
- **Backend & Datenbank**: Supabase
- **Routing**: React Router
- **Development**: Vite, npm

## Installation und Start

```bash
# Repository klonen
git clone https://github.com/manonsfoto/Die_Rezeptwelt_Supabase.git

# In das Projektverzeichnis wechseln
cd Die_Rezeptwelt_Supabase

# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev
```

## Datenbankschema-Visualisierung

![Supabase Datenbankschema](./images/supabase-schema.png)

## Umgebungsvariablen

Erstellen Sie eine `.env`-Datei im Hauptverzeichnis mit folgenden Variablen:

```
VITE_SUPABASE_URL=Ihre-Supabase-URL
VITE_SUPABASE_ANON_KEY=Ihr-Anon-Key
```

## Projektstruktur

```
src/
├── components/         # UI-Komponenten
├── pages/              # Seitenkomponenten
├── store/              # Zustand-Stores
├── types/              # TypeScript-Typdefinitionen
├── validation/         # Zod-Validierungsschemas
├── utils/              # Hilfsfunktionen
└── actions.ts          # Zentralisierte Datenbankfunktionen
```

## Authentifizierung

Die Anwendung verwendet Supabase Auth mit:

- E-Mail/Passwort-Anmeldung
- Sitzungspersistenz
- Geschützte Routen

## Einkaufslistenfunktion

Nutzer können:

- Zutaten direkt aus Rezepten hinzufügen
- Mengen anpassen
- Elemente als erledigt markieren
- Die Liste vollständig leeren

## Projektvorschau

### Rezepte suchen

![1Searchbar](https://github.com/user-attachments/assets/f7adebde-503a-4c66-98ec-177d7632e051)

### Rezept zu Favoriten hinzufügen

![2AddFav](https://github.com/user-attachments/assets/7f694346-8cf4-4638-871b-12631d81742e)

### Meine Rezepte anzeigen

![3CheckFav](https://github.com/user-attachments/assets/f5e46879-431a-4cfd-9f92-b15e90c68364)

### Neues Rezept erstellen

![4CreateNewRecipeIntro](https://github.com/user-attachments/assets/183ea0de-013b-47eb-95de-1f8050c9f604)

### Zutat zur Einkaufsliste hinzufügen

![Add_to_grocerylist](https://github.com/user-attachments/assets/71d68294-7710-41da-a2a3-98331eb4ffea)

### Meine Einkaufsliste

![Grocerylist_details](https://github.com/user-attachments/assets/5e9df302-5ccd-43c6-b953-120e9d447e4d)

