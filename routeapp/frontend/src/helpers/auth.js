export function getAuthToken() {
    const token = localStorage.getItem('token');
    if (token) {
        const expiration = getTokenExpirationDate();
        if (expiration < 0) {
            return 'EXPIRED';
        }
        return token;
    }
    return null;
}

export function getTokenExpirationDate() {
    const tokenExpiration = localStorage.getItem('expiration');
    const expDate = new Date(tokenExpiration);
    const nowDate = new Date();
    const expiresIn = expDate.getTime() -  nowDate.getTime();

    return expiresIn;
}