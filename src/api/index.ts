import axios from 'axios'
// import {
// 	getToken,
// 	getRefreshToken,
// 	setToken,
// 	setRefreshToken,
// 	removeToken,
// 	removeRefreshToken,
// } from '../utils/tokenStorage'
// import { refresh as refreshTokenRequest } from './auth'
import * as teams from './teams'


export const createApi = () => {
	const instance = axios.create({
		baseURL: import.meta.env.VITE_API_URL,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
			'Access-Control-Allow-Credentials': true,
			Accept: 'application/json, application/x-www-form-urlencoded',
		},
	})

	// instance.interceptors.request.use(config => {
	// 	const token = getToken()
	// 	if (token) {
	// 		config.headers['Authorization'] = `Bearer ${token}`
	// 	}
	// 	return config
	// })

	instance.interceptors.response.use(
		res => res,
		async error => {
			// const originalRequest = error.config

			// if (error.response?.status === 401 && !originalRequest._retry) {
			// 	originalRequest._retry = true
			// 	const refreshToken = getRefreshToken()

			// 	if (refreshToken) {
			// 		try {
			// 			const newTokenData = await refreshTokenRequest(refreshToken)

			// 			if (newTokenData) {
			// 				setToken(newTokenData.access_token)
			// 				setRefreshToken(newTokenData.refresh_token)
			// 				originalRequest.headers[
			// 					'Authorization'
			// 				] = `Bearer ${newTokenData.access_token}`
			// 				return instance(originalRequest)
			// 			}
			// 		} catch (refreshError) {
			// 			console.error('Token refresh failed:', refreshError)
			// 		}
			// 	}
			// 	removeToken()
			// 	removeRefreshToken()
			// 	window.location.reload()
			// }

			return Promise.reject(error)
		}
	)

	return instance
}

export const backend = {
	teams
}
