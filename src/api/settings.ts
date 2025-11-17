/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ISetting } from '../interfaces/ISettings'

import { api } from '../main'

const base = '/v1/settings'

export async function getSettings() {
	const res = await api.get(`${base}/`, {
		headers: { 'Content-Type': 'application/json' },
	})
	return res.data
}

export async function getSettingById(id: number) {
	const res = await api.get(`${base}/${id}`, {
		headers: { 'Content-Type': 'application/json' },
	})
	return res.data
}

export async function createSetting(data: ISetting) {
	const res = await api.post(`${base}/`, data, {
		headers: { 'Content-Type': 'application/json' },
	})
	return res.data
}

export async function updateSetting(id: number, form: ISetting) {
	const res = await api.put(`${base}/${id}`, form, {
		headers: { 'Content-Type': 'application/json' },
	})
	return res.data
}

export async function deleteSetting(id: number) {
	const res = await api.delete(`${base}/${id}`)
	return res.data
}
