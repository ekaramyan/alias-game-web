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

const timesPerRound = [30, 60, 90, 120]
const winScores = [10, 25, 50, 75, 100, 125, 150]

const Settings = () => {
	const [timePerRound, setTimePerRound] = useState(timesPerRound[1])
	const [winScore, setWinScore] = useState(winScores[1])
	// const [language, setLanguage] = useState('ru')
	const [difficulty, setDifficulty] = useState('medium')

	const handleSubmit = () => {
		// mockup
		console.log({
			timePerRound,
			winScore,
			// language,
			difficulty,
		})
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
						{timesPerRound.map((time: number) => (
							<MenuItem value={time}>{time}</MenuItem>
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
						{winScores.map((time: number) => (
							<MenuItem value={time}>{time}</MenuItem>
						))}
					</TextField>

					{/* <TextField
						select
						label='Язык'
						value={language}
						onChange={e => setLanguage(e.target.value)}
						fullWidth
					>
						<MenuItem value='ru'>Русский</MenuItem>
						<MenuItem value='en'>English</MenuItem>
						<MenuItem value='es'>Español</MenuItem>
						<MenuItem value='zh'>中文</MenuItem>
					</TextField> */}

					<TextField
						select
						label='Сложность'
						value={difficulty}
						onChange={e => setDifficulty(e.target.value)}
						fullWidth
					>
						<MenuItem value='easy'>Лёгкая</MenuItem>
						<MenuItem value='medium'>Средняя</MenuItem>
						<MenuItem value='hard'>Сложная</MenuItem>
					</TextField>

					<Button variant='contained' size='large' onClick={handleSubmit}>
						Сохранить
					</Button>
				</Stack>
			</Paper>
		</Box>
	)
}

export default Settings
