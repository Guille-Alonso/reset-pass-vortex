import axiosOriginal from 'axios'

export const axios = axiosOriginal.create({
   // baseURL: "http://localhost:5000"
   baseURL: "https://estadisticas.smt.gob.ar:6500"
})

