<template>
  <div class="admin">
    <admin-estadistica></admin-estadistica>
    <admin-conteo></admin-conteo>
  </div>
</template>

<script>
import AdminConteo from '@/components/AdminConteo.vue';
import AdminEstadistica from '@/components/AdminEstadistica.vue';
export default {
  components: {
    AdminConteo,
    AdminEstadistica,
  },
  data() {
    return {};
  },
};
</script>

<style>
.admin {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  height: 100%;
}
</style>