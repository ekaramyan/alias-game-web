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
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { usePacks } from '../hooks/usePacksData'
import type { IPack } from '../interfaces/IPacks'
import LoadingDisplay from '../components/LoadingDisplay'
import LoadingError from '../components/LoadingError'

const SelectPack = () => {
	const navigate = useNavigate()
	const [selectedPack, setSelectedPack] = useState<number | null>(null)
	const [hovered, setHovered] = useState<number | null>(null)

	const { packsQuery } = usePacks()

	const handleContinue = () => {
		if (!selectedPack) return
		navigate('/')
	}

	if (packsQuery.isLoading) {
		return <LoadingDisplay />
	}

	if (packsQuery.isError) {
		return <LoadingError title={'Ошибка загрузки паков'} />
	}

	const packs = packsQuery.data || []

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
					{packs.map((pack: IPack) => (
						<Grid size={{ xs: 6, md: 3 }} key={pack.id}>
							<Card
								sx={{
									boxShadow:
										selectedPack === pack.id
											? '0px 0px 6px #1976d2'
											: '0px 0px 4px #ccc',
									borderRadius: 3,
									overflow: 'hidden',
									transition: '0.2s',
									height: 170,
									position: 'relative',
									'&:hover': {
										boxShadow: '0px 0px 6px #1976d2',
										cursor: 'pointer',
									},
								}}
							>
								<CardActionArea
									onClick={() => setSelectedPack(pack.id)}
									onMouseEnter={() => setHovered(pack.id)}
									onMouseLeave={() => setHovered(null)}
									sx={{
										width: '100%',
										height: '100%',
										p: 0,
										m: 0,
										position: 'relative',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',

										backgroundImage: `url(${pack.cover_url})`,
										backgroundSize: 'cover',
										backgroundPosition: 'center',

										transition: '0.3s',
										opacity: hovered === pack.id ? 0.3 : 1,
									}}
								>
									{hovered === pack.id ? (
										<Typography
											sx={{
												fontSize: 16,
												fontWeight: 500,
												color: '#000',
												textAlign: 'center',
												p: 2,
												position: 'absolute',
											}}
										>
											{pack.description}
										</Typography>
									) : (
										<Typography
											variant='h6'
											fontWeight={700}
											sx={{
												color: '#000',
												textShadow: '0 0 6px rgba(0,0,0,0.6)',
												textAlign: 'center',
												position: 'absolute',
												px: 2,
											}}
										>
											{pack.name}
										</Typography>
									)}
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
