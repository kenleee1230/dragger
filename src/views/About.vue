<template>
  <div class="about">
    <div class="title">
      <h1>课程：医疗大数据与网络编程</h1>
      <h1>小组成员：李凯升，丁逸聪，冯树扬，刘嘉伟</h1>
      <el-button @click="getIndex" type="primary">返回首页</el-button>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    
  },
  methods: {
    getIndex: function () {
      this.$router.replace('/');
    }
  }
}
</script>

<style lang="scss" scoped>
.about {
  height: 500px;
  width: 700px;
  position: relative;
  margin: 0 auto;
  .title {
    // margin: 0 auto;
    // justify-content: center;
    // align-items: center;  
    position: absolute;
    top:50%;
    transform: translateY(-50%);
  }
}
</style>
