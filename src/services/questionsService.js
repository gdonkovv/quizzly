const baseUrl = 'http://localhost:3030/data/questions';

const getRandomUnansweredQuestion = async (userId, answeredQuestionsIds) => {
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    if (answeredQuestionsIds) {

        const response = await fetch(`${baseUrl}`);

        const result = await response.json();


        const allUnansweredQuestionsIds = result.filter(q => {
            return (answeredQuestionsIds.includes(q._id) === false && q._ownerId !== userId);
        }).map(q => q._id);

        if (allUnansweredQuestionsIds.length === 0) {
            return null;
        }

        const randomIndex = getRandomInt(allUnansweredQuestionsIds.length);

        const question = await fetch(`${baseUrl}/${allUnansweredQuestionsIds[randomIndex]}`);
        const questionResult = await question.json();

        return questionResult;
    } else {
        const response = await fetch(`${baseUrl}`);

        const result = await response.json();

        const randomIndex = getRandomInt(result.length);

        const question = await fetch(`${baseUrl}/${result[randomIndex]._id}`);
        const questionResult = await question.json();

        return questionResult;
    }

};

const getUserAnsweredQuestions = async (answeredQuestionsIds) => {
    if (answeredQuestionsIds) {
        const response = await fetch(`${baseUrl}`);

        const result = await response.json();

        const finalResult = result.filter(q => {
            return answeredQuestionsIds.includes(q._id);
        })

        return finalResult;
    } else {
        return [];
    }
};

const getUserCreatedQuestions = async (userId) => {
    const response = await fetch(`${baseUrl}`);

    const result = await response.json();

    const createdQuestions = result.filter(q => {
        return q._ownerId === userId;
    });

    return createdQuestions;
};

const createQuestion = async (data, token) => {
    const response = await fetch(`${baseUrl}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Authorization": token
        },
        body: JSON.stringify(data)
    });
    const result = await response.json();

    return result;
}

const editQuestion = async (questionId, data, token) => {
    const response = await fetch(`${baseUrl}/${questionId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "X-Authorization": token
        },
        body: JSON.stringify(data)
    });
    const result = await response.json();

    return result;
}

const deleteQuestion = async (questionId, token) => {
    const response = await fetch(`${baseUrl}/${questionId}`, {
        method: "DELETE",
        headers: {
            "X-Authorization": token
        }
    });
    const result = await response.json();

    return result;
}

const getQuestionDetailsById = async (questionId) => {
    const response = await fetch(`${baseUrl}/${questionId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const result = await response.json();

    return result;
}

const getTop3Authors = async () => {
    const response = await fetch(`${baseUrl}`);

    const result = await response.json();

    const uniqueAuthors = [];

    for (let x of result) {
        let match = uniqueAuthors.filter(a => a.id === x._ownerId);

        if (match.length === 0) {
            uniqueAuthors.push({
                id: x._ownerId,
                username: x.author
            });
        }
    }

    const sorted = uniqueAuthors.sort((a, b) => {
        return result.filter(x => x._ownerId === b.id).length - result.filter(x => x._ownerId === a.id).length;
    });

    const finalResult = sorted.slice(0, 3).map((x, i) => {
        return {
            username: x.username,
            rank: i + 1,
            questionsCreated: result.filter(q => q._ownerId === x.id).length
        }
    });

    return finalResult;
}

export const questionsService = {
    getRandomUnansweredQuestion,
    getUserAnsweredQuestions,
    getUserCreatedQuestions,
    createQuestion,
    editQuestion,
    deleteQuestion,
    getQuestionDetailsById,
    getTop3Authors
};