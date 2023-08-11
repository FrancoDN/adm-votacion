<template>
  <div class="botonera" style="width: 60%; margin-top: 1.5rem; margin-bottom: 1.5rem">
    <button @click="createPDF" class="individual" v-if="selectedPersonName">
      <p style="color: white; font-weight: 700">
        Descargar avales individuales
      </p>
    </button>
    <br />
    <button @click="generatePDFForAll" class="generales" style="margin-left: 2rem">
      <p style="color: white; font-weight: 700">Descargar avales generales</p>
    </button>
  </div>
</template>

<script>
import jsPDF from "jspdf";
import "jspdf-autotable";
export default {
  props: {
    selectedPersonName: String,
    avales: Object,
    numeroDeAvales: Array,
  },
  data() {
    return {
      selectedPerson: null,
    }
  },
  watch: {
    // Se ejecutará cuando cambie la prop "selectedPersonName"
    selectedPersonName(newValue) {
      // Verificar si tanto "selectedPersonName" como "avales" están disponibles
      if (newValue && this.avales) {
        this.getAvalesFaltantes();
      }
    },
    // Se ejecutará cuando cambie la prop "avales"
    avales(newValue) {
      // Verificar si tanto "selectedPersonName" como "avales" están disponibles
      if (this.selectedPersonName && newValue) {
        this.getAvalesFaltantes();
      }
    },
  },
  methods: {
    getAvalesFaltantes() {
      // Obtener la persona seleccionada en base al nombre
      const selectedPerson = this.numeroDeAvales.find(
        (person) => person.name === this.selectedPersonName
      );
      this.selectedPerson = selectedPerson;
      if (selectedPerson) {
        // Obtener los avales totales de la persona seleccionada
        const avalesTotales = selectedPerson.avales || [];

        // Filtrar los avales cargados de la persona seleccionada
        const avalesCargados = Object.values(this.avales)
          .map((aval) => aval.avalNumero);

        // Encontrar los avales faltantes que están en avalesTotales pero no en avalesCargados
        const avalesFaltantes = avalesTotales.filter(
          (aval) => !avalesCargados.includes(aval.orden)
        );
        return avalesFaltantes;
      } else {
        console.log("La persona seleccionada no existe en el objeto numeroDeAvales.");
        return [];
      }
    },


    createPDF() {
      const avalesFaltantes = this.getAvalesFaltantes();

      if (avalesFaltantes.length > 0) {
        const doc = new jsPDF();
        doc.setFontSize(12);

        // Agregar el título al PDF
        doc.setFont("helvetica", "bold");
        doc.setFontSize(15);
        doc.text(`Avales faltantes de ${this.selectedPersonName}`, 105, 20, {
          align: "center",
        });

        let startY = 10; // Posición inicial de la primera tabla

        const rowColor = [75, 139, 190]; // Color de fondo de la fila
        const nameStyle = {
          fontSize: 12,
          textColor: [255, 255, 255],
          fontStyle: "bold",
        };

        // Dibujar un rectángulo azul para resaltar el selectedPersonName
        doc.setFillColor(rowColor[0], rowColor[1], rowColor[2]);
        doc.rect(14.2, startY + 22, 182, 8, "F");

        // Colocar el selectedPersonName encima del rectángulo con texto blanco
        doc.setTextColor(
          nameStyle.textColor[0],
          nameStyle.textColor[1],
          nameStyle.textColor[2]
        );
        doc.setFont("helvetica", "bold"); // Establecer la fuente en negrita
        doc.text(this.selectedPersonName, 16, startY + 27.5);

        // Encabezado con las columnas adicionales
        const tableHeaders = [
          [
            {
              content: "Nro de Orden",
              styles: { fillColor: [100, 100, 100], fontStyle: "bold" },
            },
            {
              content: "Nombre",
              styles: { fillColor: [100, 100, 100], fontStyle: "bold" },
            },
            {
              content: "Telefono",
              styles: { fillColor: [100, 100, 100], fontStyle: "bold" },
            },
            {
              content: "Domicilio",
              styles: { fillColor: [100, 100, 100], fontStyle: "bold" },
            },
          ],
        ];

        const tableData = [];
        avalesFaltantes.forEach((aval) => {
          // Obtener los datos de la persona en base al número de orden
          const persona = this.selectedPerson.avales.find(
            (avalesPersona) => avalesPersona.orden === aval.orden
          );
          // Agregar los datos de la persona al PDF
          tableData.push([
            aval.orden,
            persona.nombre,
            persona.celular,
            persona.domicilio,
          ]);
        });

        doc.autoTable({
          head: tableHeaders,
          body: tableData,
          startY: startY + 30, // Ajustamos la posición para que el encabezado esté separado
        });

        // Mostrar el PDF en una nueva ventana del navegador
        doc.output("dataurlnewwindow");

        // O para descargarlo como archivo:
        // doc.save(`avales_faltantes_${this.selectedPersonName}.pdf`);
      } else {
        console.log("No hay avales faltantes para mostrar en el PDF.");
      }
    },

    generatePDFForAll() {
      if (this.numeroDeAvales && this.avales) {
        const doc = new jsPDF();
        doc.setFontSize(12);

        // Agregar el título al PDF
        doc.setFont("helvetica", "bold");
        doc.setFontSize(15);
        doc.text(`Total de avales faltantes`, 105, 20, {
          align: "center",
        });

        let startY = 15; // Posición inicial de la primera tabla

        this.numeroDeAvales.forEach((person) => {
          const selectedPersonName = person.name;
          const avalesTotales = person.avales || [];
          const avalesCargados = Object.values(this.avales)
            .map((aval) => aval.avalNumero);
          const avalesFaltantes = avalesTotales.filter(
            (aval) => !avalesCargados.includes(aval.orden)
          );

          if (avalesFaltantes.length > 0) {
            const rowColor = [75, 139, 190]; // Color de fondo de la fila
            const nameStyle = {
              fontSize: 12,
              textColor: [255, 255, 255],
              fontStyle: "bold",
            };

            // Dibujar un rectángulo azul para resaltar el selectedPersonName
            doc.setFillColor(rowColor[0], rowColor[1], rowColor[2]);
            doc.rect(14.2, startY + 12, 182, 8, "F");

            // Colocar el selectedPersonName encima del rectángulo con texto blanco
            doc.setTextColor(
              nameStyle.textColor[0],
              nameStyle.textColor[1],
              nameStyle.textColor[2]
            );
            doc.setFont("helvetica", "bold"); // Establecer la fuente en negrita
            doc.text(selectedPersonName, 16, startY + 18);

            // Restaurar el color de texto a negro para el resto del contenido
            doc.setTextColor(0, 0, 0); // Color de texto negro

            doc.setDrawColor(0, 0, 0); // Color de la línea
            doc.line(20, startY + 22, 190, startY + 25); // Línea debajo del título

            // Encabezado con las columnas adicionales
            const tableHeaders = [
              [
                {
                  content: "Nro de Orden",
                  styles: { fillColor: [100, 100, 100], fontStyle: "bold" },
                },
                {
                  content: "Nombre",
                  styles: { fillColor: [100, 100, 100], fontStyle: "bold" },
                },
                {
                  content: "Telefono",
                  styles: { fillColor: [100, 100, 100], fontStyle: "bold" },
                },
                {
                  content: "Domicilio",
                  styles: { fillColor: [100, 100, 100], fontStyle: "bold" },
                },
              ],
            ];

            const tableData = [];
            avalesFaltantes.forEach((aval) => {
              // Obtener los datos de la persona en base al número de orden
              const persona = person.avales.find(
                (avalesPersona) => avalesPersona.orden === aval.orden
              );
              // Agregar los datos de la persona al PDF
              tableData.push([aval.orden, persona.nombre, persona.celular, persona.domicilio]);
            });

            doc.autoTable({
              head: tableHeaders,
              body: tableData,
              startY: startY + 20, // Ajustamos la posición para que el encabezado esté separado
            });

            startY = doc.autoTable.previous.finalY; // Actualizamos la posición de inicio para la siguiente tabla
          }
        });

        if (startY === 15) {
          console.log("No hay avales faltantes para mostrar en el PDF.");
        } else {
          // Mostrar el PDF en una nueva ventana del navegador
          doc.output("dataurlnewwindow");

          // O para descargarlo como archivo:
          // doc.save("avales_faltantes_todos.pdf");
        }
      } else {
        console.log("No hay datos para generar el PDF.");
      }
    },

  },
};
</script>

<style>
.botonera {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.generales,
.individual {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 23rem;
  background: #8a8f90;
  border-radius: 2rem;
}

.generales:hover,
.individual:hover {
  background: #6c6f70;
}

.generales:active,
.individual:active {
  background: #4d4f50;
}
</style>