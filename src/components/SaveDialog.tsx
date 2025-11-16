import React from 'react'
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import type { ISaveModal } from '../interfaces/IModal'

const SaveDialog = ({
	isOpen,
	setIsOpen,
	status,
	message = '',
}: ISaveModal) => {
	const navigate = useNavigate()
	return (
		<Dialog open={isOpen} onClose={() => setIsOpen(false)}>
			<DialogTitle>{status}</DialogTitle>
			<DialogContent>
				<DialogContentText>{message}</DialogContentText>
			</DialogContent>

			<DialogActions>
				<Button onClick={() => setIsOpen(false)}>Остаться</Button>
				<Button
					variant='contained'
					onClick={() => {
						setIsOpen(false)
						navigate('/')
					}}
				>
					Вернуться в главное меню
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default SaveDialog
