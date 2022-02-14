<template>
  <div class="container tab-container" align="left" v-if="tabIndex === index">
    <br>
    <div class="row tab-container">
      <slot></slot>
    </div>
    <div v-if="hintText !== ''" class="row tab-container" align="center">
      <b-button v-b-toggle="labKey" size="sm" pill variant="info">Need a hint?</b-button>
      <br>
      <b-collapse :id="labKey" class="mt-2">
        <b-card>
          {{ hintText }}
          <br>
          <img :src="require(`@/assets/images/${imgSource}`)" :width="imgWidth" :height="imgHeight" />
        </b-card>
      </b-collapse>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LabTab',
  props: [
    'labTitle', 
    'labKey', 
    'labText', 
    'hintText', 
    'imgSource', 
    'imgWidth', 
    'imgHeight', 
    'index',
    'tabIndex'
  ]
}
</script>
<style scoped>
.tab-container {
  margin: 5px;
}
</style>