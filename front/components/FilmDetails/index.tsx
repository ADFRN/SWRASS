import styles from "./FilmDetails.module.css";
import {FilmsResult} from "../../utils/types";


export default function FilmDetails({film}: {film: FilmsResult}) {
    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>Episode {film.episode_id}: {film.title}</h2>
                <p className={styles.cardSubtitle}>Réalisé par {film.director}</p>
            </div>
            <div className={styles.cardContent}>
                <p><strong>Producteur(s) :</strong> {film.producer}</p>
                <p><strong>Date de sortie :</strong> {film.release_date}</p>
                <p className={styles.openingCrawl}><strong>Introduction :</strong> {film.opening_crawl}</p>
            </div>
        </div>
    );

}