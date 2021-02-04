export default function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'))

    if (user && user.accessToken) {
        return { Authorization: 'Bearer' +' '+ user.accessToken} //  For Node.js Express back-end, please use x-access-token header like this: 'x-access-token': user.accessToken ??
    } else {
        return {}
    }
}