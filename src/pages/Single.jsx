import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./single.css";

export const Single = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { entity, uid } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const apiEntity = entity === "characters" ? "people" : entity;
        const url = `https://www.swapi.tech/api/${apiEntity}/${uid}`;
        console.log("Fetching data from:", url); 
        
        const response = await fetch(url);
        const result = await response.json();

        if (!response.ok || !result.result) {
          throw new Error(result.detail || "Error al cargar los datos");
        }

        setData(result.result.properties);
    } catch (err) {
      console.error("Error fetching data: ", err);
      setError(`No se pudo cargar la información de ${err.message}.`);
    } finally {
      setLoading(false);
    }
  };

  if (entity && uid) {
    fetchData();
  }
}, [entity, uid]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error || !data) return <div className="error">{error || "Elemento no encontrado"}</div>;

  const renderAttributes = () => {
    switch (entity) {
      case "people":
        return (
          <>
            <p className="description">
              {`${data.name} is a Star Wars character.`}
              {data.gender === "n/a"
                ? "It is a droid with no defined gender."
                : `It is a ${data.gender} character.`}
            </p>
            <div className="attribute-block"><span className="attr-title">Height</span><span className="attr-value">{data.height} cm</span></div>
            <div className="attribute-block"><span className="attr-title">Mass</span><span className="attr-value">{data.mass} kg</span></div>
            <div className="attribute-block"><span className="attr-title">Birth Year</span><span className="attr-value">{data.birth_year}</span></div>
            <div className="attribute-block"><span className="attr-title">Skin Color</span><span className="attr-value">{data.skin_color}</span></div>
            <div className="attribute-block"><span className="attr-title">Eye Color</span><span className="attr-value">{data.eye_color}</span></div>
          </>
        );
      case "vehicles":
        return (
          <>
            <p className="description">{`${data.name} is a vehicle used in the Star Wars universe.`}</p>
            <div className="attribute-block"><span className="attr-title">Model</span><span className="attr-value">{data.model}</span></div>
            <div className="attribute-block"><span className="attr-title">Manufacturer</span><span className="attr-value">{data.manufacturer}</span></div>
            <div className="attribute-block"><span className="attr-title">Cost</span><span className="attr-value">{data.cost_in_credits} credits</span></div>
            <div className="attribute-block"><span className="attr-title">Crew</span><span className="attr-value">{data.crew}</span></div>
            <div className="attribute-block"><span className="attr-title">Passengers</span><span className="attr-value">{data.passengers}</span></div>
          </>
        );
      case "planets":
        return (
          <>
            <p className="description">{`${data.name} is a planet in the Star Wars galaxy.`}</p>
            <div className="attribute-block"><span className="attr-title">Climate</span><span className="attr-value">{data.climate}</span></div>
            <div className="attribute-block"><span className="attr-title">Terrain</span><span className="attr-value">{data.terrain}</span></div>
            <div className="attribute-block"><span className="attr-title">Population</span><span className="attr-value">{data.population}</span></div>
            <div className="attribute-block"><span className="attr-title">Diameter</span><span className="attr-value">{data.diameter} km</span></div>
            <div className="attribute-block"><span className="attr-title">Gravity</span><span className="attr-value">{data.gravity}</span></div>
          </>
        );
      default:
        return <p>No hay atributos disponibles para esta entidad.</p>;
    }
  };

  return (
    <div className="starwars-detail-container">
      <Link to="/" className="back-button">← return to the menu</Link>
      <div className="starwars-detail-info">
        <h1>{data.name}</h1>
        <div className="starwars-detail-attributes">{renderAttributes()}</div>
      </div>
    </div>
  );
};

export default Single;
