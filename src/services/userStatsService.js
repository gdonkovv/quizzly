const baseUrl = 'http://localhost:3030/data/userStats';

// {
//     _ownerId,
//     username,
//     answers: [
//         {
//             questionId: 
//             correctRes: 0,
//             wrongRes: 0
//         }
//     ]
// }


const getAllAnsweredQuestionsIds = async (userId) => {
    const response = await fetch(`${baseUrl}`);
    const result = await response.json();

    if (!result.hasOwnProperty("code")) {
        const userStats = result.find(userStats => {
            return userStats._ownerId === userId;
        });

        if (userStats) {
            let idArray = userStats.answers.filter(a => {
                return a.correctRes > 0;
            }).map(a => a.questionId);

            return idArray;
        } else {
            return [];
        }
    } else {
        return [];
    }
}

const getUserRank = async (userId) => {
    const response = await fetch(`${baseUrl}`);
    const result = await response.json();

    let userRank = "";

    if (!result.hasOwnProperty("code")) {
        const userStatsSorted = result.sort((a, b) => {
            return b.answers.filter(x => x.correctRes > 0).length - a.answers.filter(x => x.correctRes > 0).length;
        }).map(x => x._ownerId);

        if (userStatsSorted.includes(userId)) {
            userRank = userStatsSorted.indexOf(userId) + 1;
        }
    }

    return userRank;
}

const getTop3Players = async () => {
    const response = await fetch(`${baseUrl}`);
    const result = await response.json();

    const userStatsSorted = result.sort((a, b) => {
        return b.answers.filter(x => x.correctRes > 0).length - a.answers.filter(x => x.correctRes > 0).length;
    });

    const top3Players = userStatsSorted.map((x, i) => {
        return {
            username: x.username,
            rank: i + 1
        }
    });

    return top3Players;
}

const handleResponse = async (userId, username, questionId, isCorrect, token) => {
    const response = await fetch(`${baseUrl}`);
    const result = await response.json();

    if (!result.hasOwnProperty("code")) {
        const userStats = result.find(userStats => {
            return userStats._ownerId === userId;
        });

        if (userStats) {
            // user has stats
            let question = userStats.answers.find(x => x.questionId === questionId);
            if (question) {
                isCorrect ? question.correctRes += 1 : question.wrongRes += 1;
            } else {
                let correctRes = isCorrect ? 1 : 0;
                let wrongRes = isCorrect ? 0 : 1;

                userStats.answers.push({
                    questionId,
                    correctRes,
                    wrongRes
                });
            }

            const finalResult = await fetch(`${baseUrl}/${userStats._id}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json",
                    "X-Authorization": token
                },
                body: JSON.stringify(userStats)
            });

            return finalResult;
        } else {
            // user has no stats yet
            let stats = {
                username,
                answers: [
                    {
                        questionId: questionId,
                        correctRes: isCorrect ? 1 : 0,
                        wrongRes: isCorrect ? 0 : 1
                    }
                ]
            };

            const finalResult = await fetch(`${baseUrl}`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "X-Authorization": token
                },
                body: JSON.stringify(stats)
            });

            return finalResult;
        }
    }

};

const getQuestionSuccessRate = async (questionId) => {
    const response = await fetch(`${baseUrl}`);
    const result = await response.json();

    let correctRes = 0;
    let wrongRes = 0;

    if (!result.hasOwnProperty("code")) {
        const answersChunks = result.map(q => q.answers);
        for (let chunk of answersChunks) {
            let stats = chunk.find(x => x.questionId === questionId);
            if (stats) {
                correctRes += stats.correctRes;
                wrongRes += stats.wrongRes;
            }
        }
    }

    return {
        correctRes,
        wrongRes
    };
};


export const userStatsService = {
    getAllAnsweredQuestionsIds,
    getUserRank,
    getTop3Players,
    handleResponse,
    getQuestionSuccessRate
}