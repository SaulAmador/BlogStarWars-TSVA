import { Link } from "react-router-dom";
import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";

export const Navbar = () => {
    const { favorites } = useContext(FavoritesContext);

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/" className="navbar-brand mb-0 h1">
					Star Wars Blog
				</Link>
				<div className="d-flex align-items-center gap-3">
					<Link 
					to="/favorites" 
					className="btn btn-outline-warning position-relative">
						Favorites
						{favorites.length > 0 && (
							<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
								{favorites.length}
								<span className="visually-hidden">favorites</span>
							</span>
						)}
					</Link>
					<Link to="/demo" className="btn btn-primary">
						Check the Context in action
					</Link>
				</div>
			</div>
		</nav>
	);
};