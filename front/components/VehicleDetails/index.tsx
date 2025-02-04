import styles from "./VehicleDetails.module.css";
import {VehiclesResult} from "../../utils/types";

export default function VehicleDetails({vehicle}: {vehicle : VehiclesResult}) {
    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>{vehicle.name}</h2>
                <p className={styles.cardSubtitle}>{vehicle.model}</p>
            </div>
            <div className={styles.cardContent}>
                <p><strong>Classe :</strong> {vehicle.vehicle_class}</p>
                <p><strong>Fabricant :</strong> {vehicle.manufacturer}</p>
                <p><strong>Longueur :</strong> {vehicle.length} mètres</p>
                <p><strong>Coût :</strong> {vehicle.cost_in_credits} crédits</p>
                <p><strong>Équipage :</strong> {vehicle.crew}</p>
                <p><strong>Passagers :</strong> {vehicle.passengers}</p>
                <p><strong>Vitesse max atmosphérique :</strong> {vehicle.max_atmosphering_speed}</p>
                <p><strong>Capacité cargo :</strong> {vehicle.cargo_capacity} tonnes</p>
                <p><strong>Consommables :</strong> {vehicle.consumables}</p>
            </div>
        </div>
    );

}