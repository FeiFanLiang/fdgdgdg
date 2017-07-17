<!-- <template id="Editor">
    <div>
        <div id="div1"></div>
        <div id="div2"></div>
        <el-button v-on:click="getContent" style="float:right;margin:10px;" size="small">发送</el-button> 
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
         var editor = new E('#div1', '#div2')
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
            'table',  // 表格
            
        ] 
        // 上传图片（举例）
        editor.customConfig.uploadImgShowBase64 = true   // 使用 base64 保存图片
        $('#div2').css('height', 140)
        $('#div1').css('width', '100%')
        editor.create()
        this.editor = editor 
      }
    }
</script>

<style>
#div1{
    width: 100%;
}
 .w-e-text { height:100px; overflow-y: auto;}  
</style> -->