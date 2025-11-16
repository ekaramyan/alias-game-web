import { Outlet } from 'react-router-dom'
import './App.css'

function App() {
	return (
		<div className='app-shell'>
			{/* <Header /> и прочие оболочки */}

			<main className='app-content'>
				<Outlet />
			</main>

			{/* <Footer /> */}
		</div>
	)
}

export default App
