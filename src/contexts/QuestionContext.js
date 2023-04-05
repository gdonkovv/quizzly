import { createContext, useContext, useEffect, useState } from "react";
import { questionsService } from "../services/questionsService";
import { useAuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { validateQuestionForm } from "../components/common/Validators";

export const QuestionContext = createContext();

export const QuestionProvider = ({
    children,
}) => {
    const navigate = useNavigate();
    const { userId, userUsername, token, userAnsweredQuestionsIds } = useAuthContext();

    const [createdByUser, setCreatedByUser] = useState([]);
    const [answeredByUser, setAnsweredByUser] = useState([]);

    useEffect(() => {
        questionsService.getUserCreatedQuestions(userId)
            .then(result => {
                setCreatedByUser(result);
            });

        questionsService.getUserAnsweredQuestions(userAnsweredQuestionsIds)
            .then(result => {
                setAnsweredByUser(result);
            });
    }, [userId, userAnsweredQuestionsIds]);

    function updateCreatedByUser() {
        questionsService.getUserCreatedQuestions(userId)
            .then(result => {
                setCreatedByUser(result);
            });
    }


    const onCreateSubmit = async (values, onError) => {
        try {
            const error = validateQuestionForm(values);
            if (error) {
                throw new Error(error.message);
            }

            await questionsService.createQuestion({ ...values, author: userUsername }, token);

            updateCreatedByUser();

            navigate('/my-questions');
        } catch (error) {
            onError(error);
            // console.log('There is a problem with creating the question');
        }
    }

    const onDeleteClick = async (questionId, onError) => {
        try {
            // eslint-disable-next-line no-restricted-globals
            let response = confirm("Are you sure you want to delete this question?");
            if (response) {
                await questionsService.deleteQuestion(questionId, token);

                updateCreatedByUser();

                navigate('/my-questions');
            }

        } catch (error) {
            onError(error);
            // console.log('There is a problem with deleting the question');
        }
    }

    const onEditSubmit = async (questionId, values, onError) => {

        try {
            const error = validateQuestionForm(values);
            if (error) {
                throw new Error(error.message);
            }

            await questionsService.editQuestion(questionId, { ...values, author: userUsername }, token);

            updateCreatedByUser();

            navigate('/my-questions');
        } catch (error) {
            onError(error);
            // console.log('There is a problem with editing the question');
        }
    };

    const getQuestion = (questionId) => {
        let matchInCreated = createdByUser.find(q => q._id === questionId);
        let matchInAnswered = answeredByUser.find(q => q._id === questionId);

        if (matchInCreated) {
            return matchInCreated;
        } else if (matchInAnswered) {
            return matchInAnswered;
        } else {
            return null;
        }
    };

    const contextValues = {
        onCreateSubmit,
        onEditSubmit,
        onDeleteClick,
        createdByUser,
        answeredByUser,
        getQuestion
    };

    return (
        <QuestionContext.Provider value={contextValues}>
            {children}
        </QuestionContext.Provider>
    );
};

export const useQuestionContext = () => {
    const context = useContext(QuestionContext);

    return context;
};