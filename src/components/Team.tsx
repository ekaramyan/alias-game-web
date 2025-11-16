import React from 'react'
import { Avatar, Grid, Paper, Typography } from '@mui/material'
import type { ITeam } from '../interfaces/ITeams'

interface TeamProps {
	team: ITeam
}

const Team: React.FC<TeamProps> = ({ team }) => {
	return (
		<Grid size={{ xs: 12 }}>
			<Paper
				sx={{
					p: 2,
					display: 'flex',
					alignItems: 'center',
					gap: 2,
				}}
				elevation={1}
			>
				<Avatar
					src={team.avatarUrl}
					alt={team.name}
					sx={{ width: 50, height: 50, borderRadius: 2 }}
					imgProps={{
						onError: e => (e.currentTarget.src = '/avatars/default.png'),
					}}
				/>

				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<Typography variant='h6'>{team.name}</Typography>
					{team.score !== undefined && (
						<Typography variant='body2' color='text.secondary'>
							Очки: {team.score}
						</Typography>
					)}
				</div>
			</Paper>
		</Grid>
	)
}

export default Team
