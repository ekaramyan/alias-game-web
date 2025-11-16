import React, { useState } from 'react'
import {
	Box,
	Paper,
	Typography,
	TextField,
	IconButton,
	Button,
	Stack,
	Grid,
	Avatar,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useNavigate } from 'react-router-dom'
import EditTeam from '../components/EditTeam'
import EditAvatarModal from '../components/EditAvatarModal'

interface Team {
	id: number
	name: string
	avatarUrl: string
}

const Teams = () => {
	const navigate = useNavigate()

	const [teams, setTeams] = useState<Team[]>([
		{ id: 1, name: 'Команда 1', avatarUrl: '/avatars/team1.png' },
		{ id: 2, name: 'Команда 2', avatarUrl: '/avatars/team2.png' },
	])
	const [editAvatarOpen, setEditAvatarOpen] = useState(false)
	const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null)
	const handleNameChange = (id: number, value: string) => {
		setTeams(prev => prev.map(t => (t.id === id ? { ...t, name: value } : t)))
	}

	const handleAvatarChange = (id: number, value: string) => {
		setTeams(prev =>
			prev.map(t => (t.id === id ? { ...t, avatarUrl: value } : t))
		)
	}

	const addTeam = () => {
		const nextId = teams.length ? Math.max(...teams.map(t => t.id)) + 1 : 1

		setTeams([
			...teams,
			{
				id: nextId,
				name: `Команда ${nextId}`,
				avatarUrl: '/avatars/default.png',
			},
		])
	}

	const removeTeam = (id: number) => {
		if (teams.length <= 2) return
		setTeams(prev => prev.filter(t => t.id !== id))
	}

	const handleContinue = () => {
		console.log('Сохраненные команды:', teams)
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
					{teams.map(team => (
						<EditTeam
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
					onUploaded={function (url: string): void {
						throw new Error('Function not implemented.')
					}}
				/>
			)}
		</Box>
	)
}

export default Teams
