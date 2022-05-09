import config from './config.json'

//sample from hw2
// const getAllMatches = async (page, pagesize, league) => {
//     var res = await fetch(`http://${config.server_host}:${config.server_port}/matches/${league}?page=${page}&pagesize=${pagesize}`, {
//         method: 'GET',
//     })
//     return res.json()
// }

//register user
const registerUser = async (username, email, password) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ username: username, email: email, password: password }),
        credentials: 'include',
    })
    return res.json()
}

const loginUser = async (email, password) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: password }),
        credentials: 'include',
    })
    return res.json()
}

const getTweetsSearch = async (startDate, endDate) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/api/tweets?startDate=${startDate}&endDate=${endDate}`, {
        method: 'GET',
    })
    return res.json()
}

const getUsersSearch = async (username) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/api/User?userName=${username}`, {
        method: 'GET',
    })
    return res.json()
}














export {
    registerUser,
    loginUser,
    getTweetsSearch,
    getUsersSearch
}