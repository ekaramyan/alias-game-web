import React from 'react'
import { Alert, Snackbar } from '@mui/material'
import type { IStatusAlert } from '../interfaces/IModal'

const StatusAlert = ({ isOpen, setIsOpen, status }: IStatusAlert) => {
	return (
		<Snackbar
			open={isOpen}
			autoHideDuration={2500}
			onClose={() => setIsOpen(false)}
		>
			<Alert
				onClose={() => setIsOpen(false)}
				severity={status}
				variant='filled'
			>
				{status === 'success' ? 'Настройки сохранены' : 'Ошибка при сохранении'}
			</Alert>
		</Snackbar>
	)
}

export default StatusAlert
