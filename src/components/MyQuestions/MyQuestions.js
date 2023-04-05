import { Link } from 'react-router-dom';
import { useQuestionContext } from '../../contexts/QuestionContext';

import "./MyQuestions.css";

export const MyQuestions = () => {
    const { createdByUser, answeredByUser } = useQuestionContext();

    return (
        <section className="myQuestions" >
            <h2>My Quesions</h2>
            <div className="myQuestionsWrapper">
                <div className="createdByUser">
                    <div>
                        <h3>Created By Me</h3>
                        <Link to="create" className="createNewBtn">Create New Question</Link>
                    </div>
                    <ul>
                        {createdByUser.map(q => {
                            return (
                                <li key={q._id}>
                                    <span>{q.questionText}</span>
                                    <Link to={`${q._id}/details`}>View More</Link>
                                </li>
                            );
                        })}

                    </ul>
                </div>
                <div className="answeredByUser">
                    <h3>Answered By Me</h3>
                    <ul>
                        {answeredByUser.map(q => {
                            return (
                                <li key={q._id}>
                                    <span>{q.questionText}</span>
                                    <Link to={`${q._id}/details`}>View More</Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </section>
    );
}