import React, { useState } from 'react'
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	Stack,
	Typography,
} from '@mui/material'

interface Props {
	open: boolean
	teamId: number
	onClose: () => void
	onUploaded: (url: string) => void
}

const EditAvatarModal: React.FC<Props> = ({
	open,
	teamId,
	onClose,
	onUploaded,
}) => {
	const [file, setFile] = useState<File | null>(null)
	const [loading, setLoading] = useState(false)

	const handleUpload = async () => {
		if (!file) return

		// try {
		// 	setLoading(true)

		// 	const formData = new FormData()
		// 	formData.append('avatar', file)

		// 	const res = await fetch(`/api/teams/${teamId}/avatar`, {
		// 		method: 'POST',
		// 		body: formData,
		// 	})

		// 	if (!res.ok) throw new Error('Ошибка загрузки')

		// 	const data = await res.json()

		// 	onUploaded(data.url)

		// 	onClose()
		// } catch (err) {
		// 	console.error(err)
		// } finally {
		// 	setLoading(false)
		// }
	}

	return (
		<Dialog open={open} onClose={onClose} maxWidth='xs' fullWidth>
			<DialogTitle>Загрузка аватара</DialogTitle>

			<DialogContent>
				<Stack spacing={2}>
					<Typography variant='body2'>Выберите картинку для команды</Typography>

					<input
						type='file'
						accept='image/*'
						onChange={e => {
							const f = e.target.files?.[0] || null
							setFile(f)
						}}
					/>
				</Stack>
			</DialogContent>

			<DialogActions>
				<Button onClick={onClose} disabled={loading}>
					Отмена
				</Button>
				<Button
					variant='contained'
					onClick={handleUpload}
					disabled={!file || loading}
				>
					{loading ? 'Загрузка…' : 'Сохранить'}
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default EditAvatarModal
