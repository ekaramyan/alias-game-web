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
import { useSettings } from '../hooks/useSettingsData'
import type { ISetting } from '../interfaces/ISettings'
import LoadingDisplay from '../components/LoadingDisplay'
import LoadingError from '../components/LoadingError'

const timesPerRound = [30, 60, 90, 120]
const winScores = [10, 25, 50, 75, 100, 125, 150]
const difficulties = [
	{ value: 'easy', title: 'Легко' },
	{ value: 'medium', title: 'Средне' },
	{ value: 'hard', title: 'Сложно' },
]

const Settings = () => {
	const navigate = useNavigate()
	const { settingQuery, createSetting, updateSetting } = useSettings()

	const settingData = settingQuery.data

	const [settingsState, setSettingsState] = useState(() => {
		return {
			timePerRound: settingData?.time_per_round || timesPerRound[1],
			winScore: settingData?.win_score || winScores[1],
			difficulty: settingData?.difficulty || 'medium',
		}
	})

	const [snackbarOpen, setSnackbarOpen] = useState(false)
	const [snackbarStatus, setSnackbarStatus] = useState<'success' | 'error'>(
		'success'
	)

	const [dialogOpen, setDialogOpen] = useState(false)

	const handleSubmit = () => {
		try {
			const payload = {
				time_per_round: settingsState.timePerRound,
				win_score: settingsState.winScore,
				difficulty: settingsState.difficulty,
			} as ISetting

			if (settingData) {
				updateSetting.mutate({ data: payload })
			} else {
				createSetting.mutate({ data: payload })
			}

			setSnackbarStatus('success')
			setSnackbarOpen(true)
			setDialogOpen(true)
		} catch (err) {
			console.error(err)
			setSnackbarStatus('error')
			setSnackbarOpen(true)
		}
	}

	if (settingQuery.isLoading) {
		return <LoadingDisplay />
	}

	if (settingQuery.isError) {
		return <LoadingError title={'Ошибка загрузки настроек'} />
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
						value={settingsState.timePerRound}
						onChange={e =>
							setSettingsState(prev => ({
								...prev,
								timePerRound: Number(e.target.value),
							}))
						}
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
						value={settingsState.winScore}
						onChange={e =>
							setSettingsState(prev => ({
								...prev,
								winScore: Number(e.target.value),
							}))
						}
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
						value={settingsState.difficulty}
						onChange={e =>
							setSettingsState(prev => ({
								...prev,
								difficulty: e.target.value,
							}))
						}
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
