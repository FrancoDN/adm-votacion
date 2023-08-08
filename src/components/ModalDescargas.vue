<template>
  <div>
    <v-dialog persistent max-width="400"  v-model="dialog">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on" height="2vw" width="8vw">
          <p style="font-size: 1vw;">Descargar</p>
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h5">
          Seleccionar datos a descargar
        </v-card-title>
        <div class="d-flex flex-row justify-center justify-space-around pt-5 pb-5">
        <v-btn color="primary" dark height="3vw" width="8vw" @click="crearPDFProvincia">
          <p style="font-size: 1vw;">Provincia</p>
        </v-btn>
        <v-btn color="primary" dark height="3vw" width="8vw" @click="datosNacion">
          <p style="font-size: 1vw;">Nacion</p>
        </v-btn>
      </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import firebase from 'firebase';
import "firebase/database";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
export default {
  props: {
    dataPartidos: Object,
  },
  name: 'ModalDescargas',
  data() {
    return {
      dialog: false,
    }
  },
  mounted() {
    // Agregar el evento keydown al cuerpo del documento
    document.body.addEventListener('keydown', this.handleKeyDown);
  },
  beforeDestroy() {
    // Eliminar el evento keydown al destruir el componente
    document.body.removeEventListener('keydown', this.handleKeyDown);
  },
  methods: {
    handleKeyDown(event) {
      if (event.keyCode === 27) { // Código de la tecla "Esc"
        this.dialog = false;
      }
    },
   async datosNacion() {
      const db = firebase.database();
      const ref = db.ref("nacional");

     await ref.once("value", (snapshot) => {
        const data = snapshot.val();
        this.crearPDFNacion(data);
        this.dialog = false;
      });
    },

    crearPDFProvincia() {
      if (this.dataPartidos) {
        const doc = new jsPDF();
        doc.setFontSize(12);

        // Agregar el título al PDF
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(15);
        doc.text('Votos a nivel Provincial', 105, 20, {
          align: 'center',
        });

        let startY = 40; // Posición inicial de la tabla

        // Encabezado con las columnas adicionales
        const tableHeaders = [
          {
            content: 'Lista Interna',
          },
          {
            content: 'Gobernador',
          },
          {
            content: 'Legisladores Provinciales',
          },
          {
            content: 'Intendente',
          },
          {
            content: 'Candidato Intendente',
          },
        ];

        const tableData = [];

        for (const listaNombre in this.dataPartidos) {
          const listaInterna = this.dataPartidos[listaNombre];
          const votos = listaInterna.votos;

          tableData.push([
            { content: listaNombre },
            { content: votos.gobernador },
            { content: votos.legisladoresProvinciales },
            { content: votos.intendente },
            { content: listaInterna.candidatoIntendente },
          ]);
        }

        doc.autoTable({
          head: [tableHeaders],
          body: tableData,
          startY: startY,
        });
        doc.output("dataurlnewwindow");
        this.dialog = false;

      } else {
        this.dialog = false;
        console.log('No hay datos de agrupaciones para mostrar en el PDF.');
      }
    },

    crearPDFNacion(data) {
      if (data) {
        const doc = new jsPDF();
        doc.setFontSize(12);

        // Agregar el título al PDF
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(15);
        doc.text('Votos para Presidente de la Nación', 105, 20, {
          align: 'center',
        });

        let startY = 40; // Posición inicial de la tabla

        // Encabezado con las columnas adicionales
        const tableHeaders = [
          {
            content: 'Partido / Lista',
          },
          {
            content: 'Votos Presidente',
          },
        ];

        const tableData = [];

        for (const partido in data) {
          const presidenteVotos = data[partido].presidente;

          tableData.push([
            { content: partido },
            { content: presidenteVotos },
          ]);

          if (data[partido].hasOwnProperty('LISTA A CELESTE Y BLANCA')) {
            const listaCelesteBlancaVotos = data[partido]['LISTA A CELESTE Y BLANCA'].presidente;
            tableData.push([
              { content: 'LISTA A CELESTE Y BLANCA' },
              { content: listaCelesteBlancaVotos },
            ]);
          }
        }

        doc.autoTable({
          head: [tableHeaders],
          body: tableData,
          startY: startY,
        });

        doc.output("dataurlnewwindow");
        this.dialog = false;

      } else {
        console.log('No hay datos para mostrar en el PDF.');
        this.dialog = false;
      }
    },
  }
}
</script>

<style></style>