import { GenreType } from "../form.types";

export class Movie {
    title: string;
    description: string;
    releaseDate: string;
    rating: Number;
    genre: GenreType;
    actors: string[];
    poster: string;
}