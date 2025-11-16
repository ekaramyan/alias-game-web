import React, { useState } from 'react'
import {
	Box,
	Paper,
	Typography,
	Button,
	Stack,
	Grid,
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

const packs = [
	{ id: 1, name: 'Стандартный пак', img: '/packs/standard.jpg' },
	{ id: 2, name: 'Миксы по говновозу', img: '/packs/advanced.jpg' },
	{ id: 3, name: 'Знаменитые капибары', img: '/packs/expert.jpg' },
	{ id: 4, name: 'Пупы по трукрайму', img: '/packs/mixed.jpg' },
	{ id: 5, name: 'Мемы на уголовку', img: '/packs/mixed.jpg' },
]

const SelectPack = () => {
	const navigate = useNavigate()
	const [selectedPack, setSelectedPack] = useState<number | null>(null)

	const handleContinue = () => {
		if (!selectedPack) return
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
					width: 800,
				}}
			>
				<Typography variant='h4' mb={3} fontWeight={700}>
					Выбор набора
				</Typography>

				<Grid container spacing={3} mb={3}>
					{packs.map(pack => (
						<Grid size={{ xs: 6, md: 3 }} key={pack.id}>
							<Card
								sx={{
									boxShadow:
										selectedPack === pack.id
											? '0px 0px 6px #1976d2'
											: '0px 0px 4px #ccc',
									borderRadius: 3,
									transition: '0.2s',
									'&:hover': {
										boxShadow: '0px 0px 6px #1976d2',
										cursor: 'pointer',
									},
								}}
							>
								<CardActionArea onClick={() => setSelectedPack(pack.id)}>
									<CardMedia
										component='img'
										height='140'
										image={pack.img}
										alt={pack.name}
									/>
									<CardContent>
										<Typography
											variant='h6'
											textAlign='center'
											fontWeight={600}
										>
											{pack.name}
										</Typography>
									</CardContent>
								</CardActionArea>
							</Card>
						</Grid>
					))}
				</Grid>

				<Stack spacing={2}>
					<Button
						variant='contained'
						size='large'
						disabled={!selectedPack}
						onClick={handleContinue}
					>
						Продолжить
					</Button>

					<Button variant='outlined' size='large' onClick={() => navigate('/')}>
						Назад
					</Button>
				</Stack>
			</Paper>
		</Box>
	)
}

export default SelectPack
