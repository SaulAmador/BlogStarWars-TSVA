import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'  
import { RouterProvider } from "react-router-dom";  
import { router } from "./routes";  
import { StoreProvider } from './hooks/useGlobalReducer';  
import { FavoritesProvider } from './context/FavoritesContext';

const Main = () => {
    return (
        <React.StrictMode>  
            <StoreProvider> 
                <FavoritesProvider>
                    <RouterProvider router={router}>
                    </RouterProvider>
                </FavoritesProvider>
            </StoreProvider>
        </React.StrictMode>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Main />)
