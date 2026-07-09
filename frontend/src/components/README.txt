========================================================================
STUDYCONNECT - COMPONENTS FOLDER EXPLANATION
========================================================================

In React projects, the "components" folder acts as the repository for reusable
UI building blocks. While "pages" represent entire screen views associated
with specific router paths, "components" are smaller, modular, and self-contained
elements that are imported and rendered inside those pages.

To prevent merge conflicts and organize development in a multi-developer team, 
the components folder is structured as follows:

src/components/
├── aditya/         # Components built & managed by Aditya
├── khushboo/       # Components built & managed by Khushboo
└── shared/         # Reusable global components used by the entire team


------------------------------------------------------------------------
1. DIRECTORY BREAKDOWN
------------------------------------------------------------------------

📁 src/components/shared/ (Global UI Blocks)
These are generic, stateless UI elements designed to keep the application's
look and feel consistent. They are highly reusable across all pages:
  * Button.jsx: A standard button layout accepting props like label, onClick, 
    type, and disabled.
  * InputField.jsx: A styled input component for forms (includes labels, 
    placeholder text, and event handlers).
  * Layout.jsx: A wrapper shell ensuring consistent page margin, width, and 
    padding layouts.

📁 src/components/aditya/ (Aditya's Features)
Contains components specific to Aditya's assigned pages (like login, signup,
peer matching, and homepage navigation):
  * Navbar.jsx: The main header navbar containing the brand logo, theme switcher
    (light/dark mode toggle), and conditional auth navigation (e.g., showing 
    Profile and Peers when logged in, or Login/Register when logged out).
  * MatchCard.jsx: Cards representing potential study partners matching subjects
    and availability.

📁 src/components/khushboo/ (Khushboo's Features)
Contains components specific to Khushboo's pages (like notes, study groups,
sessions, and progress tracking):
  * GroupCard.jsx: A card layout displaying details of a study group.
  * NoteCard.jsx: Displays information about uploaded notes and shared study
    materials.
  * SessionCard.jsx: Represents a scheduled study session event.
  * ProgressBar.jsx & LoadingSpinner.jsx: Visual progress feedback indicators.
  * ErrorMessage.jsx: A reusable banner to present application/API errors to users.


------------------------------------------------------------------------
2. KEY DISTINCTION: COMPONENTS VS PAGES
------------------------------------------------------------------------
* Components: The brick and mortar. They do not hook up to router paths
  directly. Instead, they are imported and rendered inside pages. They should
  be modular, generic, and receive data via props.
* Pages (located under src/pages/): These represent the actual route
  destinations (e.g., /match or /notes). They fetch data, manage state,
  and group multiple components together to form a full screen.


------------------------------------------------------------------------
3. COLLABORATION GUIDELINES
------------------------------------------------------------------------
* Modifying Personal Folders: You can freely create and edit components
  under your own folder (aditya/ or khushboo/).
* Modifying Shared Components: Since Button.jsx, InputField.jsx, and Layout.jsx
  are shared, always communicate with the team before modifying their
  structure to prevent breaking other pages.
