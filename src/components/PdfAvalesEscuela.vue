<template>
    <div style="text-align: center; background-color:#056277;">
        <button @click="generarPDF"><p style="color: white; padding: 10px;">Generar PDF</p></button>
    </div>
</template>
  

<script>
import firebase from 'firebase/app';
import 'firebase/database';
import jsPDF from 'jspdf';
export default {
    data() {
        return {
            avalesPorEscuela: {}, // Almacena las mesas y ordenes agrupados por escuela
        };
    },
    created() {
        this.obtenerAvalPorEscuelaMesa();
    },
    methods: {
        obtenerAvalPorEscuelaMesa() {
            const db = firebase.database();

            // Obtén los datos de "escuelas"
            db.ref('escuelas').once('value', escuelasSnapshot => {
                escuelasSnapshot.forEach(escuelaSnapshot => {
                    const escuelaNombre = escuelaSnapshot.val().establecimiento;
                    const mesasEscuela = escuelaSnapshot.val().mesa;

                    if (!this.avalesPorEscuela[escuelaNombre]) {
                        this.$set(this.avalesPorEscuela, escuelaNombre, {});
                    }

                    mesasEscuela.forEach(mesa => {
                        if (!this.avalesPorEscuela[escuelaNombre][mesa]) {
                            this.$set(this.avalesPorEscuela[escuelaNombre], mesa, []);
                        }

                        db.ref('avales').once('value', avalSnapshot => {
                            avalSnapshot.forEach(avalChildSnapshot => {
                                const avalesData = avalChildSnapshot.val().avales;
                                avalesData.forEach(avalData => {
                                    if (avalData.mesa === mesa) {
                                        const orden = avalData.orden;
                                        this.avalesPorEscuela[escuelaNombre][mesa].push(orden);
                                    }
                                });
                            });
                        });
                    });
                });
            });
            console.log(this.avalesPorEscuela);
        },
        generarPDF() {
  const doc = new jsPDF();

  let startY = 10;
  let currentPage = 1;
  const maxPageHeight = 280; // Ajusta esto según sea necesario

  const fontSize = 12;
  doc.setFontSize(fontSize);

  for (const escuela in this.avalesPorEscuela) {
    const escuelaText = `Escuela: ${escuela}`;
    const escuelaHeight = doc.getTextDimensions(escuelaText).h;

    if (startY + escuelaHeight > maxPageHeight) {
      doc.addPage();
      startY = 10;
      currentPage++;
    }

    doc.text(escuelaText, 10, startY);
    startY += escuelaHeight + 5;

    const mesas = this.avalesPorEscuela[escuela];
    for (const mesa in mesas) {
      const ordenes = mesas[mesa].join(', ');
      const mesaText = `Mesa: ${mesa} - Ordenes: ${ordenes}`;
      const mesaHeight = doc.getTextDimensions(mesaText).h;

      if (startY + mesaHeight > maxPageHeight) {
        doc.addPage();
        startY = 10;
        currentPage++;
      }

      doc.text(mesaText, 10, startY);
      startY += mesaHeight + 5;
    }

    startY += 10; // Separación entre escuelas

    if (currentPage > 1) {
      doc.setPage(currentPage); // Vuelve a la página inicial
    }
  }



            doc.output("dataurlnewwindow");

        },
    },
};
</script>

<style></style>