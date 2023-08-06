<template>
    <div>
        <telegrama-provincia :datosAgrupados="datosAgrupados" @datos-agrupados-provincia="actualizarDatosAgrupados"
            @enviar="alternarComponente" v-if="mostrarComponenteProvincia"></telegrama-provincia>
        <telegrama-nacion v-else @enviar="alternarComponente" :datosAgrupadosNacion="datosAgrupadosNacion"
            @datos-agrupados-nacion="actualizarDatosAgrupadosNacion"></telegrama-nacion>

    </div>
</template>
  

<script>
import TelegramaNacion from '@/components/TelegramaNacion.vue';
import TelegramaProvincia from '@/components/TelegramaProvincia.vue';
import firebase from 'firebase/app';
import 'firebase/database'; // Importa los módulos específicos que necesites, en este caso, el Realtime Database.

export default {
    components: {
        TelegramaNacion,
        TelegramaProvincia
    },

    data() {
        return {
            datosAgrupados: {},
            datosAgrupadosNacion: {},
            mostrarComponenteProvincia: true,
        }
    },
    methods: {
        // Método para actualizar los datos agrupados recibidos desde el componente TelegramaTable
        actualizarDatosAgrupados(datosAgrupados) {
            this.datosAgrupados = datosAgrupados;
        },
        actualizarDatosAgrupadosNacion(datosAgrupadosNacion) {
            this.datosAgrupadosNacion = datosAgrupadosNacion;
        },
        alternarComponente() {
            this.mostrarComponenteProvincia = !this.mostrarComponenteProvincia;
            this.enviar();

            // if (this.mostrarComponenteProvincia) {
            // }
        },
        enviar() {
            // ... (código existente)

            const dbRef = firebase.database().ref('provincial');

            // Consultar la base de datos para verificar si la lista ya existe
            dbRef.once('value')
                .then((snapshot) => {
                    const data = snapshot.val();
                    let existenDatos = false;

                    // Verificar si la lista ya existe en la base de datos
                    if (data) {
                        Object.keys(data).forEach((keyAgrupacion) => {
                            const agrupacion = data[keyAgrupacion];
                            Object.keys(agrupacion).forEach((keyLista) => {
                                const lista = agrupacion[keyLista];
                                if (this.datosAgrupados[keyLista]) {
                                    // Realizar la suma de votos
                                    existenDatos = true;
                                    // Verificar si el objeto votos existe, si no existe, crearlo
                                    if (!lista.votos) {
                                        lista.votos = {
                                            intendente: 0,
                                            gobernador: 0,
                                            legisladoresProvinciales: 0,
                                        };
                                    }

                                    // Obtener los votos locales y sumarlos a los votos existentes de la base de datos
                                    const votosIntendenteLocal = parseInt(this.datosAgrupados[keyLista].votos.intendente) || 0;
                                    const votosGobernadorLocal = parseInt(this.datosAgrupados[keyLista].votos.gobernador) || 0;
                                    const votosLegisladoresLocal = parseInt(this.datosAgrupados[keyLista].votos.legisladoresProvinciales) || 0;

                                    lista.votos.intendente += votosIntendenteLocal;
                                    lista.votos.gobernador += votosGobernadorLocal;
                                    lista.votos.legisladoresProvinciales += votosLegisladoresLocal;

                                    console.log(agrupacion);
                                }
                            });
                        });
                    }

                    // Si la lista no existe, subir los datos a Firebase
                    if (!existenDatos) {
                        // Recorrer las claves del objeto datosAgrupados para obtener el nombre de la lista
                        Object.keys(this.datosAgrupados).forEach((nombreLista) => {
                            const listaActual = this.datosAgrupados[nombreLista];
                            const votosIntendente = listaActual ? parseInt(listaActual.votos.intendente) || 0 : 0;
                            const votosGobernador = listaActual ? parseInt(listaActual.votos.gobernador) || 0 : 0;
                            const votosLegisladores = listaActual ? parseInt(listaActual.votos.legisladoresProvinciales) || 0 : 0;

                            if (!data[nombreLista]) {
                                data[nombreLista] = {
                                    candidatoIntendente: listaActual ? listaActual.candidatoIntendente : '',
                                    color: listaActual ? listaActual.color : '',
                                    votos: {
                                        intendente: votosIntendente,
                                        gobernador: votosGobernador,
                                        legisladoresProvinciales: votosLegisladores,
                                    },
                                };
                            } else {
                                data[nombreLista].votos.intendente += votosIntendente;
                                data[nombreLista].votos.gobernador += votosGobernador;
                                data[nombreLista].votos.legisladoresProvinciales += votosLegisladores;
                            }
                        });

                        // Actualizar/subir los datos en Firebase
                        dbRef.set(data)
                            .then(() => {
                                console.log('Datos actualizados/enviados a Firebase correctamente.');
                            })
                            .catch((error) => {
                                console.error('Error al actualizar/enviar los datos a Firebase:', error);
                            });
                    }
                })
                .catch((error) => {
                    console.error('Error al consultar los datos en Firebase:', error);
                });
        },




    },
}
</script>

<style></style>
