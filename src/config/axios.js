import axiosOriginal from 'axios'

export const axios = axiosOriginal.create({
   baseURL: "https://estadisticas.smt.gob.ar:6500"
})

