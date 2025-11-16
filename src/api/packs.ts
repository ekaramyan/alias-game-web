/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IUpdateTeam } from '../interfaces/ITeams'
import { api } from '../main'

const base = '/v1/packs'

export async function getPacks() {
	const res = await api.get(`${base}/`, {
		headers: { 'Content-Type': 'application/json' },
	})
	return res.data
}

export async function getPackById(id: number) {
	const res = await api.get(`${base}/${id}`, {
		headers: { 'Content-Type': 'application/json' },
	})
	return res.data
}

export async function createPack(form: { name: string; avatarUrl?: string }) {
	const res = await api.post(`${base}/`, form, {
		headers: { 'Content-Type': 'application/json' },
	})
	return res.data
}

export async function updatePack(id: number, form: IUpdateTeam) {
	const res = await api.put(`${base}/${id}`, form, {
		headers: { 'Content-Type': 'application/json' },
	})
	return res.data
}

export async function deletePack(id: number) {
	const res = await api.delete(`${base}/${id}`)
	return res.data
}
