const moviesElement = document.getElementById("movies")

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZmMzZWI0ZWYxZWQ4YmYzYTYwY2Q1YzBiZGMzYjZlNyIsInN1YiI6IjY0ZDAzZTIxMzAzYzg1MDEzYTE1OGM3YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eIIf7DLVFPDeqoTFB9no0mvAw5xI_6k5Jiuiu4dcecc'
    }
};

async function data() {
    const data = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
        .then(response => response.json())

    if (data.results === undefined) {
        throw new Error("Sentimos muito, não foi possivel encontrar os filmes")
    }
    return [...data.results]
}

function createMovieElement({ id, title, stars, poster, time, release }) {
    return `
    <li class="movie">
                      <div class="title">
                          <h2>${title}</h2>
                          <div class="stars">
                          <i class="ph-fill ph-star"></i>
                              <span>${stars}</span>
                          </div>
                      </div>
                      <div class="content">
                          <img class="poster" src="https://image.tmdb.org/t/p/w500${poster}" alt="poster do filme ${title}">
                          <div class="info">
                              <div class="duration">
                                  <i class="ph ph-clock"></i>
                                  <span>${time}</span>
                              </div>
                              <div class="release">
                                  <i class="ph ph-calendar-blank"></i>
                                  <span>${release}</span>
                              </div>
                          </div>
                          <button onclick="watch(${id})">
                              <img src="./assets/play-button.svg" alt="Botão para reproduzir">
                              <span>Assistir trailer</span>
                          </button>
                      </div>
                  </li>
    `
}

async function getMovieInfoById(movieId) {
    const movie = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=pt-BR`, options)
        .then(response => response.json())
    return movie
}

async function get3Movies() {
    const movies = await data()

    if (movies === undefined) {
        throw new Error("Sentimos muito, não foi possivel encontrar os filmes")
    }

    const threeMovies = new Set()

    while (threeMovies.size < 3) {
        let randomMovie = movies[Number(Math.random() * movies.length).toFixed(0)]
        randomMovie = await getMovieInfoById(randomMovie.id)
        threeMovies.add(randomMovie)
    }

    return [...threeMovies]
}

function minutesToTime(minutes) {
    const hours = Math.floor(minutes / 60)
    const minutesLeft = minutes - hours * 60
    return `${hours}:${minutesLeft}`
}

async function watch(id) {
    let trailer = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=pt-BR`, options)
        .then(response => response.json())

    if (trailer.results === undefined) {
        throw new Error("Sentimos muito, não foi possivel encontrar o trailer deste filme")
    }

    if (trailer.results[0] === undefined) {
        trailer = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos`, options)
            .then(response => response.json())
    }

    if (trailer.results.length === 0 || trailer.results[0] === undefined || trailer.results === undefined) {
        throw new Error("Sentimos muito, não foi possivel encontrar o trailer deste filme")
    }

    trailer = trailer.results[0].key
    window.open(`https://www.youtube.com/watch?v=${trailer}`, "_blank")
}

async function generateRecommendation() {
    const movies = await get3Movies()

    moviesElement.innerHTML = movies.map(movie => {
        return createMovieElement({
            id: movie.id,
            title: movie.title,
            stars: movie.vote_average.toFixed(1),
            poster: movie.poster_path,
            time: minutesToTime(movie.runtime),
            release: movie.release_date.slice(0, 4)
        })
    }).join("")
}

generateRecommendation()

document.getElementById("generate-button").addEventListener("click", generateRecommendation)