// React Imports
import React from 'react';

// Store Imports
import { Provider } from 'react-redux';
import reduxStore from '../redux/store';
import { PersistGate } from 'redux-persist/integration/react';

// Component Imports
import AppNavigation from './NavigationContainer'

function App() {
	const { Store, persistor } = reduxStore();
	return (
		<Provider store={Store}>
			<PersistGate loading={null} persistor={persistor}>
				<AppNavigation />
			</PersistGate>
		</Provider>
	);
}

export default App;