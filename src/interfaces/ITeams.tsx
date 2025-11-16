export interface ITeam {
	id: number
	name: string
	avatarUrl: string
}

export interface IEditTeam {
	teamCount: number
	team: ITeam
	handleNameChange: (id: number, value: string) => void
	removeTeam: (id: number) => void
	setEditAvatarOpen: (val: boolean) => void
	setSelectedTeamId: (val: number | null) => void
}
