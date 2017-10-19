<template>
  <div id="app">
    <div class="write-content"
        @drop="handleDrag"
        @dragover="handleDragover"
        @dragleave="handleDragleave"
        :class="{focused:isFocus, dragoverd: isDrogover}">
      <textarea
        @paste="handleTPaste"
        @focus="handleTFocus"
        @blur="handleTBlur"
        v-model="text"
        placeholder=""></textarea>
        <p class="drag-and-drop">
          <span class="default" v-show="upStatus === 'default'">
            图片通过拖拽,
            <input type="file" multiple="multiple"
              class="manual-file-chooser js-manual-file-chooser"
              @click="fileInputClick"
              @change="fileInputChange">
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
    <ImgList :lists="images" />
  </div>
</template>

<script>
import ImgList from './img-list.vue'

var win = window
export default {
  data() {
    return {
      text: '',
      images: [],
      isFocus: false,
      isDrogover: false,
      upStatus: 'default',
      errorText: '',
      percentText: 0,
      //upload
      headers: {},
      action: 'http://192.168.10.95:8500/Hotel/Image/'
    }
  },
  components: {
    ImgList
  },
  filters: {},
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
      })
      this.$on('onFileUpload', (file, msg) => {
        this.upStatus = 'default'
      })
    })
  },
  methods: {
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
      this.images.push({
        url: data.url
      })
      this.text += '![image]($src)'.replace('$src', data.url)
    },
    //drag-drop
    handleDrag(e) {
      // 获取文件列表
      var fileList = e.dataTransfer.files
      var hasImg = this.fileUpload(fileList)
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
      console.log('fileInputClick', e)
    },
    fileInputChange(e) {
      var myFiles = e.target.files
      this.fileUpload(myFiles)
    },
    //paste
    handleTPaste(event) {
      function isImage(items) {
        var i = 0
        var item
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
        var value
        if (window.clipboardData && window.clipboardData.getData) {
          value = window.clipboardData.getData('Text')
        } else if (e.clipboardData && e.clipboardData.getData) {
          value = e.clipboardData.getData('text/plain')
        }
        value = value.split('\r')
        return value.first()
      }
      var image
      if (event.clipboardData && event.clipboardData.items) {
        image = isImage(event.clipboardData.items)
        if (image) {
          event.preventDefault()
          var file = image.getAsFile()
          file.name = getFilename(event) || 'image-' + Date.now() + '.png'
          return this.fileUpload([file])
        }
      }
    },
    //upload
    fileUpload(myFiles) {
      var hasImg = false
      if (myFiles.length > 0) {
        // a hack to push all the Promises into a new array
        Array.prototype.slice.call(myFiles, 0).map(file => {
          if (/^image/.test(file.type)) {
            hasImg = true
            return this._handleUpload(file, (err, data) => {
              this.uploadComplete(err, data)
            })
          }
        })
      } else {
        // someone tried to upload without adding files
        var err = new Error('No files to upload for this field')
        // this.$dispatch('onFileError', myFiles, err)
      }
      return hasImg
    },
    _handleUpload(file, callback) {
      var form = new win.FormData()
      var xhr = new win.XMLHttpRequest()
      // this.$dispatch('beforeFileUpload', file)
      try {
        // form.append('Content-Type', file.type || 'application/octet-stream')
        // our request will have the file in the ['file'] key
        form.append('file', file, file.name)
      } catch (err) {
        // this.$dispatch('onFileError', file, err)
        return
      }

      xhr.upload.addEventListener('progress', this._onProgress, false)

      xhr.onreadystatechange = function() {
        if (xhr.readyState < 4) {
          return
        }
        if (xhr.status < 400) {
          var res = JSON.parse(xhr.responseText)
          // this.$dispatch('onFileUpload', file, res)
          callback(null, res)
        } else {
          var err = JSON.parse(xhr.responseText)
          err.status = xhr.status
          err.statusText = xhr.statusText
          // this.$dispatch('onFileError', file, err)
          callback(err)
        }
      }.bind(this)

      xhr.onerror = function() {
        var err = JSON.parse(xhr.responseText)
        err.status = xhr.status
        err.statusText = xhr.statusText
        // this.$dispatch('onFileError', file, err)
        callback(err)
      }.bind(this)

      xhr.open('POST', this.action, true)
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
      if (this.headers) {
        for (var header in this.headers) {
          xhr.setRequestHeader(header, this.headers[header])
        }
      }
      xhr.send(form)
      // this.$dispatch('afterFileUpload', file)
    },
    _onProgress(e) {
      // this is an internal call in XHR to update the progress
      e.percent = e.loaded / e.total * 100
      // this.$dispatch('onFileProgress', e)
    }
  }
}
</script>



<style scoped>
*{
  box-sizing: border-box;
}
.write-content {
  position: relative;
  width: 600px;
  margin: 0 auto;
}
.write-content textarea {
  width: 100%;
  min-height: 200px;
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
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.075);
}
.write-content textarea:focus{
  background-color: #fff;
  border-color: #51a7e8;
  outline: none;
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.075),0 0 5px rgba(81,167,232,0.5);
}
.write-content.focused .drag-and-drop{
  border-color: #51a7e8;
  box-shadow: rgba(81,167,232,0.5) 0 0 3px;
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
.manual-file-chooser-text{
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
.drag-and-drop{
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
.drag-and-drop .default{
  display: inline-block;
}
.drag-and-drop .error{
  color: #bd2c00;
}
</style>
