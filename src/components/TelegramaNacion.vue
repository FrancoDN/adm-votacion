<template>
    <div class="table-container">
        <table>
            <!-- Cabecera -->
            <thead>
                <tr class="cabecera">
                    <th colspan="3">SECCION ELECTORAL: 12 - BERISSO</th>
                </tr>
                <tr class="cabecera">
                    <th colspan="8">MESA: {{ numeroMesa }}</th>
                </tr>
            </thead>

            <!-- Cuerpo -->
            <tbody>
                <tr class="partidos">
                    <th>N°</th>
                    <th>AGRUPACIONES POLITICAS</th>
                    <th>LISTAS INTERNAS</th>
                    <th>PRESIDENTE VICEPRESIDENTE</th>

                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <th class="partidos">Total de votos para la lista</th>
                </tr>
                <!-- Filas con los datos -->
                <tr v-for="(fila, index) in filas" :key="`fila-${index}`" class="datos">
                    <th>{{ fila.numero }}</th>
                    <th>{{ fila.agrupacion }}</th>
                    <th>{{ fila.lista }}</th>
                    <td :class="{ 'no-usar': fila.presidente === 'NO USAR' }">
                        <template v-if="!fila.presidente">
                            <input type="number" v-model="fila.votos.presidente" />
                        </template>
                        <template v-else>
                            {{ fila.presidente }}
                        </template>
                    </td>
                    
                </tr>
                <tr>
                    <th colspan="3" class="sumaFinal">TOTAL VOTOS AGRUPACIONES POLITICAS</th>
                    <td class="casillerosSuma total-votos">{{ totalVotosAgrupaciones.presidente }}</td>
                   
                </tr>
                <tr>
                    <th colspan="3" class="sumaFinal">VOTOS NULOS</th>
                    <td class="casillerosSuma">
                        <input type="number" v-model="votosNulos.presidente" />
                    </td>
                   
                </tr>
                <tr>
                    <th colspan="3" class="sumaFinal">VOTOS RECURRIDOS QUE SE REMITEN EN SOBRE Nro.3</th>
                    <td class="casillerosSuma">
                        <input type="number" v-model="votosRemitidos.presidente" />
                    </td>
                 
                </tr>
                <tr>
                    <th colspan="3" class="sumaFinal">VOTOS DE IDENTIDAD IMPUGNADA QUE SE REMITEN EN SOBRE Nro.3</th>
                    <td class="casillerosSuma">
                        <input type="number" v-model="votosImpugnados.presidente" />
                    </td>
                    
                </tr>
                <tr>
                    <th colspan="3" class="sumaFinal">VOTOS DEL COMANDO ELECTORAL QUE SE REMITEN EN EL BOLSIN</th>
                    <td class="casillerosSuma">
                        <input type="number" v-model="votosBolsin.presidente" />
                    </td>
                   
                </tr>
                <tr>
                    <th colspan="3" class="sumaFinal">VOTOS EN BLANCO</th>
                    <td class="casillerosSuma">
                        <input type="number" v-model="votosBlanco.presidente" />
                    </td>
                    
                </tr>
                <tr>
                    <th colspan="3" class="sumaFinal">TOTAL POR COLUMNAS</th>
                    <td class="casillerosSuma">{{ totalFilasColumna('presidente') }}</td>
                   
                </tr>
            </tbody>
        </table>
        <v-btn @click="submitData" color="primary" block class="mt-5 mb-5">ENVIAR</v-btn>
    </div>
</template>

<script>
import { filas } from "../datosNacion.js"
export default {
    props: {
    datosAgrupadosNacion: Object, // Definición de la propiedad datosAgrupados
  },
    data() {

        return {
            numeroMesa: 0,
            filas: filas.map((fila) => ({
                ...fila,
                votos: {
                    presidente: "",
                },
            })),
            votosNulos: {
                presidente: 0,
            },
            votosRemitidos: {
                presidente: 0,
            },
            votosImpugnados: {
                presidente: 0,
            },
            votosBolsin: {
                presidente: 0,
            },
            votosBlanco: {
                presidente: 0,
            },
            totalesColumnas: {
                presidente: 0,
            },
        };
    },
    computed: {
        totalVotosAgrupaciones() {
            // Inicializar la suma de votos para cada columna en 0
            const total = {
                presidente: 0,
            };

            // Recorrer las filas y sumar los votos de cada columna
            for (const fila of this.filas) {
                total.presidente += fila.votos.presidente
                    ? parseInt(fila.votos.presidente)
                    : 0;
            }

            return total;
        },
        
    },
    mounted(){
        this.numeroMesa = localStorage.getItem("mesaNumero");
    },

    methods: {
        totalFilasColumna(columna) {
            // Inicializar la suma de la columna en 0
            let suma = 0;

            // Filas para las cuales se calculará la suma
            const filasASumar = [
                this.totalVotosAgrupaciones,
                this.votosNulos,
                this.votosRemitidos,
                this.votosImpugnados,
                this.votosBolsin,
                this.votosBlanco,
            ];

            // Recorrer las filas y sumar los valores de la columna especificada
            for (const fila of filasASumar) {
                suma += fila[columna] ? parseInt(fila[columna]) : 0;
            }

            // Retornar la suma total de la columna
            return suma;
        },
        limpiarVotosNulosYBlanco() {
            this.votosNulos = {
                presidente: 0,
            };
            this.votosBlanco = {
                presidente: 0,
            };
            this.totalesAgrupaciones = {
                presidente: 0,
            };
        },
        submitData() {
            // Objeto para almacenar los datos agrupados
            const datosAgrupadosNacion = {};

            // Recorrer las filas para agrupar los datos por agrupación política y lista interna
            for (const fila of this.filas) {
                // Verificar si hay votos nulos ingresados en al menos una columna
                const votosNulosIngresados =
                    this.votosNulos.presidente

                // Verificar si hay votos en blanco ingresados en al menos una columna
                const votosBlancoIngresados =
                    this.votosBlanco.presidente

                if (votosNulosIngresados) {
                    // Agregar los votos nulos al objeto datosAgrupadosNacion
                    datosAgrupadosNacion["VOTOS NULOS"] = { votos: this.votosNulos };
                }

                if (votosBlancoIngresados) {
                    // Agregar los votos en blanco al objeto datosAgrupadosNacion
                    datosAgrupadosNacion["VOTOS EN BLANCO"] = { votos: this.votosBlanco };
                }

                // Verificar si se ingresaron votos en al menos uno de los puestos
                const votosIngresados =
                    fila.votos.presidente
                if (votosIngresados) {
                    // Crear un nuevo objeto con los datos de la fila
                    const datosFila = {
                        votos: fila.votos,
                    };

                    // Verificar si la agrupación política ya existe en el objeto datosAgrupadosNacion
                    if (!datosAgrupadosNacion[fila.agrupacion]) {
                        datosAgrupadosNacion[fila.agrupacion] = {};
                    }

                    // Agregar los votos de la lista interna al objeto de la agrupación política
                    datosAgrupadosNacion[fila.agrupacion][fila.lista] = datosFila;
                }
            }

            // Aquí tienes el objeto datosAgrupadosNacion con los datos agrupados por agrupación política y lista interna
            // Puedes hacer lo que desees con este objeto, por ejemplo, enviarlo a un servidor o guardar los datos localmente
            this.$emit("datos-agrupados-nacion", datosAgrupadosNacion);
            this.$emit("enviar");
        },
    },

}
</script>

<style>
.sumaFinal {
    border: 2px solid black;
    text-align: start;
}

.casillerosSuma {
    border: 2px solid black;
}

/* Estilo para el input de tipo number */
input[type="number"] {
    -moz-appearance: textfield;
    /* Firefox */
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    /* Safari */
    margin: 0;
}

input[type="number"] {
    max-width: 100%;
    /* El input ocupa el espacio disponible en el casillero */
    width: 100%;
    height: 100%;
}

.no-usar {
    background-color: gray;
    color: white;
    font-weight: bold;
}

.table-container {
    width: 100%;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    border: 1px solid black;
    padding: 5px;
    text-align: center;
    word-wrap: break-word;
    /* Permite que el contenido se ajuste automáticamente al ancho disponible */
    max-width: 100px;
    /* Limitamos el ancho máximo de las celdas para que no se expandan demasiado */
}

.cabecera th {
    font-weight: bold;
}

.datos td {
    vertical-align: middle;
}

.partidos {
    color: blue;
    font-size: large;
    font-weight: bold;
    background-color: #d3d3d3;

}

.cabecera {
    background-color: #d3d3d3;
    font-weight: bolder;
    font-size: large;
}
</style>