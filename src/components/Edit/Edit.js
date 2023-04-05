import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { questionsService } from "../../services/questionsService";
import { useForm } from "../../hooks/useForm";
import { useQuestionContext } from "../../contexts/QuestionContext";

import "./Edit.css";

export const Edit = ({ onError }) => {
    const { questionId } = useParams();
    const { onEditSubmit } = useQuestionContext();

    const { values, changeHandler, onSubmit, changeValues } = useForm({
        "questionText": "",
        "option-a": "",
        "option-b": "",
        "option-c": "",
        "option-d": "",
        "correct": "",
    }, (values) => onEditSubmit(questionId, values, onError));

    useEffect(() => {
        questionsService.getQuestionDetailsById(questionId)
            .then(result => {
                changeValues(result);
            });
    }, [questionId]);


    return (
        <section className="edit">
            <div className="editFormWrapper">
                <h2>Edit Question</h2>
                <form method="post" onSubmit={onSubmit}>
                    <div>
                        <label htmlFor="questionText">Question Text:</label>
                        <textarea
                            name="questionText"
                            id="questionText"
                            cols="30"
                            rows="4"
                            value={values["questionText"]}
                            onChange={changeHandler}
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor="option-a">Option A:</label>
                        <input type="text" id="option-a" name="option-a" value={values["option-a"]} onChange={changeHandler} />
                    </div>
                    <div>
                        <label htmlFor="option-b">Option B:</label>
                        <input type="text" id="option-b" name="option-b" value={values["option-b"]} onChange={changeHandler} />
                    </div>
                    <div>
                        <label htmlFor="option-c">Option C:</label>
                        <input type="text" id="option-c" name="option-c" value={values["option-c"]} onChange={changeHandler} />
                    </div>
                    <div>
                        <label htmlFor="option-d">Option D:</label>
                        <input type="text" id="option-d" name="option-d" value={values["option-d"]} onChange={changeHandler} />
                    </div>
                    <div>
                        <label htmlFor="correct">Correct Option:</label>
                        <select id="correct" name="correct" value={values["correct"]} onChange={changeHandler}>
                            <option value="option-a">Option A</option>
                            <option value="option-b">Option B</option>
                            <option value="option-c">Option C</option>
                            <option value="option-d">Option D</option>
                        </select>
                    </div>
                    <div className="editQuestionBtn">
                        <input type="submit" value="Update Question" />
                    </div>
                </form>
            </div>
        </section>
    );
}