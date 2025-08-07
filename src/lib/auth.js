export function login(email, password) {
    return fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    }).then(res => res.json());
}

export function signup(name, email, password) {
    return fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
    }).then(res => res.json());
}

export function getCurrentUser() {
    if (typeof window !== "undefined") {
        const data = localStorage.getItem("user");
        return data ? JSON.parse(data) : null;
    }
    return null;
}

export function logout() {
    localStorage.removeItem("user");
    document.cookie = "token=; Max-Age=0";
}