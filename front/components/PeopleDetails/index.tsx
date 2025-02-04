"use client";
import styles from "./PeopleDetails.module.css";
import {PeopleResult} from "../../utils/types";

export default function PeopleDetails({ character }: { character: PeopleResult }) {
    console.log(character);
    console.log(character.height);
    return (
        <div className={styles.card}>
            <div className={styles.cardImage}>
                {/* Placeholder for character image */}
            </div>
            <div className={styles.cardContent}>
                <h2 className={styles.cardTitle}>{character.name}</h2>
                <p className={styles.cardText}><strong>Height:</strong> {character.height}</p>
                <p className={styles.cardText}><strong>Mass:</strong> {character.mass}</p>
                <p className={styles.cardText}><strong>Hair Color:</strong> {character.hair_color}</p>
                <p className={styles.cardText}><strong>Skin Color:</strong> {character.skin_color}</p>
                <p className={styles.cardText}><strong>Eye Color:</strong> {character.eye_color}</p>
                <p className={styles.cardText}><strong>Birth Year:</strong> {character.birth_year}</p>
                <p className={styles.cardText}><strong>Gender:</strong> {character.gender}</p>
            </div>
        </div>
    )
}