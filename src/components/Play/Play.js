import { useEffect, useState } from 'react';

import { useAuthContext } from "../../contexts/AuthContext";
import { useForm } from '../../hooks/useForm';
import { questionsService } from '../../services/questionsService';
import { validatePlay } from '../common/Validators';

import "./Play.css";

export const Play = ({ onError }) => {
    const [timer, setTimer] = useState(30);
    const [question, setQuestion] = useState({
        "questionText": "",
        "option-a": "",
        "option-b": "",
        "option-c": "",
        "option-d": "",
        "correct": "",
    });
    const [isCorrect, setIsCorrect] = useState(false);
    const [hasResponded, setHasResponded] = useState(false);

    const { userId, userAnsweredQuestionsIds, responseSubmitHandler } = useAuthContext();

    const { values, changeHandler, onSubmit, resetValues } = useForm({
        "answer": '',
    }, (values) => {
        const error = validatePlay(values);
        if (error) {
            onError(error);
        } else {
            setIsCorrect(values.answer === question.correct);
            setHasResponded(true);
            responseSubmitHandler(question._id, values.answer === question.correct, onError);
            updateQuestion();
            resetValues();
        }
    });

    useEffect(() => {
        questionsService.getRandomUnansweredQuestion(userId, userAnsweredQuestionsIds)
            .then(result => {
                setQuestion(result);
            });
    }, [userId, userAnsweredQuestionsIds]);

    useEffect(() => {
        setTimeout(() => {
            if (timer > 0 && hasResponded === false && question) {
                setTimer(state => state - 1);
            }
        }, 1000);
    }, [timer, hasResponded]);

    function updateQuestion() {
        questionsService.getRandomUnansweredQuestion(userId, userAnsweredQuestionsIds)
            .then(result => {
                setQuestion(result);
            });
    }

    return (
        <section section className="play" >
            {(question || hasResponded) &&
                <div className="timer">
                    <span>{timer} s</span>
                </div>
            }
            {(timer !== 0 && question && hasResponded === false) &&
                <div className="question">
                    <div className="questionText">
                        <h3>{question.questionText}</h3>
                    </div>
                    <form method="post" onSubmit={onSubmit}>
                        <div className="option">
                            <label htmlFor="option-a">A. {question['option-a']}</label>
                            <input type="radio" name="answer" value="option-a" id="option-a" onChange={changeHandler} />
                            <img src="./images/black-checkmark.png" alt="check" />
                        </div>
                        <div className="option">
                            <label htmlFor="option-b">B. {question['option-b']}</label>
                            <input type="radio" name="answer" value="option-b" id="option-b" onChange={changeHandler} />
                            <img src="./images/black-checkmark.png" alt="check" />
                        </div>
                        <div className="option">
                            <label htmlFor="option-c">C. {question['option-c']}</label>
                            <input type="radio" name="answer" value="option-c" id="option-c" onChange={changeHandler} />
                            <img src="./images/black-checkmark.png" alt="check" />
                        </div>
                        <div className="option">
                            <label htmlFor="option-d">D. {question['option-d']}</label>
                            <input type="radio" name="answer" value="option-d" id="option-d" onChange={changeHandler} />
                            <img src="./images/black-checkmark.png" alt="check" />
                        </div>
                        <div className="submitBtn">
                            <button>Submit</button>
                        </div>
                    </form>
                </div>
            }

            {timer === 0
                &&
                <div className="tryAgain">
                    <img src="./images/clock.png" alt='clock' />
                    <p>Time's up! You were too slow with your response.</p>
                    <button onClick={() => {
                        setTimer(30);
                        updateQuestion();
                    }}>Try With New Question</button>
                </div>
            }

            {(isCorrect === false && hasResponded) &&
                <div className="tryAgain">
                    <img src="./images/red-x.webp" alt='red-x' />
                    <p>Your answer is wrong!</p>
                    <button onClick={
                        () => {
                            setHasResponded(false);
                            setIsCorrect(false);
                            setTimer(30);
                            updateQuestion();
                        }
                    }>Try With New Question</button>
                </div>
            }

            {(isCorrect && hasResponded) &&
                <div className="newQuestion">
                    <img src="./images/check.webp" alt='check' />
                    <p>Great! Your answer is correct!</p>
                    <button onClick={
                        () => {
                            setHasResponded(false);
                            setIsCorrect(false);
                            setTimer(30);
                            updateQuestion();
                        }
                    }>Continue With New Question</button>
                </div>
            }

            {(!question && !hasResponded)
                &&
                <div className="noNewQuestions">
                    <p>There are no new questions for you. You answered it all!</p>
                    <p>Wait for other users to upload more questions.</p>
                </div>
            }
        </section >
    );
}