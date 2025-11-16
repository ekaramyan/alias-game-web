import React, { useState } from 'react'
import { Box, Paper, Typography, Button, Stack, Grid } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useNavigate } from 'react-router-dom'

import EditTeam from '../components/EditTeam'
import EditAvatarModal from '../components/EditAvatarModal'
import { useTeams } from '../hooks/useTeamsData'
import type { ITeam, IUpdateTeam } from '../interfaces/ITeams'
import LoadingDisplay from '../components/LoadingDisplay'
import LoadingError from '../components/LoadingError'

const Teams = () => {
	const navigate = useNavigate()

	const { teamsQuery, createTeam, updateTeam, deleteTeam } = useTeams()

	const [editAvatarOpen, setEditAvatarOpen] = useState(false)
	const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null)

	if (teamsQuery.isLoading) {
		return <LoadingDisplay />
	}

	if (teamsQuery.isError) {
		return <LoadingError title={'Ошибка загрузки команд'} />
	}

	const teams = teamsQuery.data || []

	const handleNameChange = (id: number, value: string) => {
		updateTeam.mutate({ id, data: { name: value } as IUpdateTeam })
	}

	const handleAvatarUploaded = (url: string) => {
		if (!selectedTeamId) return
		updateTeam.mutate({
			id: selectedTeamId,
			data: {
				avatar_url: url,
				name: '',
			},
		})
		setEditAvatarOpen(false)
	}

	const addTeam = () => {
		createTeam.mutate({ name: 'Новая команда', avatarUrl: '' })
	}

	const removeTeam = (id: number) => {
		if (teams.length <= 2) return
		deleteTeam.mutate(id)
	}

	const handleContinue = () => {
		navigate('/')
	}

	return (
		<Box
			sx={{
				minHeight: '100vh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				background: '#f5f5f5',
				p: 2,
			}}
		>
			<Paper
				elevation={4}
				sx={{
					p: 5,
					borderRadius: 3,
					width: 600,
				}}
			>
				<Typography variant='h4' mb={3} fontWeight={700}>
					Команды
				</Typography>

				<Grid container spacing={2} mb={3}>
					{teams.map((team: ITeam) => (
						<EditTeam
							key={team.id}
							teamCount={teams.length}
							team={team}
							handleNameChange={handleNameChange}
							removeTeam={removeTeam}
							setEditAvatarOpen={setEditAvatarOpen}
							setSelectedTeamId={setSelectedTeamId}
						/>
					))}
				</Grid>

				<Stack spacing={2}>
					<Button variant='outlined' startIcon={<AddIcon />} onClick={addTeam}>
						Добавить команду
					</Button>

					<Button variant='contained' size='large' onClick={handleContinue}>
						Далее
					</Button>

					<Button variant='text' size='large' onClick={() => navigate('/')}>
						Назад
					</Button>
				</Stack>
			</Paper>

			{selectedTeamId && (
				<EditAvatarModal
					open={editAvatarOpen}
					teamId={selectedTeamId}
					onClose={() => setEditAvatarOpen(false)}
					onUploaded={handleAvatarUploaded}
				/>
			)}
		</Box>
	)
}

export default Teams
