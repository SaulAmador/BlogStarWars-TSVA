import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FavoritesContext } from "../context/FavoritesContext";

const characterImages = import.meta.glob("../assets/img/characters/*.{jpg,png,jpeg,webp}", { eager: true });
const planetImages = import.meta.glob("../assets/img/planets/*.{jpg,png,jpeg,webp}", { eager: true });
const vehicleImages = import.meta.glob("../assets/img/vehicles/*.{jpg,png,jpeg,webp}", { eager: true });

function getImage(type, name) {
    const normalized = name.toLowerCase().replace(/\s+/g, "-");
    const extensions = [".jpg", ".png", ".jpeg", ".webp"];
    
    let image = {};

    if (type === "characters") image = characterImages;
    if (type === "planets") image = planetImages;
    if (type === "vehicles") image = vehicleImages;
    
    for (const path in image) {
        if (extensions.some(ext => path.endsWith(`/${normalized}${ext}`))) {
            return image[path].default;
        }
    }
    
    return null;
}

const Card = ({ name, uid, type, showFavoriteButton = true }) => {
    const image = getImage(type, name);
    const { addFavorite, removeFavorite, isFavorite } = useContext(FavoritesContext);
    const isFav = isFavorite(uid, type);

    const handleFavoriteClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const item = { id: uid, type, name };

        if (isFav) {
            removeFavorite(uid, type);
        } else {
            addFavorite(item);
        }
    };
    
    return (
        <div className="card h-100" style = {{
            border: "1px solid #333",
            backgroundColor: "#232323",
            position: "relative"
        }}>
            {showFavoriteButton && (
                <button
                    onClick={handleFavoriteClick}
                    style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        background: "rgba(0, 0, 0, 0.6)",
                        border: "none",
                        borderRadius: "50%",
                        width: "32px",
                        height: "32px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        zIndex: 10
                    }}
                    aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
                >
                    <span style={{
                        color: isFav ? "red" : "white",
                        fontSize: "1rem",
                        lineHeight: 1
                    }}>
                        {isFav ? "❤️" : "🤍"}
                    </span>
                </button>
            )}

            <Link to={`/${type}/${uid}`} className="text-decoration-none text-white">
                {image ? (
                    <img
                        src={image}
                        alt={name}
                        className="card-img-top"
                        style={{
                            height: "180px",
                            objectFit: "cover",
                            borderTopLeftRadius: "calc(0.25rem - 1px)",
                            borderTopRightRadius: "calc(0.25rem - 1px)",
                            
                        }}
                    />    
                ) : (
                    <div 
                        className="d-flex align-items-center justify-content-center"
                        style={{
                            height: "180px",
                            backgroundColor: "#444",
                            borderTopRightRadius: "calc(0.25rem - 1px)",
                            borderTopLeftRadius: "calc(0.25rem - 1px)",
                        }}
                    >
                        <span className="text-muted">no image</span>
                    </div>
                )}
                <div className="card-body">
                    <h5 className="card-title" style={{ color: "#fff" }}>{name}</h5>
                    <p className="card-text text-muted">
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                    </p>
                </div>
            </Link> 
        </div>
    );
};

export default Card;