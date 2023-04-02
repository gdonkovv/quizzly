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
import { userStatsService } from "./services/userStatsService";
import { RouteGuard } from "./components/common/RouteGuard";
import { QuestionOwner } from "./components/common/QuestionOwner";


function App() {


  // TO DO - add validation to forms and display errors when something is wrong

  const navigate = useNavigate();
  const [auth, setAuth] = useState({});
  const [rank, setRank] = useState("");
  const [answeredQuestionsIds, setAnsweredQuestionsIds] = useState([]);

  useEffect(() => {
    if (auth._id) {
      userStatsService.getAllAnsweredQuestionsIds(auth._id)
        .then(result => {
          setAnsweredQuestionsIds(result);
        });

      userStatsService.getUserRank(auth._id)
        .then(result => {
          setRank(result);
        });
    }
  }, [auth._id]);

  function updateUserStats() {
    if (auth._id) {
      userStatsService.getAllAnsweredQuestionsIds(auth._id)
        .then(result => {
          setAnsweredQuestionsIds(result);
        });

      userStatsService.getUserRank(auth._id)
        .then(result => {
          setRank(result);
        });
    } else {
      setRank("");
      setAnsweredQuestionsIds([]);
    }
  }

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

    setRank("");
    setAnsweredQuestionsIds([]);
  };

  const onCreateSubmit = async (values) => {
    try {
      await questionsService.createQuestion({ ...values, author: auth.username }, auth.accessToken);

      navigate('/my-questions');
    } catch (error) {
      console.log('There is a problem with creating the question');
    }
  }

  const onDeleteClick = async (questionId) => {
    try {
      // eslint-disable-next-line no-restricted-globals
      let response = confirm("Are you sure you want to delete this question?");
      if (response) {
        await questionsService.deleteQuestion(questionId, auth.accessToken);
        navigate('/my-questions');
      }

    } catch (error) {
      console.log('There is a problem with deleting the question');
    }
  }

  const onEditSubmit = async (questionId, values) => {
    try {
      await questionsService.editQuestion(questionId, { ...values, author: auth.username }, auth.accessToken);

      navigate('/my-questions');
    } catch (error) {
      console.log('There is a problem with editing the question');
    }
  };

  const responseSubmitHandler = async (questionId, isCorrect) => {
    if (auth.accessToken) {
      const response = await userStatsService.handleResponse(auth._id, auth.username, questionId, isCorrect, auth.accessToken);
      updateUserStats();
    }
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
    userRank: rank,
    userAnsweredQuestionsIds: answeredQuestionsIds
  };

  return (
    <AuthContext.Provider value={contextValues}>
      <div className="App">
        <Header />

        <Routes>
          <Route path='*' element={<h1>404 Not found</h1>} />
          <Route path='/' element={<Hero />} />
          <Route path='/play' element={<Play responseSubmitHandler={responseSubmitHandler} />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          <Route element={<RouteGuard />}>
            <Route path='/my-questions' element={<MyQuestions />} />
            <Route path='/my-questions/:questionId/edit' element={
              <QuestionOwner>
                <Edit onEditSubmit={onEditSubmit} />
              </QuestionOwner>
            } />
            <Route path='/my-questions/:questionId/details' element={<Details onDeleteClick={onDeleteClick} />} />
            <Route path='/my-questions/create' element={<Create onCreateSubmit={onCreateSubmit} />} />
            <Route path='/rankings' element={<Rankings />} />
            <Route path='/logout' element={<Logout />} />
          </Route>
        </Routes>


        <Footer />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
