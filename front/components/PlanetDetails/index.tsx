import styles from "./PlanetDetails.module.css";
import {PlanetsResult} from "../../utils/types";

export default function PlanetDetails({planet}: {planet: PlanetsResult }) {
    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>{planet.name}</h2>
            </div>
            <div className={styles.cardContent}>
                <p><strong>Diamètre :</strong> {planet.diameter} km</p>
                <p><strong>Période de rotation :</strong> {planet.rotation_period} heures</p>
                <p><strong>Période orbitale :</strong> {planet.orbital_period} jours</p>
                <p><strong>Gravité :</strong> {planet.gravity}</p>
                <p><strong>Population :</strong> {planet.population}</p>
                <p><strong>Climat :</strong> {planet.climate}</p>
                <p><strong>Terrain :</strong> {planet.terrain}</p>
                <p><strong>Eau en surface :</strong> {planet.surface_water}%</p>
            </div>
        </div>
    );

}