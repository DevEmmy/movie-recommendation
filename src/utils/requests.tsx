import axios from "axios";

const apiKey =  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZWE3YjA1YzAxZDZmYzdiZjk2ZDdkYjkwYjExNTM4ZSIsIm5iZiI6MTcyODAwMzA3NC43ODgyNzMsInN1YiI6IjYwODlkMTcwNjY0NjlhMDAyYjE5YjRjMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2mVeh9aoUqB3A1RhOhLQw2IMbyR8FowgevYQ0C5Ic14";

export const axiosConfig = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        Authorization : `Bearer ${apiKey}`
    }
})