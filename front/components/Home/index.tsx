"use client";
import React, {useEffect, useState} from "react";
import axios from "axios";
import styles from "./Home.module.css";
import { SWAPIResult } from "../../utils/types";
import { getIdFromUrl } from "../../utils/utils";
import {useDebounce} from "../../hooks/useDebounce";
import LightsaberLoader from "../Loading";

export default function Home() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SWAPIResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showLogin, setShowLogin] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const debouncedQuery = useDebounce(query, 500);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get("http://localhost:4000/me", {
                    withCredentials: true
                });
                if (res.data.user) {
                    console.log(res);
                    setShowLogin(false);
                }
            } catch (err) {
                console.log("Utilisateur non authentifié");
                setShowLogin(true);
            }
        };
        checkAuth();
    }, []);

    const handleLogin = async () => {
        try {
            const response = await axios.post(`http://localhost:4000/login`,
                { username, password }, // Body ici
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true // Important pour les cookies
                }
            );
            console.log(response.data);
            setShowLogin(false);
        } catch (err) {
            console.log(err);
            alert("Erreur lors de la connexion");
        }
    };



    const searchSWAPI = async (search: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`http://localhost:4000/search?query=${search}`, {
                withCredentials: true,
            });
            setResults(response.data);
            console.log(response);
        } catch (err) {
            console.log(err);
            setError("Erreur lors de la récupération des données");
        }
        setLoading(false);
    };

    useEffect(() => {
        if (debouncedQuery) {
            searchSWAPI(debouncedQuery).then();
        }
    }, [debouncedQuery]);

    if (showLogin) {
        return (
            <div className={styles.loginModal}>
                <div className={styles.modalContent}>
                <h2 className={styles.modalTitle}>Connexion</h2>
                <input className={styles.modalInput} placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input className={styles.modalInput} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className={styles.modalButton} onClick={handleLogin}>Se connecter</button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>The ultimate Search System for Rebels Alliance</h1>
            <div className={styles.searchBar}>
                <input className={styles.searchBarInput} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Rechercher..."/>
            </div>
            {loading && <LightsaberLoader/>}
            {error && <p className={styles.error}>{error}</p>}
            <div className={styles.resultsContainer}>
                {results && Object.values(results).every(items => Array.isArray(items) && items.length === 0) ? (
                    <p className={styles.noResults}>Aucun résultat trouvé.</p>
                ) : (
                  results && Object.entries(results)
                        .filter(([_, items]) => Array.isArray(items) && items.length > 0)
                        .map(([category, items]) => (
                            <div key={category} className={styles.result}>
                                <h2 className={styles.category}>{category}</h2>
                                <div className={styles.grid}>
                                    {items.map((item: any) => (
                                        <div key={item.url} className={styles.card}>
                                            <div>
                                                <p className={styles.cardTitle}>
                                                    <a href={`/${category}/${getIdFromUrl(item.url)}`}>
                                                        {item.name || item.title}
                                                    </a>
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                )}
            </div>

        </div>
    )
        ;
}
