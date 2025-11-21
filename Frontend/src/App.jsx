// src/App.jsx
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <ToastContainer />
      <AppRoutes />   {/* All routing MUST happen here */}
    </>
  );
};

export default App;
