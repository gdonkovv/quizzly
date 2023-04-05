export const validateLogin = (formData) => {
    let error = {};

    if (!formData.email) {
        error.message = "Email is required";
        return error;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        error.message = "Email is invalid";
        return error;
    }

    if (!formData.password) {
        error.message = "Password is required";
        return error;
    }
    return null;
};

export const validateRegister = (formData) => {
    let error = {};

    if (!formData.email) {
        error.message = "Email is required";
        return error;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        error.message = "Email is invalid";
        return error;
    }

    if (!formData.username) {
        error.message = "Username is required";
        return error;
    }

    if (!formData.imageUrl) {
        error.message = "Image URL is required";
        return error;
    }

    if (!formData.password) {
        error.message = "Password is required";
        return error;
    } else if (formData.password.length < 8) {
        error.message = "Password must be at least 8 characters long";
        return error;
    } else if (formData.password !== formData.repass) {
        error.message = "Passwords don't match";
        return error;
    }

    return null;
};

export const validateQuestionForm = (formData) => {
    let error = {};

    if (!formData.questionText) {
        error.message = "Question Text is required";
        return error;
    } else if (formData.questionText.length < 30) {
        error.message = "Question Text must be at least 30 charaters long";
        return error;
    }

    if (!formData["option-a"]) {
        error.message = "Option A is required";
        return error;
    }

    if (!formData["option-b"]) {
        error.message = "Option B is required";
        return error;
    }

    if (!formData["option-c"]) {
        error.message = "Option C is required";
        return error;
    }

    if (!formData["option-d"]) {
        error.message = "Option D is required";
        return error;
    }

    return null;
};

export const validatePlay = (formData) => {
    let error = {};

    if (!formData.answer) {
        error.message = "Please select an answer to submit";
        return error;
    }
    return null;
}