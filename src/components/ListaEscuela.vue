<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card class="school-card mb-4 elevation-3">
          <v-card-title class="school-title">{{ school.name }}</v-card-title>
          <v-card-text>
            <v-data-table :headers="headers" :items="sortedParties" hide-default-footer class="elevation-1">
              <template v-slot:item="{ item }">
                <tr>
                  <td class="text-left">{{ item.name }}</td>
                  <td class="text-right">{{ item.votes }}</td>
                </tr>
              </template>
            </v-data-table>
          </v-card-text>
          <v-card-actions>
            <v-btn text color="error" class="null-votes-btn">{{ school.nullVotes }} Votos Nulos</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
  
  <script>
  export default {
    props: {
      school: Object
    },
    computed: {
      sortedParties() {
        return this.school.parties.slice().sort((a, b) => b.votes - a.votes);
      },
      headers() {
        return [
          { text: 'Partido', value: 'name', align: 'start' },
          { text: 'Votos', value: 'votes', align: 'end' }
        ];
      }
    },
    mounted() {
    }
  };
  </script>
  
  <style scoped>
  .elevation-1 {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .v-card-title {
    font-size: 24px;
    font-weight: bold;
  }
  
  .text-left {
    text-align: left;
  }
  
  .text-right {
    text-align: right;
  }
  
  .v-btn {
    font-weight: bold;
  }
  </style>
  