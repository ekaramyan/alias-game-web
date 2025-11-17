import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { backend } from '../api'
import type { ISetting } from '../interfaces/ISettings'

export function useSettings() {
	const selectedSettingId = Number(localStorage.getItem('selectedSettingId'))
	const qc = useQueryClient()

	const settingsQuery = useQuery({
		queryKey: ['settings'],
		queryFn: () => backend.settings.getSettings(),
	})

	const settingQuery = useQuery({
		queryKey: ['setting', selectedSettingId],
		queryFn: () => backend.settings.getSettingById(selectedSettingId),
		enabled: Boolean(selectedSettingId),
	})

	const createSetting = useMutation({
		mutationFn: ({ data }: { data: ISetting }) =>
			backend.settings.createSetting(data),
		onSuccess: () => qc.invalidateQueries({ queryKey: ['settings'] }),
	})

	const updateSetting = useMutation({
		mutationFn: ({ id, data }: { id?: number; data: ISetting }) =>
			backend.settings.updateSetting(id || selectedSettingId, data),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ['settings'] })
			qc.invalidateQueries({ queryKey: ['setting', selectedSettingId] })
		},
	})

	const deleteSetting = useMutation({
		mutationFn: backend.settings.deleteSetting,
		onSuccess: () => qc.invalidateQueries({ queryKey: ['settings'] }),
	})

	return {
		settingsQuery,
		settingQuery,
		createSetting,
		updateSetting,
		deleteSetting,
	}
}
