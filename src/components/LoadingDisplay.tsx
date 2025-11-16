import { Box, CircularProgress } from '@mui/material'
import React from 'react'

const LoadingDisplay = () => {
	return (
		<Box
			sx={{
				minHeight: '100vh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<CircularProgress />
		</Box>
	)
}

export default LoadingDisplay
