<template>
    <v-container class="text-center">
      <v-row justify="center">
        <v-col cols="12" sm="8">
          <h1 class="mb-5" style="font-size: 32px;">Votos por escuela</h1>
          <v-select v-model="selectedCandidate" :items="candidates" label="Selecciona un candidato" outlined dense></v-select>
        </v-col>
      </v-row>
  
      <v-row v-if="selectedCandidate" justify="center">
        <v-col cols="12" sm="8">
          <h2 class="mb-3" style="font-size: 28px;">{{ selectedCandidate }}</h2>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left" style="font-size: 24px;">Escuela</th>
                  <th class="text-center" style="font-size: 24px;">Votos</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in getSchoolVotes(selectedCandidate)" :key="item.schoolName">
                  <td style="font-size: 20px;">{{ item.schoolName }}</td>
                  <td class="text-center" style="font-size: 20px;">{{ item.candidateVotes }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import firebase from 'firebase/app';
  import "firebase/database";
  
  export default {
    data() {
      return {
        votosEscuelas: {},
        selectedCandidate: "Vanesa QUEYFFER",
      };
    },
    methods: {
      async fetchVotosEscuelas() {
        const dbRef = firebase.database().ref('votosEscuelas');
        try {
          const snapshot = await dbRef.once('value');
          this.votosEscuelas = snapshot.val();
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      },
      getSchoolVotes(selectedCandidate) {
        const schoolVotesArray = [];
  
        for (const [schoolName, schoolVotes] of Object.entries(this.votosEscuelas)) {
          let candidateVotes = 0;
          for (const partyVotes of Object.values(schoolVotes)) {
            const candidateName = partyVotes.candidatoIntendente;
            if (candidateName === selectedCandidate) {
              candidateVotes += partyVotes.intendente || 0;
            }
          }
          if (candidateVotes > 0) {
            schoolVotesArray.push({ schoolName, candidateVotes });
          }
        }
  
        return schoolVotesArray;
      },
    },
    computed: {
      candidates() {
        const candidatesSet = new Set();
  
        for (const schoolVotes of Object.values(this.votosEscuelas)) {
          for (const partyVotes of Object.values(schoolVotes)) {
            const candidateName = partyVotes.candidatoIntendente;
            if (candidateName) {
              candidatesSet.add(candidateName);
            }
          }
        }
        return Array.from(candidatesSet).sort();
      },
    },
    mounted() {
      this.fetchVotosEscuelas();
    },
  };
  </script>
  
  <style>
  /* Estilos personalizados aquí si es necesario */
  </style>
  