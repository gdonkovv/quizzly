import { useParams, Outlet, Navigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { useQuestionContext } from '../../contexts/QuestionContext';


export const QuestionOwner = ({
    children,
}) => {
    const { questionId } = useParams();
    const { getQuestion } = useQuestionContext();
    const { userId } = useAuthContext();

    const currentQuestion = getQuestion(questionId);

    if (currentQuestion && currentQuestion._ownerId !== userId) {
        <Navigate to={`/my-questions/${questionId}/details`} replace={true} />
    }

    return children ? children : <Outlet />
};