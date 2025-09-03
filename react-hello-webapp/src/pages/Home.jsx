import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Sidebar from "../components/Sidebar";

export const Home = () => {
    const [activeSection, setActiveSection] = useState("characters");
	const [currentPage, setCurrentPage] = useState(1);
	const [items, setItems] = useState([]);
	const [totalPages, setTotalPages] = useState(1);
	const [loading, setLoading] = useState(false);
	const [search, setSearch] = useState("");
	const [apiError, setApiError] = useState(false);

    useEffect(() => {
		setLoading(true);
		setApiError(false);
		let url = "";
		if (activeSection === "characters") url = `https://swapi.tech/api/people?page=${currentPage}&limit=10`;
		if (activeSection === "planets") url = `https://swapi.tech/api/planets?page=${currentPage}&limit=10`;
		if (activeSection === "vehicles") url = `https://swapi.tech/api/vehicles?page=${currentPage}&limit=10`;

		fetch (url)
			.then(response => {
				if (!response.ok) throw new Error("API not OK");
				const contentType = response.headers.get("content-type") || "";
				if (!contentType.includes("application/json")) throw new Error("Not JSON");
				return response.json();
			})
			.then(data => {
				setItems(data.results);
				setTotalPages(data.total_pages);
				setLoading(false);
			})
			.catch((err	) => {
				setApiError(true);
				setItems([]);
				setTotalPages(1);
				setLoading(false);
			});
	}, [activeSection, currentPage]);

	const handleSectionChange = (section) => {
		setActiveSection(section);
		setCurrentPage(1);
		setSearch("");
	};

	const filteredItems = items.filter(item => 
		item.name.toLowerCase().includes(search.toLowerCase())
	);

	if (loading) return <div style = {{ color: "#fff" }}>Loading...</div>;

	if (apiError) {
		return (
			<div style = {{ color: "red", padding: "32px" }}>
				Could not connect to the Star Wars API for this section. <br/>
				Please try again later or try another section.
			</div>
		);
	}
	
	return (
		<div style = {{ display: "flex" }}>
			<Sidebar onSelect={handleSectionChange} />
			<div style = {{ flex: 1, padding: "32px" }}>
				<h1 style = {{ color: "#fff" }}>
					{activeSection === "characters" && "Star Wars Characters"}
					{activeSection === "planets" && "Star Wars Planets"}
					{activeSection === "vehicles" && "Star Wars Vehicles"}
				</h1>
			<div style = {{ position: "relative", marginBottom: "20px", width: "300px" }}>
				<input 
					type="text" 
					placeholder="Search" 
					value={search} 
					onChange={(e) => setSearch(e.target.value)}
					style = {{
						padding: "10px 40px 10px 16px",
						width: "100%",
						borderRadius: "8px",
						border: "2px solidrgb(146, 132, 4)",
						background: "#181818",
						color: "#ffe81f",
						fontFamily: "Orbitron, Arial, sans-serif",
						fontSize: "1.1em",
						boxShadow: "0 0 8px 2px #ffe81f44",
						outline: "none",
						transition: "box-shadow 0.3s, border-color 0.3s",
					}}
					onFocus={(e) => e.target.style.boxShadow = "0 0 12px 4pxrgb(207, 191, 49)"}
					onBlur={(e) => e.target.style.boxShadow = "0 0 8px 2px #ffe81f44"}
				/>
				<i 
					className = "fas fa-search" 
					style = {{
						position: "absolute",
						right: "16px",
						top: "50%",
						transform: "translateY(-50%)",
						color: "#ffe81f",
						fontSize: "1.2em",
						pointerEvents: "none"
					}}
				/>
			</div>
					<div style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(5, 1fr)',
					gap: '50px',
					padding: '20px',
					width: '100%',
					boxSizing: 'border-box'
				}}>	
					{items && items.length > 0 ? items.map(item => (
						<Card 
							key={item.uid}
							name={item.name}
							uid={item.uid}
							type={activeSection}
						/>
					)) : <div style={{ color: "#fff", gridColumn: '1 / -1', textAlign: 'center' }}>No items found</div>}
				</div>
				<div style={{ 
					margin: "20px 0", 
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					gap: "8px",
					flexWrap: "wrap",
					padding: "10px 0"
				}}>
					<button 
					onClick = {() => setCurrentPage(p => Math.max(1, p - 1))} 
					disabled = {currentPage === 1}
					style = {{
						background: "#181818",
						color: "#ffe81f",
						border: "2px solid #ffe81f",
						borderRadius: "6px",
						padding: "6px 14px",
						fontFamily: "Orbitron, Arial, sans-serif",
						cursor: currentPage === 1 ? "not-allowed" : "pointer",
					}}
					>Previous</button>
					{Array.from({length: totalPages}, (_, i) => (
						<button
							key = {i + 1}
							onClick = {() => setCurrentPage(i + 1)}
							style = {{
								background: currentPage === i + 1 ? "#ffe81f" : "#181818",
								color: currentPage === i + 1 ? "#181818" : "#ffe81f",
								border: "2px solid #ffe81f",
								borderRadius: "6px",
								padding: "6px 14px",
								fontFamily: "Orbitron, Arial, sans-serif",
								fontWeight: currentPage === i + 1 ? "bold" : "normal",
								cursor: "pointer",
								margin: "0 2px"
							}}
						>{i + 1}</button>
					))}
					<button 
						onClick = {() => setCurrentPage(p => Math.min(totalPages, p + 1))}
						disabled = {currentPage === totalPages}
						style = {{
							background: "#181818",
							color: "#ffe81f",
							border: "2px solid #ffe81f",
							borderRadius: "6px",
							padding: "6px 14px",
							fontFamily: "Orbitron, Arial, sans-serif",
							cursor: currentPage === totalPages ? "not-allowed" : "pointer",
						}}
					>Next</button>
				</div>
			</div>
		</div>
	);
};

export default Home;