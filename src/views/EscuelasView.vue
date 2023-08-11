<template>
    <!-- <v-container>
        <h2 class="mb-4">Lista de Escuelas</h2>
        <v-row>
            <v-col v-for="school in school" :key="school.name" cols="12" md="6">
                <ListaEscuela :school="school" />
            </v-col>
        </v-row>
    </v-container> -->
    <div></div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/database";
// import ListaEscuela from '@/components/ListaEscuela.vue';
export default {
    components: {
        // ListaEscuela,
    },
    data() {
        return {
            escuelas: null,
        }
    },

    async mounted() {
        await this.getVotosPorEscuela();
        console.log(this.escuelas);
    },

    methods: {
        async getVotosPorEscuela() {
            firebase
                .database()
                .ref("votosEscuelas")
                .once("value")
                .then((snapshot) => {
                    this.escuelas = snapshot.val();
                })
                .catch((error) => {
                    console.error("Error fetching avales cargados data:", error);
                });
        },
    },
}
</script>

<style></style>