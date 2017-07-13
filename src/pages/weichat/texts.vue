<!-- <template id="Editor">
    <div>
        <div id="editorElem" style="text-align:left;"></div>
        <el-button v-on:click="getContent" style="float:right;">发送</el-button>
    </div>
</template>

<script>
    import E from 'wangeditor'

    export default {
      name: 'editor',
      props: ['session'],
      data () {
        return {
        }
      },
      methods: {
        getContent: function () {
            var editor = this.editor
            let text = editor.txt.text();
            this.session.messages.push({
                text: text,
                date: new Date(),
                self: true
            });
            editor.txt.clear();
        }
      },
      mounted() {
        var editor = new E('#editorElem')
        editor.customConfig.menus = [
            'undo',  // 撤销
            'redo',  // 重复
            'emoticon',  // 表情
            'image',  // 插入图片
            'link',  // 插入链接
            'video',  // 插入视频
            'foreColor',  // 文字颜色
            'backColor',  // 背景颜色
            'quote',  // 引用
            'table'  // 表格
        ]
        // 上传图片（举例）
        editor.customConfig.uploadImgShowBase64 = true   // 使用 base64 保存图片
        editor.create()
        const dom = document.getElementsByID("editorElem");
        dom.style.height = '100px';
        this.editor = editor
        
      }
    }
</script>

<style>
#editorElem{
   height:180px;
    overflow-y: hidden; 
   margin-bottom: 10px;
   border-top: 1px solid lightgrey;
   border-bottom: 1px solid lightgrey;
}
 .w-e-text { height:100px; overflow-y: hidden;} 
</style> -->