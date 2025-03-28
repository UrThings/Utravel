
const api = {

    get: async (url) => {
        const response = await fetch(url);
        return response.json();
    },
    post: async (url, data) => {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return response.json();
    },
    delete: async (url) => {
        const response = await fetch(url, {
            method: "DELETE",
        });
        return response.json();
    },
};
