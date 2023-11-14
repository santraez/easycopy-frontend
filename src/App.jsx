import { AppProvider } from "./context/AppContext";
import { HomePage } from "./pages/HomePage";
import "./App.sass";

const App = () => {
  return (
    <AppProvider>
      <HomePage />
    </AppProvider>
  );
};

export default App;