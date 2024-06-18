import { MovieRating } from "../Redux/Entities/CurrentMovie/currentMovieSlice";

export const ratingMapperName = (ratingName: keyof MovieRating) => {
    switch(ratingName) {
        case "kp": {
            return "Рейтинг кинопоиска";
        }
        case "imdb": {
            return "Рейтинг IMDB";
        }
        case "tmdb": {
            return "Рейтинг TMDB"
        }
        case "filmCritics": {
            return "Рейтинг кинокритиков"
        }
        case "russianFilmCritics": {
            return "Рейтинг кинокритиков из РФ"
        }
        case "await": {
            return "Рейтинг основанный на ожиданиях пользователей";
        }
        default: {
            return "Неизвестный рейтинг";
        }
    }
}