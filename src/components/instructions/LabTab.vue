<template>
  <b-tab :title="labTitle">
    <div class="container" align="left">
      <br>
      <div class="row">
        <div class="col-7">
          <slot></slot>
        </div>
        <div class="col-5" align="center">
          <b-button v-b-toggle="labKey" size="sm" pill variant="info">Need a hint?</b-button>
          <b-collapse :id="labKey" class="mt-2">
            <b-card>
              {{ hintText }}
              <br>
              <img :src="require(`@/assets/images/${imgSource}`)" :width="imgWidth" :height="imgHeight" />
            </b-card>
          </b-collapse>
        </div>
      </div>
    </div>
  </b-tab>
</template>
<script>
export default {
  name: 'LabTab',
  props: ['labTitle', 'labKey', 'labText', 'hintText', 'imgSource', 'imgWidth', 'imgHeight']
}
</script>
