import { Link } from "react-router-dom";
<<<<<<< HEAD
import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";

export const Navbar = () => {
    const { favorites } = useContext(FavoritesContext);
=======

export const Navbar = () => {
>>>>>>> 79bab98201105d32cd7247f5b4b06eb489c47a8d

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
<<<<<<< HEAD
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
=======
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Check the Context in action</button>
>>>>>>> 79bab98201105d32cd7247f5b4b06eb489c47a8d
					</Link>
				</div>
			</div>
		</nav>
	);
};