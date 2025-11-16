const storage = window.localStorage

const getToken = () => {
	return storage.getItem('accessToken')
}

const setToken = (token: string) => {
	storage.setItem('accessToken', token)
}

const setRefreshToken = (token: string) => {
	storage.setItem('refreshToken', token)
}

const getRefreshToken = () => {
	return storage.getItem('refreshToken')
}

const removeToken = () => {
	storage.removeItem('token')
}

const removeRefreshToken = () => {
	storage.removeItem('refreshToken')
}

export {
	getToken,
	setToken,
	getRefreshToken,
	setRefreshToken,
	removeToken,
	removeRefreshToken,
}
