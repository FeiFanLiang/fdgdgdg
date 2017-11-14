<template>
<div id="app">
  <div class="write-content" @drop="handleDrag" @dragover="handleDragover" @dragleave="handleDragleave" :class="{focused:isFocus, dragoverd: isDrogover}">
    <ImgList :lists="images" @del="del"/>
    <div style="    display: inline-block;float: left;">
      <textarea @paste="handleTPaste" @focus="handleTFocus" @blur="handleTBlur" v-model="showText" placeholder="" contentEditable="true"></textarea>
      <p class="drag-and-drop">
        <span class="default" v-show="upStatus === 'default'">
            图片通过拖拽,
            <input type="file" multiple="multiple"
              class="manual-file-chooser js-manual-file-chooser "
              @click="fileInputClick"
              @change="fileInputChange" >
            <button class="btn-link manual-file-chooser-text">选择图片选择它们</button>,或从剪贴板粘贴.
          </span>
        <span class="loading" v-show="upStatus === 'loading'">
            图片上传中<strong>{{percentText}}%</strong>
          </span>
        <span class="error" v-show="upStatus === 'error'">
            {{errorText}}
          </span>
      </p>
    </div>

  </div>
</div>
</template>

<script>
import ImgList from './img-list.vue'

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
      isFocus: false,
      isDrogover: false,
      upStatus: 'default',
      errorText: '',
      percentText: 0,
      headers: {},
      action: 'http://192.168.10.95:8500/Hotel/Image/'
    }
  },
  computed: {
    showText: {
      get() {
        // let names = this.images.map(image => image.name)
        return JSON.stringify(this.images)
      }
    }
  },
  components: {
    ImgList
  },
  mounted() {
    this.$nextTick(() => {
      this.$on('onFileError', (file, msg) => {
        this.upStatus = 'error'
        this.errorText = msg
      })
      this.$on('beforeFileUpload', () => {
        this.upStatus = 'loading'
      })
      this.$on('onFileProgress', msg => {
        this.percentText = parseInt(msg.percent)
        this.upStatus = 'default'
      })
      this.$on('onFileUpload', (file, msg) => {
        this.upStatus = 'default'
      })
    })
  },

  methods: {
    del(index) {
      this.$emit('onRemove', this.images[index], this.images)
    },
    handleTFocus(e) {
      this.isFocus = true
    },
    handleTBlur(e) {
      this.isFocus = false
    },
    uploadComplete(err, data) {
      if (err) {
        return
      }
      console.log(data)
      this.$emit('onSuccess', data)
    },
    //drag-drop
    handleDrag(e) {
      // 获取文件列表
      let fileList = e.dataTransfer.files
      let hasImg = this.fileUpload(fileList)
      if (hasImg) {
        this.isDrogover = false
        e.preventDefault()
      }
    },
    handleDragover(e) {
      this.isDrogover = true
      e.preventDefault()
    },
    handleDragleave(e) {
      this.isDrogover = false
      e.preventDefault()
    },
    //form
    fileInputClick(e) {
      document.querySelector('.js-manual-file-chooser').value = ''
    },
    fileInputChange(e) {
      let myFiles = e.target.files
      this.fileUpload(myFiles)
    },
    //paste
    handleTPaste(event) {
      function isImage(items) {
        let i = 0
        let item
        while (i < items.length) {
          item = items[i]
          if (item.type.indexOf('image') !== -1) {
            return item
          }
          i++
        }
        return false
      }

      function getFilename(e) {
        let value
        if (e && e.clipboardData && e.clipboardData.getData) {
          if (/image/.test(e.clipboardData.types)) {
            //粘贴图片
            value = e.clipboardData.getData('image/xxxx')
          }
          //  else if (/text\/plain/.test(e.clipboardData.types)) {
          //   //粘贴简单文本 ....
          //   value = e.clipboardData.getData('text/plain')
          // }
          if (e.preventDefault) {
            e.stopPropagation()
            e.preventDefault()
          }
          return false
        }
      }

      let image
      if (event.clipboardData && event.clipboardData.items) {
        image = isImage(event.clipboardData.items)
        if (image) {
          event.preventDefault()
          let file = image.getAsFile()
          // file.name = getFilename(event) || 'image-' + Date.now() + '.png'
          return this.fileUpload([file])
        }
      }
    },
    //upload
    fileUpload(myFiles) {
      if (myFiles.length > 0) {
        Array.prototype.slice.call(myFiles, 0).map(file => {
          if (/^image/.test(file.type)) {
            return this._handleUpload(file, (err, data) => {
              this.uploadComplete(err, data)
            })
          }
        })
      } else {
        let err = new Error('No files to upload for this field')
        this.$emit('onFileError', myFiles, err)
      }
    },
    _handleUpload(file, callback) {
      let form = new win.FormData()
      let xhr = new win.XMLHttpRequest()
      this.$emit('beforeFileUpload', file)
      try {
        form.append('file', file, file.name)
      } catch (err) {
        this.$emit('onFileError', file, err)
        return
      }

      xhr.upload.addEventListener('progress', this._onProgress, false)

      xhr.onreadystatechange = () => {
        if (xhr.readyState < 4) {
          return
        }
        if (xhr.status < 400) {
          let res = xhr.responseText
          this.$emit('onFileUpload', file, res)
          callback(null, res)
        } else {
          let err = JSON.parse(xhr.responseText)
          err.status = xhr.status
          err.statusText = xhr.statusText
          this.$emit('onFileError', file, err)
          callback(err)
        }
      }

      xhr.onerror = () => {
        let err = JSON.parse(xhr.responseText)
        err.status = xhr.status
        err.statusText = xhr.statusText
        this.$emit('onFileError', file, err)
        callback(err)
      }

      xhr.open('POST', this.action, true)
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
      if (this.headers) {
        for (let header in this.headers) {
          xhr.setRequestHeader(header, this.headers[header])
        }
      }
      xhr.send(form)
      // this.$emit('afterFileUpload', file)
    },
    _onProgress(e) {
      e.percent = e.loaded / e.total * 100
      this.$emit('onFileProgress', e)
    }
  }
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

.write-content textarea:focus {
  background-color: #fff;
  border-color: #51a7e8;
  outline: none;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.075), 0 0 5px rgba(81, 167, 232, 0.5);
}

.write-content.focused .drag-and-drop {
  border-color: #51a7e8;
  box-shadow: rgba(81, 167, 232, 0.5) 0 0 3px;
}

.dragoverd textarea,
.dragoverd .drag-and-drop {
  box-shadow: #c9ff00 0 0 3px;
}

.manual-file-chooser {
  position: absolute;
  width: 240px;
  padding: 5px;
  margin-left: -80px;
  cursor: pointer;
  opacity: 0.0001;
}

.manual-file-chooser-text {
  display: inline-block;
  padding: 0;
  font-size: inherit;
  color: #4078c0;
  white-space: nowrap;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: transparent;
  border: 0;
  -webkit-appearance: none;
  text-transform: none;
}

.manual-file-chooser-text:hover,
.manual-file-chooser-text:focus {
  text-decoration: underline;
  outline: none;
}

.drag-and-drop {
  width:200px;
  padding: 7px 10px;
  margin: 0;
  font-size: 13px;
  line-height: 16px;
  color: #767676;
  background-color: #fafafa;
  border: 1px solid #ccc;
  border-top: 0;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
}

.drag-and-drop .default {
  display: inline-block;
}

.drag-and-drop .error {
  color: #bd2c00;
}
</style>
