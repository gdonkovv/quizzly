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
import { Logout } from "./components/Logout";

import { AuthProvider } from './contexts/AuthContext';
import { QuestionProvider } from "./contexts/QuestionContext";
import { RouteGuard } from "./components/common/RouteGuard";
import { QuestionOwner } from "./components/common/QuestionOwner";


function App() {
  // TO DO - add validation to forms and display errors when something is wrong

  return (
    <AuthProvider>
      <QuestionProvider>
        <div className="App">
          <Header />

          <Routes>
            <Route path='*' element={<h1>404 Not found</h1>} />
            <Route path='/' element={<Hero />} />
            <Route path='/play' element={<Play />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route element={<RouteGuard />}>
              <Route path='/my-questions' element={<MyQuestions />} />
              <Route path='/my-questions/:questionId/details' element={<Details />} />
              <Route path='/my-questions/create' element={<Create />} />
              <Route path='/rankings' element={<Rankings />} />
              <Route path='/logout' element={<Logout />} />
              <Route path='/my-questions/:questionId/edit' element={
                <QuestionOwner>
                  <Edit />
                </QuestionOwner>
              } />
            </Route>
          </Routes>

          <Footer />
        </div>
      </QuestionProvider>
    </AuthProvider>
  );
}

export default App;
