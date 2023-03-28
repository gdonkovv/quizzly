import { Routes, Route } from "react-router-dom";

import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Create } from "./components/Create";
import { Details } from "./components/Details";
import { Edit } from "./components/Edit";
import { Hero } from "./components/Hero";
import { Login } from "./components/Login";
import { MyQuestions } from "./components/MyQuestions";
import { Play } from "./components/Play";
import { Rankings } from "./components/Rankings";
import { Register } from "./components/Register";

function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path='*' element={<h1>404 Not found</h1>} />
        <Route path='/' element={<Hero />} />
        <Route path='/play' element={<Play />} />
        <Route path='/my-questions' element={<MyQuestions />} />
        <Route path='/my-questions/:questionId/details' element={<Details />} />
        <Route path='/my-questions/:questionId/edit' element={<Edit />} />
        <Route path='/my-questions/create' element={<Create />} />
        <Route path='/rankings' element={<Rankings />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>


      <Footer />
    </div>
  );
}

export default App;
