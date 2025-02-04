import axios from "axios";
import FilmDetails from "../../../../components/FilmDetails";
import SpeciesDetails from "../../../../components/SpecieDetails";
import StarshipDetails from "../../../../components/StarshipDetails";
import PeopleDetails from "../../../../components/PeopleDetails";
import PlanetDetails from "../../../../components/PlanetDetails";
import VehicleDetails from "../../../../components/VehicleDetails";
import { SWAPIResult } from "../../../../utils/types";

export default async function Page({ params }: { params: { category: string, id: string } }) {
    const { category, id } = params;

    try {
        const response = await axios.get(`https://swapi.dev/api/${category}/${id}`);
        const result: SWAPIResult = response.data;

        switch (category) {
            case "people":
                // @ts-ignore
                return <PeopleDetails character={result} />;
            case "planets":
                // @ts-ignore
                return <PlanetDetails planet={result} />;
            case "starships":
                // @ts-ignore
                return <StarshipDetails starship={result} />;
            case "vehicles":
                // @ts-ignore
                return <VehicleDetails vehicle={result} />;
            case "species":
                // @ts-ignore
                return <SpeciesDetails specie={result} />;
            case "films":
                // @ts-ignore
                return <FilmDetails film={result} />;
            default:
                return <div>Aucune page trouvée</div>;
        }
    } catch (error) {
        return <div>Erreur lors de la récupération des données</div>;
    }
}
