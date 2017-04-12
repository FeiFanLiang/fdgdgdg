<templete land='jade'>
  div.mcontent
    div.title 添加酒店政策
      buton(@clike="goback") 返回
    div.content
      div
        div.form-group
        label 名称

</templete>
<script>
export default {
  // name = "HotelPolicyAdd",
  components:{

  },//组件
  created: function () {
    console.log(this.$router.params.id);
  },//构造方法
  methods:{

  }
}
</script>
