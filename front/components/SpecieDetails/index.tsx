import styles from "./SpecieDetails.module.css";
import {SpeciesResult} from "../../utils/types";

export default function SpeciesDetails({specie}: {specie: SpeciesResult}) {
    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>{specie.name}</h2>
            </div>
            <div className={styles.cardContent}>
                <p><strong>Classification :</strong> {specie.classification}</p>
                <p><strong>Désignation :</strong> {specie.designation}</p>
                <p><strong>Taille moyenne :</strong> {specie.average_height} cm</p>
                <p><strong>Espérance de vie :</strong> {specie.average_lifespan} ans</p>
                <p><strong>Couleurs des yeux :</strong> {specie.eye_colors}</p>
                <p><strong>Couleurs des cheveux :</strong> {specie.hair_colors}</p>
                <p><strong>Couleurs de peau :</strong> {specie.skin_colors}</p>
                <p><strong>Langue :</strong> {specie.language}</p>
                <p><strong>Planète d'origine :</strong> {specie.homeworld || "Inconnue"}</p>
            </div>
        </div>
    );

}