import { Routes, Route, useNavigate } from "react-router-dom";

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

import { AuthContext } from './contexts/AuthContext';
import { useEffect, useState } from "react";
import { authService } from "./services/authService";
import { questionsService } from "./services/questionsService";

function App() {

  const navigate = useNavigate();
  const [auth, setAuth] = useState({});
  const [userRank, setUserRank] = useState("");

  useEffect(() => {
    updateUserRank(auth._id);
  }, [auth._id]);

  function updateUserRank(userId) {
    questionsService.getUserRank(userId)
      .then(result => {
        setUserRank(result);
      });
  };

  const onLoginSubmit = async (data) => {
    try {
      const result = await authService.login(data);

      setAuth(result);

      navigate('/');
    } catch (error) {
      console.log('There is a problem with loggin in.');
    }
  };

  const onRegisterSubmit = async (values) => {
    const { repass, ...registerData } = values;
    if (repass !== registerData.password) {
      return;
    }

    try {
      const result = await authService.register(registerData);

      setAuth(result);

      navigate('/');
    } catch (error) {
      console.log('There is a problem with registering');
    }
  };

  const onLogout = async (token) => {
    await authService.logout(token);

    setAuth({});
  };

  const onCreateSubmit = async (values) => {
    try {
      const result = await questionsService.createQuestion({ ...values, author: auth.username }, auth.accessToken);

      navigate('/my-questions');
    } catch (error) {
      console.log('There is a problem with creating the question');
    }
  }

  const onDeleteClick = async (questionId) => {
    try {
      const result = await questionsService.deleteQuestion(questionId, auth.accessToken);

      navigate('/my-questions');
    } catch (error) {
      console.log('There is a problem with deleting the question');
    }
  }

  const responseSubmitHandler = async (values, question) => {
    // You can respond to questions but you cannot edit other users' questions
    // Responses should be saved in user object -> user.responses: [questionId: {correctCount, wrongCount}]

    console.log(values);
    console.log(question);

    // let isCorrect = false;
    // if (values.answer === question.correct) {
    //   isCorrect = true;
    // }
    // const result = await questionsService.respondToQuestion(question, auth._id, isCorrect, auth.accessToken);
    // console.log(result);
  }

  const contextValues = {
    onLoginSubmit,
    onRegisterSubmit,
    onLogout,
    userId: auth._id,
    token: auth.accessToken,
    userEmail: auth.email,
    isAuthenticated: !!auth.accessToken,
    userUsername: auth.username,
    userImageUrl: auth.imageUrl,
    userRank: userRank
  };

  return (
    <AuthContext.Provider value={contextValues}>
      <div className="App">
        <Header />

        <Routes>
          <Route path='*' element={<h1>404 Not found</h1>} />
          <Route path='/' element={<Hero />} />
          <Route path='/play' element={<Play responseSubmitHandler={responseSubmitHandler} />} />
          <Route path='/my-questions' element={<MyQuestions />} />
          <Route path='/my-questions/:questionId/details' element={<Details onDeleteClick={onDeleteClick} />} />
          <Route path='/my-questions/:questionId/edit' element={<Edit />} />
          <Route path='/my-questions/create' element={<Create onCreateSubmit={onCreateSubmit} />} />
          <Route path='/rankings' element={<Rankings />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/logout' element={<Logout />} />
        </Routes>


        <Footer />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
