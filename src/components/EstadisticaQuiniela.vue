<template>
  <div class="statistics">
      <div class="statistic">
        <p class="label mb-0 mt-3">Padrón electoral</p>
        <p class="value mb-3">{{padron}}</p>
      </div>
      <div class="statistic">
        <p class="label mb-0 mt-3">Avales</p>
        <p class="value mb-3">{{totalAvales}}</p>
      </div>
      <!-- <div class="statistic">
        <p class="label mb-0 mt-3">Porcentaje confirmado</p>
        <p class="value mb-3">{{ totalAvales*100/padron }}</p>
      </div> -->
    </div>
</template>

<script>
export default {
  props: {
    numeroDeAvales: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      padron: 81743,
      totalAvales: 0, 
    }
  },
  mounted() {
    this.countTotalAvals(this.numeroDeAvales);
  },
  methods: {
    countTotalAvals(data) {
      if (data) {
        Object.values(data).forEach((persona) => {
          if (persona.avales) {
            this.totalAvales += Object.keys(persona.avales).length;
          }
        });
      }
    },
  },
}
</script>

<style>
.statistics {
  background: #f3f3f3;
  box-shadow: 0px 10px 75px 25px rgba(1, 151, 186, 0.05);
  display: flex;
  justify-content: space-evenly;
}

.statistic {
  text-align: center;
}

.label {
  font-size: 2rem;
  font-family: Nunito;
  font-weight: 700;
  color: #000000;
  text-align: center;
  margin: 0;
}

.value {
  font-size: 1.7rem;
  font-family: Nunito;
  color: #1baed0;
  font-weight: 700;
}
</style>