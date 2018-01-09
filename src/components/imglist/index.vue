<template>
<div id="app">
  <div class="write-content">
    <ImgList :lists="images"/>
    <div style="display: inline-block;float: left;">
      <textarea v-model="showText"></textarea>
    </div>
  </div>
</div>
</template>

<script>
import ImgList from './img-list.vue'
import path from 'api/api'

let win = window
export default {
  props: {
    images: {
      type: Array
    },
    list: {
      type: Array
    }
  },
  data() {
    return {
    }
  },
  computed: {
    showText: {
      get() {
        return JSON.stringify(this.images)
      }
    }
  },
  components: {
    ImgList
  },
}
</script>



<style scoped>
* {
  box-sizing: border-box;
}

.write-content {
  position: relative;
  width: 100%;
}

.write-content textarea {
  /* width: 100%; */
  margin-right: 10px;
  width: 200px;
  min-height: 150px;
  max-height: 500px;
  padding: 10px;
  resize: vertical;
  display: block;
  border: 1px solid #ddd;
  border-bottom: 1px dashed #ddd;
  font-size: 14px;
  line-height: 1.6;
  background-color: #fafafa;
  border-radius: 3px 3px 0 0;
  outline: none;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.075);
}


</style>
