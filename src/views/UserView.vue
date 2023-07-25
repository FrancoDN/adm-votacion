<template>
  <div class="user">
   <upload-card-vue></upload-card-vue>
  </div>
</template>

<script>
import UploadCardVue from '@/components/UploadCard.vue';

export default {
    components: {
        UploadCardVue,
    },
  data() {
    return {};
  },
};
</script>

<style>
.user {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 100%;
}
</style>