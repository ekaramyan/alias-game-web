import { createBrowserRouter } from 'react-router-dom'
import App from '../App'

import Home from '../pages/Home'
import Teams from '../pages/Teams'
import Settings from '../pages/Settings'
import SelectPack from '../pages/SelectPack'
import Game from '../pages/Game'
import History from '../pages/History'

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{ path: '/', element: <Home /> },
			{ path: '/teams', element: <Teams /> },
			{ path: '/settings', element: <Settings /> },
			{ path: '/packs', element: <SelectPack /> },
			{ path: '/game', element: <Game /> },
			{ path: '/history', element: <History /> },
		],
	},
])

export default router
