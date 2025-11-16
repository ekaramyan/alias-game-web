import React, { useState } from 'react'
import {
	Box,
	Paper,
	Typography,
	TextField,
	Button,
	MenuItem,
	Stack,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import SaveDialog from '../components/SaveDialog'
import StatusAlert from '../components/StatusAlert'

const timesPerRound = [30, 60, 90, 120]
const winScores = [10, 25, 50, 75, 100, 125, 150]
const difficulties = [
	{ value: 'easy', title: 'Легко' },
	{ value: 'medium', title: 'Средне' },
	{ value: 'hard', title: 'Сложно' },
]

const Settings = () => {
	const navigate = useNavigate()

	const [timePerRound, setTimePerRound] = useState(timesPerRound[1])
	const [winScore, setWinScore] = useState(winScores[1])
	const [difficulty, setDifficulty] = useState('medium')

	const [snackbarOpen, setSnackbarOpen] = useState(false)
	const [snackbarStatus, setSnackbarStatus] = useState<'success' | 'error'>(
		'success'
	)

	const [dialogOpen, setDialogOpen] = useState(false)

	const handleSubmit = () => {
		try {
			// mockup
			console.log({
				timePerRound,
				winScore,
				difficulty,
			})

			setSnackbarStatus('success')
			setSnackbarOpen(true)
			setDialogOpen(true)
		} catch (err) {
			console.error(err)
			setSnackbarStatus('error')
			setSnackbarOpen(true)
		}
	}

	return (
		<Box
			sx={{
				minHeight: '100vh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				background: '#f5f5f5',
			}}
		>
			<Paper
				elevation={4}
				sx={{
					p: 5,
					borderRadius: 3,
					width: 450,
				}}
			>
				<Stack direction='row' justifyContent='space-between' mb={2}>
					<Button variant='outlined' onClick={() => navigate('/')}>
						Назад
					</Button>
				</Stack>

				<Typography variant='h4' mb={3} fontWeight={700}>
					Настройки игры
				</Typography>

				<Stack spacing={3}>
					<TextField
						select
						type='number'
						label='Время раунда'
						value={timePerRound}
						onChange={e => setTimePerRound(Number(e.target.value))}
						fullWidth
					>
						{timesPerRound.map(time => (
							<MenuItem key={time} value={time}>
								{time}
							</MenuItem>
						))}
					</TextField>

					<TextField
						select
						type='number'
						label='Очки для победы'
						value={winScore}
						onChange={e => setWinScore(Number(e.target.value))}
						fullWidth
					>
						{winScores.map(score => (
							<MenuItem key={score} value={score}>
								{score}
							</MenuItem>
						))}
					</TextField>

					<TextField
						select
						label='Сложность'
						value={difficulty}
						onChange={e => setDifficulty(e.target.value)}
						fullWidth
					>
						{difficulties.map((diff: { title: string; value: string }) => (
							<MenuItem value={diff.value}>{diff.title}</MenuItem>
						))}
					</TextField>

					<Button variant='contained' size='large' onClick={handleSubmit}>
						Сохранить
					</Button>
				</Stack>
			</Paper>

			<StatusAlert
				isOpen={snackbarOpen}
				setIsOpen={setSnackbarOpen}
				status={snackbarStatus}
			/>
			<SaveDialog
				isOpen={dialogOpen}
				setIsOpen={setDialogOpen}
				status={'Настройки успешно сохранены'}
				message={'Все параметры успешно обновлены. Вернуться на главное меню?'}
			/>
		</Box>
	)
}

export default Settings
