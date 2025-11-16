import React from 'react'
import { Box, Typography, Button, Stack, Paper } from '@mui/material'
import { useNavigate } from 'react-router-dom'
// import image from '../assets/memes/5f09150dc4eb182b13276b1d87db300c.jpg'

const Home = () => {
	const navigate = useNavigate()

	return (
		<Box
			sx={{
				minHeight: '100vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				background: '#f5f5f5',
			}}
		>
			<Paper
				elevation={4}
				sx={{
					p: 5,
					borderRadius: 3,
					minWidth: 380,
					maxWidth: '100vw',
					width: '100%',
					textAlign: 'center',
				}}
			>
				<Typography variant='h4' fontWeight={700} mb={3}>
					Alias
				</Typography>
				{/* <img src={image} /> */}

				<Stack spacing={2}>
					<Button
						variant='contained'
						size='large'
						color='success'
						onClick={() => navigate('/game')}
					>
						Начать игру
					</Button>

					<Button
						variant='contained'
						size='large'
						onClick={() => navigate('/teams')}
					>
						Команды
					</Button>

					<Button
						variant='contained'
						size='large'
						onClick={() => navigate('/packs')}
					>
						Выбрать пак слов
					</Button>

					<Button
						variant='contained'
						size='large'
						onClick={() => navigate('/settings')}
					>
						Настройки
					</Button>

					<Button
						variant='outlined'
						size='large'
						onClick={() => navigate('/history')}
					>
						История игр
					</Button>
				</Stack>
			</Paper>
		</Box>
	)
}

export default Home
