import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userStatsService } from '../services/userStatsService';
import { authService } from '../services/authService';
import { validateLogin, validateRegister } from '../components/common/Validators';

export const AuthContext = createContext();

export const AuthProvider = ({
    children,
}) => {
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

    const onLoginSubmit = async (data, onError) => {
        try {
            const error = validateLogin(data);
            if (error) {
                throw new Error(error.message);
            }

            const result = await authService.login(data);

            setAuth(result);

            navigate('/');
        } catch (error) {
            onError(error);
            // console.log('There is a problem with loggin in.');
        }
    };

    const onRegisterSubmit = async (values, onError) => {
        try {
            const error = validateRegister(values);
            if (error) {
                throw new Error(error.message);
            }

            const result = await authService.register(values);

            setAuth(result);

            navigate('/');
        } catch (error) {
            onError(error);
            // console.log('There is a problem with registering');
        }
    };

    const onLogout = async (token) => {
        await authService.logout(token);

        setAuth({});

        setRank("");
        setAnsweredQuestionsIds([]);
    };

    const responseSubmitHandler = async (questionId, isCorrect, onError) => {
        if (auth.accessToken) {
            try {
                await userStatsService.handleResponse(auth._id, auth.username, questionId, isCorrect, auth.accessToken);
                updateUserStats();
            } catch (error) {
                onError(error);
            }
        }
    }

    const contextValues = {
        responseSubmitHandler,
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
        <>
            <AuthContext.Provider value={contextValues}>
                {children}
            </AuthContext.Provider>
        </>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    return context;
};