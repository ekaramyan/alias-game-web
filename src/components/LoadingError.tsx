import React from 'react'
import Box from '@mui/material/Box'
import loading_error from '../assets/memes/LoadingError.jpg'

const LoadingError = ({ title }: { title: string }) => {
	return (
		<Box
			sx={{
				minHeight: '100vh',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				color: 'red',
				fontSize: 20,
			}}
		>
			<img src={loading_error} width={301} height={317}/>
			{title}. Кто-то тут обосрался.
		</Box>
	)
}

export default LoadingError
