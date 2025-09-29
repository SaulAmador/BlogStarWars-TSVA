import React, { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import { Link } from "react-router-dom";
import Card from "../components/Card";

const Favorites = () => {
    const { favorites, removeFavorite } = useContext(FavoritesContext);

    if (favorites.length === 0) {
        return (
            <div className="favorites-page">
                <h2>Your favorites</h2>
                <p className="lead">You don't have any favorites yet</p>
                <Link to="/" className="btn btn-primary mt-3">
                    Back to home
                </Link>
            </div>
        );
    }

    return (
        <div className="container py-4">
            <h2 className="mb-4">Your Favorites</h2>
            <div className="row">
                {favorites.map((fav) => (
                    <div key={`${fav.type}-${fav.id}`} className="col-md-4 mb-4">
                        <div className="card h-100">
                            <Card 
                                name={fav.name} 
                                uid={fav.id} 
                                type={fav.type} 
                            />
                            <div className="card-footer bg-transparent border-top-0">
                                <button
                                    onClick={() => removeFavorite(fav.id, fav.type)}
                                    className="btn btn-outline-danger btn-sm w-100"
                                >
                                    Remove from Favorites
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Favorites;
