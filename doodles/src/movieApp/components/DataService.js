const url = 'https://academind34-default-rtdb.europe-west1.firebasedatabase.app/movies.json';

function convertDatabaseDataToMovies(data) {
  return data ? Object.entries(data).map(([id, movie]) => ({ ...movie, id: id })) : [];
}

export const postMovie = async (movie) => { 
    const response = await fetch(url, { 
        method: 'POST', 
        body: JSON.stringify(movie),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    return data.name;
}

export const getMovies = async () => {
    const response = await fetch(url);

    if (!response.ok) throw new Error('Request failed', { cause: response.status });

    const data = await response.json();
    return convertDatabaseDataToMovies(data);
}