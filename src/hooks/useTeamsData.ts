import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { backend } from '../api'
import type { IUpdateTeam } from '../interfaces/ITeams'

export function useTeams() {
	const qc = useQueryClient()
	const teamsQuery = useQuery({
		queryKey: ['teams'],
		queryFn: () => backend.teams.getTeams(),
	})

	const createTeam = useMutation({
		mutationFn: backend.teams.createTeam,
		onSuccess: () => qc.invalidateQueries({ queryKey: ['teams'] }),
	})

	const updateTeam = useMutation({
		mutationFn: ({ id, data }: { id: number; data: IUpdateTeam }) =>
			backend.teams.updateTeam(id, data),
		onSuccess: () => qc.invalidateQueries({ queryKey: ['teams'] }),
	})

	const deleteTeam = useMutation({
		mutationFn: backend.teams.deleteTeam,
		onSuccess: () => qc.invalidateQueries({ queryKey: ['teams'] }),
	})

	return {
		teamsQuery,
		createTeam,
		updateTeam,
		deleteTeam,
	}
}
