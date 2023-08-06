<template>
    <div class="table-container">
        <table>
            <!-- Cabecera -->
            <thead>
                <tr class="cabecera">
                    <th colspan="3">SECCION ELECTORAL: 12 - BERISSO</th>
                </tr>
                <tr class="cabecera">
                    <th colspan="8">MESA: 0</th>
                </tr>
            </thead>

            <!-- Cuerpo -->
            <tbody>
                <tr class="partidos">
                    <th>N°</th>
                    <th>AGRUPACIONES POLITICAS</th>
                    <th>LISTAS INTERNAS</th>
                    <th>GOBERNADOR VICEGOBERNADOR</th>
                    <th>LEGISLADORES PROVINCIALES</th>
                    <th>INTENDENTES, CONCEJALES Y CONSEJEROS ESCOLARES</th>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <th class="partidos">Total de votos para la lista</th>
                    <th class="partidos">Total de votos para la lista</th>
                    <th class="partidos">Total de votos para la lista</th>
                </tr>
                <!-- Filas con los datos -->
                <tr v-for="(fila, index) in filas" :key="`fila-${index}`" class="datos">
                    <th>{{ fila.numero }}</th>
                    <th>{{ fila.agrupacion }}</th>
                    <th>{{ fila.lista }}</th>
                    <td :class="{ 'no-usar': fila.gobernador === 'NO USAR' }">
                        <template v-if="!fila.gobernador">
                            <input type="number" v-model="fila.votos.gobernador" />
                        </template>
                        <template v-else>
                            {{ fila.gobernador }}
                        </template>
                    </td>
                    <td :class="{ 'no-usar': fila.legisladoresProvinciales === 'NO USAR' }">
                        <template v-if="!fila.legisladoresProvinciales">
                            <input type="number" v-model="fila.votos.legisladoresProvinciales" />
                        </template>
                        <template v-else>
                            {{ fila.legisladoresProvinciales }}
                        </template>
                    </td>
                    <td :class="{ 'no-usar': fila.intendente === 'NO USAR' }">
                        <template v-if="!fila.intendente">
                            <input type="number" v-model="fila.votos.intendente" />
                        </template>
                        <template v-else>
                            {{ fila.intendente }}
                        </template>
                    </td>

                </tr>
                <tr>
                    <th colspan="3" class="sumaFinal">TOTAL VOTOS AGRUPACIONES POLITICAS</th>
                    <td class="casillerosSuma total-votos">{{ totalVotosAgrupaciones.gobernador }}</td>
                    <td class="casillerosSuma total-votos">{{ totalVotosAgrupaciones.legisladoresProvinciales }}</td>
                    <td class="casillerosSuma total-votos">{{ totalVotosAgrupaciones.intendente }}</td>

                </tr>
                <tr>
                    <th colspan="3" class="sumaFinal">VOTOS NULOS</th>
                    <td class="casillerosSuma">
                        <input type="number" v-model="votosNulos.gobernador" />
                    </td>
                    <td class="casillerosSuma">
                        <input type="number" v-model="votosNulos.legisladoresProvinciales" />
                    </td>
                    <td class="casillerosSuma">
                        <input type="number" v-model="votosNulos.intendente" />
                    </td>

                </tr>
                <tr>
                    <th colspan="3" class="sumaFinal">VOTOS RECURRIDOS QUE SE REMITEN EN SOBRE Nro.3</th>
                    <td class="casillerosSuma">
                        <input type="number" v-model="votosRemitidos.gobernador" />
                    </td>
                    <td class="casillerosSuma">
                        <input type="number" v-model="votosRemitidos.legisladoresProvinciales" />
                    </td>
                    <td class="casillerosSuma">
                        <input type="number" v-model="votosRemitidos.intendente" />
                    </td>

                </tr>
                <tr>
                    <th colspan="3" class="sumaFinal">VOTOS DE IDENTIDAD IMPUGNADA QUE SE REMITEN EN SOBRE Nro.3</th>
                    <td class="casillerosSuma">
                        <input type="number" v-model="votosImpugnados.gobernador" />
                    </td>
                    <td class="casillerosSuma">
                        <input type="number" v-model="votosImpugnados.legisladoresProvinciales" />
                    </td>
                    <td class="casillerosSuma">
                        <input type="number" v-model="votosImpugnados.intendente" />
                    </td>

                </tr>
                <tr>
                    <th colspan="3" class="sumaFinal">VOTOS DEL COMANDO ELECTORAL QUE SE REMITEN EN EL BOLSIN</th>
                    <td class="casillerosSuma">
                        <input type="number" v-model="votosBolsin.gobernador" />
                    </td>
                    <td class="casillerosSuma">
                        <input type="number" v-model="votosBolsin.legisladoresProvinciales" />
                    </td>
                    <td class="casillerosSuma">
                        <input type="number" v-model="votosBolsin.intendente" />
                    </td>

                </tr>
                <tr>
                    <th colspan="3" class="sumaFinal">VOTOS EN BLANCO</th>
                    <td class="casillerosSuma">
                        <input type="number" v-model="votosBlanco.gobernador" />
                    </td>
                    <td class="casillerosSuma">
                        <input type="number" v-model="votosBlanco.legisladoresProvinciales" />
                    </td>
                    <td class="casillerosSuma">
                        <input type="number" v-model="votosBlanco.intendente" />
                    </td>

                </tr>
                <tr>
                    <th colspan="3" class="sumaFinal">TOTAL POR COLUMNAS</th>
                    <td class="casillerosSuma">{{ totalFilasColumna('gobernador') }}</td>
                    <td class="casillerosSuma">{{ totalFilasColumna('legisladoresProvinciales') }}</td>
                    <td class="casillerosSuma">{{ totalFilasColumna('intendente') }}</td>

                </tr>
            </tbody>
        </table>
        <v-btn @click="submitData" color="primary" block class="mt-5 mb-5">ENVIAR</v-btn>
    </div>
</template>

<script>
import { filas } from "../datosProvincia.js"
export default {
    props: {
        datosAgrupados: Object, // Definición de la propiedad datosAgrupados
    },
    data() {

        return {
            filas: filas.map((fila) => ({
                ...fila,
                votos: {
                    gobernador: 0,
                    legisladoresProvinciales: 0,
                    intendente: 0,
                },
            })),
            votosNulos: {
                gobernador: 0,
                legisladoresProvinciales: 0,
                intendente: 0,
            },
            votosRemitidos: {
                gobernador: 0,
                legisladoresProvinciales: 0,
                intendente: 0,
            },
            votosImpugnados: {
                gobernador: 0,
                legisladoresProvinciales: 0,
                intendente: 0,
            },
            votosBolsin: {
                gobernador: 0,
                legisladoresProvinciales: 0,
                intendente: 0,
            },
            votosBlanco: {
                gobernador: 0,
                legisladoresProvinciales: 0,
                intendente: 0,
            },
            totalesColumnas: {
                gobernador: 0,
                legisladoresProvinciales: 0,
                intendente: 0,
            },
        };
    },
    computed: {
        totalVotosAgrupaciones() {
            // Inicializar la suma de votos para cada columna en 0
            const total = {
                gobernador: 0,
                legisladoresProvinciales: 0,
                intendente: 0,
            };

            // Recorrer las filas y sumar los votos de cada columna
            for (const fila of this.filas) {
                total.gobernador += fila.votos.gobernador
                    ? parseInt(fila.votos.gobernador)
                    : 0;
                total.legisladoresProvinciales += fila.votos.legisladoresProvinciales
                    ? parseInt(fila.votos.legisladoresProvinciales)
                    : 0;
                total.intendente += fila.votos.intendente
                    ? parseInt(fila.votos.intendente)
                    : 0;
            }

            return total;
        },

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
                gobernador: 0,
                legisladoresProvinciales: 0,
                intendente: 0,
            };
            this.votosBlanco = {
                gobernador: 0,
                legisladoresProvinciales: 0,
                intendente: 0,
            };
            this.totalesAgrupaciones = {
                gobernador: 0,
                legisladoresProvinciales: 0,
                intendente: 0,
            };
        },
        submitData() {
            // Objeto para almacenar los datos agrupados
            const datosAgrupados = {};

            // Recorrer las filas para agrupar los datos por agrupación política y lista interna
            for (const fila of this.filas) {
                // Verificar si hay votos nulos ingresados en al menos una columna
                const votosNulosIngresados =
                    this.votosNulos.gobernador ||
                    this.votosNulos.legisladoresProvinciales ||
                    this.votosNulos.intendente;

                // Verificar si hay votos en blanco ingresados en al menos una columna
                const votosBlancoIngresados =
                    this.votosBlanco.gobernador ||
                    this.votosBlanco.legisladoresProvinciales ||
                    this.votosBlanco.intendente;

                if (votosNulosIngresados) {
                    // Agregar los votos nulos al objeto datosAgrupados
                    datosAgrupados["VOTOS NULOS"] = { votos: this.votosNulos };
                }

                if (votosBlancoIngresados) {
                    // Agregar los votos en blanco al objeto datosAgrupados
                    datosAgrupados["VOTOS EN BLANCO"] = { votos: this.votosBlanco };
                }

                // Verificar si se ingresaron votos en al menos uno de los puestos
                const votosIngresados =
                    fila.votos.gobernador ||
                    fila.votos.legisladoresProvinciales ||
                    fila.votos.intendente;

                if (votosIngresados) {
                    // Crear un nuevo objeto con los datos de la fila
                    const datosFila = {
                        votos: fila.votos,
                        candidatoIntendente: fila.candidatoIntendente,
                        color: fila.color,
                    };

                    // // Verificar si la agrupación política ya existe en el objeto datosAgrupados
                    // if (!datosAgrupados[fila.agrupacion]) {
                    //     datosAgrupados[fila.agrupacion] = {};
                    // }

                    // Agregar los votos de la lista interna al objeto de la agrupación política
                    datosAgrupados[fila.lista] = datosFila;
                }
            }

            // Aquí tienes el objeto datosAgrupados con los datos agrupados por agrupación política y lista interna
            // Puedes hacer lo que desees con este objeto, por ejemplo, enviarlo a un servidor o guardar los datos localmente
            this.$emit("datos-agrupados-provincia", datosAgrupados);
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