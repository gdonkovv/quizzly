const baseUrl = `http://localhost:3030/users`;

export const authService = {
    login: async function (data) {
        const response = await fetch(`${baseUrl}/login`, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.status === 204) {
            return {};
        }

        const result = await response.json();

        if (!response.ok) {
            throw result;
        }

        return result;
    },
    register: async function (data) {

        const response = await fetch(`${baseUrl}/register`, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.status === 204) {
            return {};
        }

        const result = await response.json();

        if (!response.ok) {
            throw result;
        }

        return result;
    },
    logout: async function (token) {
        const headers = {};
        if (token) {
            headers['X-Authorization'] = token;
        }

        const response = await fetch(`${baseUrl}/logout`, {
            method: "GET",
            headers: headers
        });

        if (response.status === 204) {
            return {};
        }

        const result = await response.json();

        if (!response.ok) {
            throw result;
        }

        return result;
    }
};