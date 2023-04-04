import { Routes, Route } from "react-router-dom";

import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { Create } from "./components/Create/Create";
import { Details } from "./components/Details/Details";
import { Edit } from "./components/Edit/Edit";
import { Hero } from "./components/Hero/Hero";
import { Login } from "./components/Login/Login";
import { MyQuestions } from "./components/MyQuestions/MyQuestions";
import { Play } from "./components/Play/Play";
import { Rankings } from "./components/Rankings/Rankings";
import { Register } from "./components/Register/Register";
import { Logout } from "./components/Logout/Logout";

import { AuthProvider } from './contexts/AuthContext';
import { QuestionProvider } from "./contexts/QuestionContext";
import { RouteGuard } from "./components/common/RouteGuard";
import { QuestionOwner } from "./components/common/QuestionOwner";
import { useState } from "react";
import { ErrorBox } from "./components/ErrorBox/ErrorBox";


function App() {
  // TO DO - add validation to forms and display errors when something is wrong

  const [err, setErr] = useState(null);

  const onError = (error) => {
    setErr(error);
    setTimeout(() => {
      setErr(null);
    }, 3000);
  }

  return (
    <AuthProvider>
      <QuestionProvider>
        <div className="App">
          <Header />

          {err && <ErrorBox err={err} />}

          <Routes>
            <Route path='*' element={<h1>404 Not found</h1>} />
            <Route path='/' element={<Hero />} />
            <Route path='/play' element={<Play onError={onError} />} />
            <Route path='/login' element={<Login onError={onError} />} />
            <Route path='/register' element={<Register onError={onError} />} />
            <Route element={<RouteGuard />}>
              <Route path='/my-questions' element={<MyQuestions />} />
              <Route path='/my-questions/:questionId/details' element={<Details onError={onError} />} />
              <Route path='/my-questions/create' element={<Create onError={onError} />} />
              <Route path='/rankings' element={<Rankings />} />
              <Route path='/logout' element={<Logout />} />
              <Route path='/my-questions/:questionId/edit' element={
                <QuestionOwner>
                  <Edit onError={onError} />
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
