const Hapi = require('@hapi/hapi');
const axios = require('axios');
const Boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const Cookie = require('@hapi/cookie');

const SECRET_KEY = "SWRASS_SECRET_KEY"; // Pour le bien de l'exercice elle est ici mais evidemment ça place est dans un .env

const init = async () => {
    const server = Hapi.server({
        port: 4000,
        host: 'localhost'
    });

    await server.register([
        {
            plugin: require('hapi-cors'),
            options: {
                origins: ['http://localhost:3000'],
                headers: ['Accept', 'Content-Type', 'Authorization'],
            }
        },
        Cookie
        ]);

    server.auth.strategy('jwt', 'cookie', {
        cookie: {
            name: 'authToken',
            password: 'supersecretpasswordpasswordpassword',
            isSecure: false, // Mettre true en production avec HTTPS
            ttl: 7 * 24 * 60 * 60 * 1000 // 7 jours
        },
        validate: async (request) => {
            try {
                const token = request.state.authToken?.token; // 🔥 Extrait bien le token
                console.log("🔍 Token extrait :", token);

                if (!token) {
                    console.log("❌ Aucun token trouvé !");
                    return { isValid: false };
                }

                const decoded = jwt.verify(token, SECRET_KEY);
                console.log("✅ Token décodé :", decoded);

                return { isValid: true, credentials: decoded };
            } catch (error) {
                console.log("❌ Erreur JWT :", error.message);
                return { isValid: false };
            }
        }

    });

    server.auth.default('jwt');

    server.route({
        method: 'POST',
        path: '/login',
        options: { auth: false },
        handler: async (request, h) => {
            const { username, password } = request.payload;

            if (username !== 'Luke' || password !== 'DadSucks') {
                return Boom.unauthorized('Identifiants incorrects');
            }

            const token = jwt.sign({ user: 'Luke' }, SECRET_KEY, { expiresIn: '7d' });
            console.log("✅ Token généré :", token);
            return h.response({ message: 'Connexion réussie' }).state('authToken', { token });
        }
    });

    server.route({
        method: 'POST',
        path: '/logout',
        handler: async (request, h) => {
            return h.response({ message: 'Déconnexion réussie' }).unstate('authToken');
        }
    });

    server.route({
        method: 'GET',
        path: '/me',
        options: { auth: false },
        handler: async (request, h) => {
            console.log("Cookies reçus :", request.state); // 🔥 Vérifier ce que reçoit le serveur
            const token = request.state.authToken.token;

            if (!token) {
                return Boom.unauthorized('Non authentifié');
            }

            try {
                const decoded = jwt.verify(token, SECRET_KEY);
                return h.response({ user: decoded.user })
                    .header("Access-Control-Allow-Origin", "http://localhost:3000")
                    .header("Access-Control-Allow-Credentials", "true");
            } catch (error) {
                return Boom.unauthorized('Token invalide');
            }
        }
    });


    server.route({
        method: 'GET',
        path: '/search',
        options: { auth: 'jwt' },
        handler: async (request, h) => {
            console.log("🔍 Cookies reçus sur /search :", request.state);
            console.log("🔍 Authentification JWT credentials :", request.auth.credentials);


            const { query } = request.query;
            if (!query) {
                return h.response({ error: 'Missing search query' }).code(400);
            }

            const categories = ['people', 'planets', 'starships', 'vehicles', 'species', 'films'];
            const results = {};

            await Promise.all(
                categories.map(async (category) => {
                    try {
                        const response = await axios.get(`https://swapi.dev/api/${category}/?search=${query}`);
                        results[category] = response.data.results;
                    } catch (error) {
                        results[category] = { error: 'Failed to fetch data' };
                    }
                })
            );

            return h.response(results)
                .header("Access-Control-Allow-Origin", "http://localhost:3000")
                .header("Access-Control-Allow-Credentials", "true");
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
    console.log("Routes enregistrées :", server.table().map(route => route.path));

};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
