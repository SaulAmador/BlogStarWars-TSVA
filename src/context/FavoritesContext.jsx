import React, { createContext, useState, useEffect } from "react";

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem("starwars-favorites");
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });

    useEffect(() => {
        localStorage.setItem("starwars-favorites", JSON.stringify(favorites));
    }, [favorites]);

    const addFavorite = (item) => {
        if (!favorites.some(fav => fav.id === item.id && fav.type === item.type)) {
            setFavorites(prev => [...prev, item]);
        }
    };

    const removeFavorite = (id, type) => {
        setFavorites(prev => prev.filter(fav => !(fav.id === id && fav.type === type)));
    };

    const isFavorite = (id, type) => {
        return favorites.some(fav => fav.id === id && fav.type === type);
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};
