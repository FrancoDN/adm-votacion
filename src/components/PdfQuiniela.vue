<template>
  <button @click="createPDF">Generar PDF</button>
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
      if (this.selectedPersonName && this.avales && this.numeroDeAvales) {
        // Obtener el objeto de la persona seleccionada en base al nombre
        const selectedPerson = this.numeroDeAvales.find(
          (person) => person.name === this.selectedPersonName
        );

        if (selectedPerson) {
          // Obtener los avales totales de la persona seleccionada
          const avalesTotales = selectedPerson.avales || [];

          // Filtrar los avales cargados de la persona seleccionada
          const avalesCargados = Object.values(this.avales)
            .filter((aval) => aval.persona === this.selectedPersonName)
            .map((aval) => aval.avalNumero);

          // Encontrar los avales faltantes que están en avalesTotales pero no en avalesCargados
          const avalesFaltantes = avalesTotales.filter(
            (aval) => !avalesCargados.includes(aval)
          );

          // Ahora, en "avalesFaltantes" tienes los avales que no aparecen en "avalesCargados" pero sí en "avalesTotales"
          console.log("Avales totales:", avalesTotales);
          console.log("Avales cargados:", avalesCargados);
          console.log("Avales faltantes:", avalesFaltantes);

          return avalesFaltantes
        } else {
          console.log(
            "La persona seleccionada no existe en el objeto numeroDeAvales."
          );
          return [];
        }
      }
    },

    createPDF() {
      const avalesFaltantes = this.getAvalesFaltantes();

      if (avalesFaltantes.length > 0) {
        const doc = new jsPDF();
        doc.setFontSize(12);
        doc.text(`Avales faltantes para ${this.selectedPersonName}`, 20, 20);

        const tableData = [];
        avalesFaltantes.forEach((aval) => {
          tableData.push([this.selectedPersonName, aval]);
        });

        doc.autoTable({
          head: [["Nombre", "Aval"]],
          body: tableData,
          startY: 30,
        });

        // Mostrar el PDF en una nueva ventana del navegador
        doc.output("dataurlnewwindow");

        // O para descargarlo como archivo:
        // doc.save(`avales_faltantes_${this.selectedPersonName}.pdf`);
      } else {
        console.log("No hay avales faltantes para mostrar en el PDF.");
      }
    },
  },
};
</script>

<style>
</style>