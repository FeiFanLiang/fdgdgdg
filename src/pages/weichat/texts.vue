<template lang="html">
    <div class="m-text">
        <p>
            <img src="../../assets/images/common/hh.png" width="30px">&nbsp;&nbsp;
            <el-radio-group v-model="radio" style="margin:-20px 0 0 0;">
                <el-radio-button label="1"><i class="el-icon-edit">文字 </i></el-radio-button>
                <el-radio-button label="2"><i class="el-icon-picture">图片</i></el-radio-button>
                <el-radio-button label="3"><i class="el-icon-edit">语音</i></el-radio-button>
                <el-radio-button label="4"><i class="el-icon-edit">视频</i></el-radio-button>
            </el-radio-group>
        </p>
        <textarea v-model="text"></textarea>
        <el-button @click="inputing">发送</el-button>
    </div>
</template>
<script>
    export default {
        props: ['session'],
        data () {
            return {
                text: '',
                radio:'1'
            };
        },
        methods: {
            inputing () {
                this.session.messages.push({
                    text: this.text,
                    date: new Date(),
                    self: true
                });
                this.text = '';
            }
        }
    };
</script>
<style lang="less">
    .m-text {
        height: 160px;
        border-top: solid 1px #ddd;
        
        textarea {
            padding: 10px;
            height: 65%;
            width:97%;
            //border: none;
            outline: none;
            font-family: "Micrsofot Yahei";
            resize: none;
        }
    }
</style>