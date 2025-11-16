import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { backend } from '../api'
import type { IUpdateTeam } from '../interfaces/ITeams'

export function usePacks() {
	const qc = useQueryClient()
	const packsQuery = useQuery({
		queryKey: ['packs'],
		queryFn: () => backend.packs.getPacks(),
	})

	const createPack = useMutation({
		mutationFn: backend.packs.createPack,
		onSuccess: () => qc.invalidateQueries({ queryKey: ['packs'] }),
	})

	const updatePack = useMutation({
		mutationFn: ({ id, data }: { id: number; data: IUpdateTeam }) =>
			backend.packs.updatePack(id, data),
		onSuccess: () => qc.invalidateQueries({ queryKey: ['packs'] }),
	})

	const deletePack = useMutation({
		mutationFn: backend.packs.deletePack,
		onSuccess: () => qc.invalidateQueries({ queryKey: ['packs'] }),
	})

	return {
		packsQuery,
		createPack,
		updatePack,
		deletePack,
	}
}
