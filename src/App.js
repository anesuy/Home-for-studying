import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/zones/Header";
import Footer from "./components/zones/Footer";
import Create from "./components/notes/Create";
import Notes from "./components/notes/Notes";
import { NotesProvider } from "./context/notesContext";

function App() {
  return (
    <NotesProvider>
      <Router>
        <Header />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <Create />
                <Notes />
              </>
            }
          />
        </Routes>
      </Router>
      <Footer />
    </NotesProvider>
  );
}

export default App;
