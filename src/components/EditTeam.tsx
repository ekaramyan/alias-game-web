import React, { useState, useEffect } from 'react'
import { Avatar, Grid, IconButton, Paper, TextField } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import type { IEditTeam } from '../interfaces/ITeams'
import { useDebounce } from 'use-debounce'

const EditTeam = ({
	teamCount,
	team,
	handleNameChange,
	removeTeam,
	setEditAvatarOpen,
	setSelectedTeamId,
}: IEditTeam) => {
	const [teamName, setTeamName] = useState(team.name)
	const [debouncedTeamName] = useDebounce(teamName, 2000)

	useEffect(() => {
		if (debouncedTeamName !== team.name) {
			handleNameChange(team.id, debouncedTeamName)
		}
	}, [debouncedTeamName])

	return (
		<Grid size={{ xs: 12 }} key={team.id}>
			<Paper
				sx={{
					p: 2,
					display: 'flex',
					alignItems: 'center',
					gap: 2,
				}}
				elevation={1}
			>
				<Avatar
					src={team.avatarUrl}
					alt={team.name}
					sx={{ width: 50, height: 50, borderRadius: 2, cursor: 'pointer' }}
					imgProps={{
						onError: e => (e.currentTarget.src = '/avatars/default.png'),
					}}
					onClick={() => {
						setSelectedTeamId(team.id)
						setEditAvatarOpen(true)
					}}
				/>

				<TextField
					label='Название команды'
					value={teamName}
					onChange={e => setTeamName(e.target.value)}
					fullWidth
				/>

				<IconButton
					color='error'
					onClick={() => removeTeam(team.id)}
					disabled={teamCount <= 2}
				>
					<DeleteIcon />
				</IconButton>
			</Paper>
		</Grid>
	)
}

export default EditTeam
