import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

export default function App() {
  const [page, setPage] = useState("login");

  return (
    <BrowserRouter>

      <Header />
      <Footer />
    </BrowserRouter>
  );
}
