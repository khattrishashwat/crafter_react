import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// import Backend from "i18next-http-backend";

i18n

  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // debug: true,
    lng: localStorage.getItem("selectedLanguage") || "nl", // fallbackLng: ["en", "nl"],
    resources: {
      en: {
        translation: {
          "Welcome To Alhra": "Welcome To Alhra",
          "Welcome To ServiceConnect.nl": "Welcome To ServiceConnect.nl",
          "Let's get Started !": "Let's get Started!",
          Email: "Email",
          Password: "Password",
          Login: "Login",
          "Logging in...": "Logging in...",
          "Incorrect email or password": "Incorrect email or password",
          "Server Error Please Try Again Later!":
            "Server Error Please Try Again Later!",
          "Forgot Password": "Forgot Password",
          "Enter your Email Address": "Enter your Email Address",
          "An email has been sent with instructions to reset your password.If it has not arrived, please check the spam folder of your email.":
            "An email has been sent with instructions to reset your password. If it has not arrived, please check the spam folder of your email.",
          Back: "Back",
          Send: "Send",
          Assignments: "Assignments",
          "To do": "To do",
          "Rescheduled appointments": "Rescheduled appointments",
          "check work orders": "check work orders",
          "actions to perform": "actions to perform",
          "Today's dashboard": "Today's dashboard",
          Sale: "Sale",
          Performance: "Performance",
          Hours: "Hours",
          Invoices: "Invoices",
          Data: "Data",
          Relationship: "Relationship",
          Planning: "Planning",
          Projects: "Projects",
          "Work Orders": "Work Orders",
          Action: "Action",
          Quotations: "Quotations",
          "Other Activities": "Other Activities",
          Export: "Export",
          "Invoice No": "Invoice No",
          Refrence: "Reference",
          Client: "Client",
          Amount: "Amount",
          Articles: "Articles",
          Name: "Name",
          "Article group": "Article group",
          "Article number": "Article number",
          "Selling price": "Selling price",
          Branches: "Branches",
          brands: "brands",
          Definition: "Definition",
          Photograph: "Photograph",
          "Article group": "Article group",
          Unit: "Unit",
          Cost: "Cost",
          VAT: "VAT",
          "VAT rate": "VAT rate",
          rate: "rate",
          "G/L Account": "G/L Account",
          Sales: "Sales",
          expenses: "expenses",
          Dependent: "Dependent",
          "Optional ": "Optional",
          Combination: "Combination",
          products: "products",
          Customers: "Customers",
          number: "number",
          "Company ": "Company",
          Address: "Address",
          "City/Town": "City/Town",
          State: "State",
          Zipcode: "Zipcode",
          Date: "Date",
          Time: "Time",
          loading: "loading...",
          Cancel: "Cancel",
          Logout: "Logout",
          Error: "Error",
          Description: "Description",
          Sublocations: "Sublocations",
          Objects: "Objects",
          Place: "Place",
          "Postal Code": "Postal Code",
          "House no.": "House no.",
          Street: "Street",
          Checklist: "Checklist",
          Additional: "Additional",
          "No data entered": "No data entered",
          Add: "Add",
          Question: "Question",
          statement: "statement",
          "Type of answer": "Type of answer",
          Selection: "Selection",
          choices: "choices",
          Price: "Price",
          Brand: "Brand",
          Save: "Save",
          "Start Date": "Start Date",
          "End Date": "End Date",
          "Hour Type": "Hour Type",
          Colleague: "Colleague",
          "Project / Work order": "Project / Work order",
          Status: "Status",
          Project: "Project",
          "Project no.": "Project no",
          "Project name.": "Project name",
          Client: "Client",
          Deadline: "Deadline",
          Status: "Status",
          Progress: "Progress",
          "External Employee": "External Employee",
          "Edit timesheet": "Edit timesheet",
          "Client Name": "Client Name",
          "Search Project No": "Search Project No",
          "Company Name": "Company Name",
          "Phone Number": "Phone Number",
          "Search Client": "Search Client",
          "Search Employee": "Search Employee",
          "Branches / Brands": "Branches / Brands",
          "Article Group": "Article Group",
          "Total hours:": "Total hours:",
          "Total working hours:": "Total working hours:",
          "Total travel hours:": "Total travel hours:",
          "Total break hours:": "Total break hours:",
          "Article Group": "Article Group",
          "Article Number": "Article Number",
          "Selling Price": "Selling Price",
          "	E-mail Address": "E-mail Address",
          "	Enter Here": "Enter Here",
          "No data available": "No data available",
          Reference: "Reference",
          "Start Time": "Start Time",
          "End Time": "End Time",
          Approved: "Approved",
          Created: "Created",
          Planned: "Planned",
          "In progress": "In progress",
          Completed: "Completed",
          Invoice: "Invoice",
          "Work order": "Work order",
          Appointments: "Appointments",
          Document: "Document",
          Photos: "Photos",
          Checklists: "Checklists",
          "Location data": "Location data",
          "Work Location": "Work Location",
          Description: "Description",
          Phone: "Description",
          "Work Order details": "Work Order details",
          "Order number": "Order number",
          Task: "Task",
          "Add Services": "Add Services",
          "Task title": "Task title",
          "Task Description": "Task Description",
          Checklist: "Checklist",
          Cancel: "Cancel",
          Save: "Save",
          Saving: "Saving",
          CheckList: "CheckList",
          Articles: "Articles",
          Article_no: "Article_no",
          "Number of units": "Number of units",
          "Select Article Name": "Select Article Name",
          "Type of service": "Type of service",
          "Number of Unit": "Number of Unit",
          Amount: "Amount",
          "Total VAT": "Total VAT",
          Times: "Times",
          Type: "Type",
          "Employee/Equipment": "Employee/Equipment",
          Date: "Date",
          Time: "Time",
          "task Not Started": "task Not Started",
          "Customer Signature": "Customer Signature",
          "Craftsman Signature": "Craftsman Signature",
          "": "",
          "": "",
          "Project Number": "Project Number",
          "Enter Article Group Name": "Enter Article Group Name",
          "Search with Article Number & Name":
            "Search with Article Number & Name",
          "Search With Client name or Email":
            "Search With Client name or Email",
          "If you choose the selection choice answer type, you can define the answers that the user can select. This you then enter choices in the 'selection choices' field. Separate these choices by means of comma.":
            "If you choose the selection choice answer type, you can define the answers that the user can select. This you then enter choices in the 'selection choices' field. Separate these choices by means of comma.",
          "Own selection choice": "Own selection choice",
          "Set your own checklists here. Fill in question, and then choose the type of answer the user should be able to answer enter.":
            "Set your own checklists here. Fill in question, and then choose the type of answer the user should be able to answer enter.",
          "Dividing the checklist into subheadings":
            "Dividing the checklist into subheadings",
          "To keep large checklists organized, you can work with subheadings. Add a line and type in the question statement-field the title of your interhead. Then choose 'title header' as the answer type.":
            "To keep large checklists organized, you can work with subheadings. Add a line and type in the question statement-field the title of your interhead. Then choose 'title header' as the answer type.",
          "Question statement": "Question statement",
          "Type of answer*": "Type of answer*",
          "Time Duration of all Projects": "Time Duration of all Projects",
          "Selection choices": "Selection choices",
          "Additional modules": "Additional modules",
          "Are you sure you want to Logout Alhra ?":
            "Are you sure you want to Logout Alhra ?",
        },
      },
      nl: {
        translation: {
          "Welcome To Alhra": "Welkom bij Alhra",
          "Welcome To ServiceConnect.nl": "Welkom bij DienstAansluiten.nl",
          "Let's get Started !": "Laten we beginnen !",
          Email: "E-mail",
          Password: "Wachtwoord",
          Login: "Inloggen",
          "Logging in...": "Inloggen...",
          "Incorrect email or password": "Onjuist e-mailadres of wachtwoord",
          "Server Error Please Try Again Later!":
            "Serverfout Probeer het later opnieuw!",
          "Forgot Password": "Wachtwoord vergeten",
          "Enter your Email Address": "Vul je e-mailadres in",
          "An email has been sent with instructions to reset your password.If it has not arrived, please check the spam folder of your email.":
            "Er is een e-mail verzonden met instructies om uw wachtwoord opnieuw in te stellen.Als deze niet is aangekomen, controleer dan de spammap van uw e-mail.",
          Back: "Rug",
          Send: "Versturen",
          Assignments: "Opdrachten",
          "To do": "Te doen",
          "Rescheduled appointments": "Afspraken verzet",
          "check work orders": "werkorders controleren",
          "actions to perform": "acties uit te voeren",
          "Today's dashboard": "Het dashboard van vandaag",
          Sale: "Verkoop",
          Performance: "Prestatie",
          Hours: "Uur",
          Invoices: "Facturen",
          Data: "Gegevens",
          Relationship: "Relatie",
          Planning: "Planning",
          Projects: "Projecten",
          Project: "Project",
          "Project no.": "Projectnr",
          "Project name.": "Naam van het project",
          Client: "Cliënt",
          Deadline: "Deadline",
          Status: "Toestand",
          Progress: "Voortgang",
          "Order no": "Bestelnr",
          "Work Orders": "Werk bestellingen",
          Action: "Actie",
          Quotations: "Offertes",
          "Other Activities": "Overige activiteiten",
          Export: "Exporteren",
          "Invoice No": "Factuur nr.",
          Refrence: "Voorbehoud",
          Client: "Klant",
          Amount: "Aantal",
          Articles: "Artikelen",
          Name: "Naam",
          "External Employee": "Externe medewerker",
          "Search Client": "Zoek klant",
          "Search Project No": "Zoek projectnr",
          "Search Employee": "Zoek medewerker",
          "Article group": "Artikel groep",
          "Article number": "Artikelnummer",
          "Selling price": "Verkoopprijs",
          Branches: "Takken",
          brands: "Merken",
          Definition: "Definitie",
          Photograph: "Fotograferen",
          Reference: "Referentie",
          "No data available": "Geen gegevens beschikbaar",
          "Article group": "Artikel groep",
          "Start Time": "Starttijd",
          "End Time": "Eindtijd",
          "Project Number": "Projectnummer",
          Approved: "Goedgekeurd",
          Unit: "Eenheid",
          Cost: "Kosten",
          VAT: "BTW",
          "VAT rate": "Btw-tarief",
          rate: "verhouding",
          "G/L Account": "Grootboekrekening",
          Sales: "Verkoop",
          expenses: "uitgaven",
          Dependent: "Afhankelijk",
          "Optional ": "Facultatief",
          Combination: "Combinatie",
          products: "Producten",
          Customers: "Klanten",
          number: " getal",
          "Company ": "Bedrijf",
          Address: "Adres",
          "City/Town": "Stad/Dorp",
          State: "Staat",
          Zipcode: "Postcode",
          Date: "Datum",
          Time: "Tijd",
          loading: "Laden...",
          Cancel: "Annuleren",
          Logout: "Uitloggen",
          Error: "Fout",
          Description: "Beschrijving",
          Sublocations: "Sublocaties",
          Objects: "Voorwerpen",
          Place: "Plaats",
          Price: "Prijs",
          Brand: "Merk",
          "Postal Code": "Postcode",
          "House no.": "Huisnummer.",
          Street: "Straat",
          Checklist: "Controlelijst",
          Additional: "Aanvullend",
          "Article Group": "Artikelgroep",
          "Article Number": "Artikel nummer",
          "Selling Price": "Verkoopprijs",
          "No data entered": "Geen gegevens ingevoerd",
          Add: "Toevoegen",
          Question: "Vraag",
          statement: "stelling",
          "Type of answer": "Type antwoord",
          Selection: "Selectie",
          choices: "keuzes",
          Save: "Redden",
          "Phone Number": "Telefoonnummer",
          "Branches / Brands": "Branches / Merken",
          "E-mail Address": "E-mailadres",
          "Enter Here": "Kom hier binnen",
          "Enter Article Group Name": "Voer de naam van de artikelgroep in",
          "Client Name": "klantnaam",
          "Company Name": "Bedrijfsnaam",
          "Total hours:": "Totaal aantal uren:",
          "Total working hours:": "Totaal werkuren:",
          "Total travel hours:": "Totaal reisuren:",
          "Total break hours:": "Totaal pauze-uren:",
          "Start Date": "Begin datum",
          "End Date": "Einddatum",
          "Hour Type": "Uurtype",
          Colleague: "Collega",
          Created: "Gemaakt",
          Planned: "Gepland",
          "In progress": "Bezig",
          Completed: "Voltooid",
          Invoice: "Factuur",
          "Work order": "Werkorder",
          Appointments: "Afspraken",
          Document: "Document",
          Photos: "Foto's",
          Checklists: "Controle lijsten",
          "Location data": "Locatie gegevens",
          "Work Location": "Werk locatie",
          Description: "Beschrijving",
          Phone: "Telefoon",
          "Work Order details": "Details van werkorders",
          "Order number": "Bestellingsnummer",
          Task: "Taak",
          "Add Services": "Diensten toevoegen",
          "Task title": "Titel van de taak",
          "Task Description": "Taakomschrijving",
          Checklist: "Controlelijst",
          Cancel: "Annuleren",
          Save: "Redden",
          Saving: "Besparing",
          CheckList: "Besparing",
          Articles: "Lidwoord",
          Article_no: "Artikel nummer",
          "Number of units": "Aantal eenheden",
          "Select Article Name": "Selecteer Artikelnaam",
          "Number Unit": "Nummereenheid",
          "Type of service": "Soort dienst",
          "Number of Unit": "Aantal eenheden",
          Amount: "Hoeveelheid",
          "Total VAT": "Totale BTW",
          Times: "Keer",
          Type: "Type",
          "Employee/Equipment": "Medewerker/Materiaal",
          Date: "Datum",
          Time: "Tijd",
          "task Not Started": "taak Niet gestart",
          "Customer Signature": "Handtekening van de klant",
          "Craftsman Signature": "Handtekening van de ambachtsman",
          "": "",
          "": "",
          "": "",
          "": "",
          "": "",
          "": "",
          "": "",
          "Project / Work order": "Project / Werkorder",
          "Edit timesheet": "Urenstaat bewerken",
          Status: "Toestand",
          "Time Duration of all Projects": "Tijdsduur van alle projecten",
          "Set your own checklists here. Fill in question, and then choose the type of answer the user should be able to answer enter.":
            "Stel hier uw eigen checklists in. Vul de vraag in en kies vervolgens het type antwoord dat de gebruiker moet kunnen beantwoorden.",
          "Dividing the checklist into subheadings":
            "De checklist in subkoppen verdelen",
          "To keep large checklists organized, you can work with subheadings. Add a line and type in the question statement-field the title of your interhead. Then choose 'title header' as the answer type.":
            "Om grote checklists georganiseerd te houden, kun je met subkoppen werken. Voeg een regel toe en typ in het vraagstellingveld de titel van je interhead. Kies vervolgens 'title header' als antwoordtype.",
          "Own selection choice": "Eigen selectiekeuze",
          "If you choose the selection choice answer type, you can define the answers that the user can select. This you then enter choices in the 'selection choices' field. Separate these choices by means of comma.":
            "Als je kiest voor het selectiekeuze antwoordtype, kun je de antwoorden definiëren die de gebruiker kan selecteren. Deze vul je vervolgens in het veld 'selectiekeuzes' in. Scheid deze keuzes door middel van een komma.",
          "Question statement*": "Vraag verklaring*",
          "Type of answer*": "Soort antwoord*",
          "Selection choices": "Selectie keuzes",
          "Additional modules": "Aanvullende modules",
          "Search with Article Number & Name": "Zoek op Artikelnummer & Naam",
          "Search With Client name or Email":
            "Zoeken met klantnaam of e-mailadres",
          "Are you sure you want to Logout Alhra ?":
            "Weet u zeker dat u wilt uitloggen Alhra?",
        },
      },
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      wait: true,
    },
  });

export default i18n;