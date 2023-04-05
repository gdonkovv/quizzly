import { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { questionsService } from "../../services/questionsService";
import { AuthContext } from "../../contexts/AuthContext";
import { userStatsService } from "../../services/userStatsService";
import { useQuestionContext } from "../../contexts/QuestionContext";

import "./Details.css";

export const Details = ({ onError }) => {
    const { questionId } = useParams();
    const { onDeleteClick } = useQuestionContext();

    const [question, setQuestion] = useState({});
    const [correctRes, setCorrectRes] = useState(0);
    const [wrongRes, setWrongRes] = useState(0);

    const { userId } = useContext(AuthContext);

    useEffect(() => {
        questionsService.getQuestionDetailsById(questionId)
            .then(result => {
                setQuestion(result);
            });

        userStatsService.getQuestionSuccessRate(questionId)
            .then(result => {
                setCorrectRes(result.correctRes);
                setWrongRes(result.wrongRes);
            });
    }, [questionId])



    return (
        <section className="details">
            <h2>Question Details</h2>
            <div className="detailsWrapper">
                <div className="info">
                    <p>Question Text:</p>
                    <p>{question.questionText}</p>
                </div>
                <div>
                    <ul>
                        <li>
                            <div className="info">
                                <p>Option A:</p>
                                <p>{question["option-a"]}</p>
                            </div>
                        </li>
                        <li>
                            <div className="info">
                                <p>Option B:</p>
                                <p>{question["option-b"]}</p>
                            </div>
                        </li>
                        <li>
                            <div className="info">
                                <p>Option C:</p>
                                <p>{question["option-c"]}</p>
                            </div>
                        </li>
                        <li>
                            <div className="info">
                                <p>Option D:</p>
                                <p>{question["option-d"]}</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="info">
                    <p>Correct answer:</p>
                    <p>{question[question["correct"]]}</p>
                </div>
                <div className="info">
                    <p>Users Success Rate:</p>
                    <p>
                        <span className="correct"
                        ><i className="fas fa-check-circle"></i> {correctRes} correct</span>
                        /
                        <span className="wrong"
                        ><i className="fas fa-times-circle"></i> {wrongRes} wrong</span>
                    </p>
                </div>
                <div className="info">
                    <p>Author:</p>
                    <p>{question.author}</p>
                </div>
                {question._ownerId === userId &&
                    <div className="ownerButtonsWrapper">
                        <Link to={`/my-questions/${questionId}/edit`} className="edit">Edit</Link>
                        <button onClick={() => onDeleteClick(questionId, onError)} className="delete">Delete</button>
                    </div>}
            </div>
        </section>
    );
}