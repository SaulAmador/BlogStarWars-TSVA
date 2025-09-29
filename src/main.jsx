import React from 'react'
import ReactDOM from 'react-dom/client'
<<<<<<< HEAD
import './index.css'  
import { RouterProvider } from "react-router-dom";  
import { router } from "./routes";  
import { StoreProvider } from './hooks/useGlobalReducer';  
import { FavoritesProvider } from './context/FavoritesContext';
=======
import './index.css'  // Global styles for your application
import { RouterProvider } from "react-router-dom";  // Import RouterProvider to use the router
import { router } from "./routes";  // Import the router configuration
import { StoreProvider } from './hooks/useGlobalReducer';  // Import the StoreProvider for global state management
>>>>>>> 79bab98201105d32cd7247f5b4b06eb489c47a8d

const Main = () => {
    return (
        <React.StrictMode>  
<<<<<<< HEAD
            <StoreProvider> 
                <FavoritesProvider>
                    <RouterProvider router={router}>
                    </RouterProvider>
                </FavoritesProvider>
=======
            {/* Provide global state to all components */}
            <StoreProvider> 
                {/* Set up routing for the application */} 
                <RouterProvider router={router}>
                </RouterProvider>
>>>>>>> 79bab98201105d32cd7247f5b4b06eb489c47a8d
            </StoreProvider>
        </React.StrictMode>
    );
}

<<<<<<< HEAD
=======
// Render the Main component into the root DOM element.
>>>>>>> 79bab98201105d32cd7247f5b4b06eb489c47a8d
ReactDOM.createRoot(document.getElementById('root')).render(<Main />)
