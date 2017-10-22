<template>
<div id="app">
  <div class="write-content" @drop="handleDrag" @dragover="handleDragover" @dragleave="handleDragleave" :class="{focused:isFocus, dragoverd: isDrogover}">
    <textarea @paste="handleTPaste" @focus="handleTFocus" @blur="handleTBlur" v-model="text" placeholder="" contentEditable="true"></textarea>
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

let win = window
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
        this.upStatus = 'default'
      })
      this.$on('onFileUpload', (file, msg) => {
        console.log(111111111111,file,msg)
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
      console.log(222222, data)
      if (err) {
        return
      }
      console.log(111,this.images)
      this.images.push({
        url: 'http://192.168.10.95:8500/upload/' + data.url
      })
      this.text += '![image]($src)'.replace('$src', data.url)
      console.log(111,this.images)
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
      console.log('fileInputClick', e)
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
            value = e.clipboardData.getData('image/xxxx');
            //检测图片来源
            //如果是最原始的 data，比如 QQ 截图、Word 里复制所产生，直接把 data 上传
            //这一部分可能用了是 HTML5 中 HTTP_CONTENT_DISPOSITION 上传机制
            //除了 HTML5，非显式的 input[type="file"] 应该是无法上传文件的
            //如果是 file，上传到知乎服务器
            //如果是外部网站 URL，后台 curl get 转移到知乎服务器
            //最后生成一个知乎的 URL，作为 img 标签插入到 contentEditable div 中
          } else if (/text\/plain/.test(e.clipboardData.types)) {
            //粘贴简单文本 ....
            value = e.clipboardData.getData('text/plain')
          }
          if (e.preventDefault) {
            e.stopPropagation();
            e.preventDefault();
          }
          return false;
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
      console.log(333, myFiles)
      let hasImg = false
      if (myFiles.length > 0) {
        // a hack to push all the Promises into a new array
        Array.prototype.slice.call(myFiles, 0).map(file => {
          debugger
          if (/^image/.test(file.type)) {
            hasImg = true
            return this._handleUpload(file, (err, data) => {
              debugger
              this.uploadComplete(err, data)
            })
          }
        })
      } else {
        // someone tried to upload without adding files
        let err = new Error('No files to upload for this field')
        this.$emit('onFileError', myFiles, err)
      }
      return hasImg
    },
    _handleUpload(file, callback) {
      let form = new win.FormData()
      let xhr = new win.XMLHttpRequest()
      this.$emit('beforeFileUpload', file)
      try {
        // form.append('Content-Type', file.type || 'application/octet-stream')
        // our request will have the file in the ['file'] key
        form.append('file', file, file.name)
      } catch (err) {
        this.$emit('onFileError', file, err)
        return
      }

      xhr.upload.addEventListener('progress', this._onProgress, false)

      xhr.onreadystatechange = function() {
        if (xhr.readyState < 4) {
          return
        }
        if (xhr.status < 400) {
          // let res = JSON.parse(xhr.responseText)
          this.$emit('onFileUpload', file, res)
          callback(null, res)
        } else {
          let err = JSON.parse(xhr.responseText)
          err.status = xhr.status
          err.statusText = xhr.statusText
          this.$emit('onFileError', file, err)
          callback(err)
        }
      }.bind(this)

      xhr.onerror = function() {
        let err = JSON.parse(xhr.responseText)
        err.status = xhr.status
        err.statusText = xhr.statusText
        this.$emit('onFileError', file, err)
        callback(err)
      }.bind(this)

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
      // this is an internal call in XHR to update the progress
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
