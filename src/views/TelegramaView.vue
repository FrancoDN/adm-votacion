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
            nombreEscuela: "",
            escuelaFiltrada: "",
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

            if (this.mostrarComponenteProvincia) {
                this.enviarProvincia();
                this.enviarNacional();
                this.$router.push('/user');
            }
        },
        enviarProvincia() {
            const numeroMesa = parseInt(localStorage.getItem('mesaNumero'));

            const dbRef = firebase.database().ref('provincial');
            // const escRef = firebase.database().ref('votosEscuelas');

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


            firebase.database().ref('escuelas').once('value')
                .then((snapshot) => {
                    const escuelasData = snapshot.val();
                    // Buscar en los datos de las escuelas
                    for (const keyEscuela in escuelasData) {
                        if (Object.prototype.hasOwnProperty.call(escuelasData, keyEscuela)) {
                            const escuela = escuelasData[keyEscuela];

                            for (const keyMesa in escuela.mesa) {
                                if (Object.prototype.hasOwnProperty.call(escuela.mesa, keyMesa)) {
                                    const numeroDeMesa = escuela.mesa[keyMesa];

                                    if (numeroDeMesa === numeroMesa) {
                                        this.nombreEscuela = escuela.establecimiento;
                                        // console.log(`El número de mesa ${numeroMesa} corresponde a la escuela ${escuela.establecimiento}.`);
                                        break; // Terminar la búsqueda
                                    }
                                }
                            }

                            if (this.nombreEscuela) {
                                break; // Terminar la búsqueda
                            }
                        }
                    }
                    if (this.nombreEscuela) {
                        const votosEscuelaRef = firebase.database().ref('votosEscuelas').child(this.nombreEscuela);

                        votosEscuelaRef.once('value')
                            .then((snapshot) => {
                                const votosEscuelaData = snapshot.val() || {};

                                // Agregar los datos de this.datosAgrupados a la escuela correspondiente
                                Object.keys(this.datosAgrupados).forEach((nombreLista) => {
                                    const listaActual = this.datosAgrupados[nombreLista];
                                    const votosIntendente = listaActual ? parseInt(listaActual.votos.intendente) || 0 : 0;

                                    if (!votosEscuelaData[nombreLista]) {
                                        votosEscuelaData[nombreLista] = {
                                            candidatoIntendente: listaActual ? listaActual.candidatoIntendente : '',
                                            intendente: votosIntendente,
                                        };
                                    } else {
                                        votosEscuelaData[nombreLista].intendente += votosIntendente;
                                    }
                                });

                                // Actualizar/subir los datos en Firebase
                                votosEscuelaRef.set(votosEscuelaData)
                                    .then(() => {
                                        console.log('Datos de votosEscuelas actualizados/enviados a Firebase correctamente.');
                                    })
                                    .catch((error) => {
                                        console.error('Error al actualizar/enviar los datos a Firebase:', error);
                                    });
                            })
                            .catch((error) => {
                                console.error('Error al consultar los datos en votosEscuelas en Firebase:', error);
                            });
                    }
                    else {
                        console.log(`No se encontró un establecimiento para el número de mesa ${numeroMesa}.`);
                    }
                });

        },

        enviarNacional() {
            const dbRef = firebase.database().ref('nacional');

            // Consultar la base de datos para verificar si la lista ya existe
            dbRef.once('value')
                .then((snapshot) => {
                    const data = snapshot.val();
                    let existenDatos = false;

                    // Verificar si la lista ya existe en la base de datos
                    if (data) {
                        // Recorrer las claves del objeto datosAgrupadosNacion para obtener el nombre de la agrupación
                        Object.keys(this.datosAgrupadosNacion).forEach((nombreAgrupacion) => {
                            const agrupacionActual = this.datosAgrupadosNacion[nombreAgrupacion];
                            Object.keys(agrupacionActual).forEach((keyLista) => {
                                const lista = agrupacionActual[keyLista];
                                console.log(lista);
                                const votosPresidente = agrupacionActual ? parseInt(lista.votos.presidente) || 0 : 0;

                                if (!data[keyLista]) {
                                    data[keyLista] = {
                                        presidente: votosPresidente,
                                    };
                                } else {
                                    data[keyLista].presidente += votosPresidente;
                                }

                                existenDatos = true; // Marcamos que existen datos para evitar el envío duplicado
                            });
                        });

                        // Actualizar/subir los datos en Firebase
                        if (existenDatos) {
                            dbRef.set(data)
                                .then(() => {
                                    console.log('Datos actualizados/enviados a Firebase correctamente.');
                                })
                                .catch((error) => {
                                    console.error('Error al actualizar/enviar los datos a Firebase:', error);
                                });

                            const mesaNumero = parseInt(localStorage.getItem("mesaNumero"));
                            firebase.database().ref("mesasCargadas").child(mesaNumero).set(true)
                                .catch(error => {
                                    console.error("Error al actualizar mesasCargadas:", error);
                                });
                        } else {
                            console.log('No hay nuevos datos para enviar a Firebase.');
                        }
                    } else {
                        // Si data es null, significa que el objeto "nacional" no existe en Firebase
                        // Por lo tanto, puedes crearlo con los datos iniciales.
                        const newData = {};

                        // Recorrer las claves del objeto datosAgrupadosNacion para obtener el nombre de la agrupación
                        Object.keys(this.datosAgrupadosNacion).forEach((nombreAgrupacion) => {
                            const agrupacionActual = this.datosAgrupadosNacion[nombreAgrupacion];
                            const votosPresidente = agrupacionActual ? parseInt(agrupacionActual.votos.presidente) || 0 : 0;

                            newData[nombreAgrupacion] = {
                                presidente: votosPresidente,
                            };

                            existenDatos = true; // Marcamos que existen datos para evitar el envío duplicado
                        });

                        // Actualizar/subir los datos en Firebase
                        if (existenDatos) {
                            dbRef.set(newData)
                                .then(() => {
                                    console.log('Datos actualizados/enviados a Firebase correctamente.');
                                })
                                .catch((error) => {
                                    console.error('Error al actualizar/enviar los datos a Firebase:', error);
                                });
                            const mesaNumero = parseInt(localStorage.getItem("mesaNumero"));
                            firebase.database().ref("mesasCargadas").child(mesaNumero).set(true)
                                .catch(error => {
                                    console.error("Error al actualizar mesasCargadas:", error);
                                });
                        } else {
                            console.log('No hay datos para enviar a Firebase.');
                        }
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
