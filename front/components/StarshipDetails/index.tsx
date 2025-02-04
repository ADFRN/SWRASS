import styles from "./StarshipDetails.module.css";
import {StarshipsResult} from "../../utils/types";

export default function StarshipDetails({starship}: {starship: StarshipsResult}) {
    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>{starship.name}</h2>
                <p className={styles.cardSubtitle}>{starship.model}</p>
            </div>
            <div className={styles.cardContent}>
                <p><strong>Classe :</strong> {starship.starship_class}</p>
                <p><strong>Fabricant :</strong> {starship.manufacturer}</p>
                <p><strong>Coût :</strong> {starship.cost_in_credits} crédits</p>
                <p><strong>Longueur :</strong> {starship.length} mètres</p>
                <p><strong>Équipage :</strong> {starship.crew}</p>
                <p><strong>Passagers :</strong> {starship.passengers}</p>
                <p><strong>Vitesse max atmosphérique :</strong> {starship.max_atmosphering_speed}</p>
                <p><strong>Hyperdrive rating :</strong> {starship.hyperdrive_rating}</p>
                <p><strong>MGLT :</strong> {starship.MGLT}</p>
                <p><strong>Capacité cargo :</strong> {starship.cargo_capacity} tonnes</p>
                <p><strong>Consommables :</strong> {starship.consumables}</p>
            </div>
        </div>
    );

}