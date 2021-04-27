<template>
    <div class="container">
        <div class="btns">
            <!-- <span class="sub-title">工具栏</span> -->
            <el-button-group>
                <el-button round size='small' type='primary' @click='clearLayout'>重置面板信息</el-button>
                <el-button round size='small' type='primary' @click='setCookie'>保存面板信息</el-button>
                <el-button round size="small" type="primary" @click="addItem">添加组件</el-button>
            </el-button-group>
            <div class="title">可拖拽面板demo演示<span class="about-us" @click="getAboutUs">  | 关于我们 </span></div>
        </div>
        <!-- <div>
            <div class="layoutJSON">
                各组件位置信息 <code>[x, y, w, h]</code>:
                <div class="columns">
                    <div class="layoutItem" v-for="item in layout" v-bind:key="item.i">
                        <b>{{ item.i }}</b>: [{{ item.x }}, {{ item.y }}, {{ item.w }}, {{ item.h }}, {{ item.p }}]
                    </div>
                </div>
            </div>
        </div> -->
        <div id="content">
            <grid-layout ref="gridlayout" :layout.sync="layout"
                         :col-num="12"
                         :row-height="30"
                         :is-draggable="true"
                         :is-resizable="true"
                         :vertical-compact="true"
                         :use-css-transforms="true"
            >
                <grid-item :key="item.i" v-for="item in layout" class="grid-layout-item"
                           :x="item.x"
                           :y="item.y"
                           :w="item.w"
                           :h="item.h"
                           :i="item.i"
                >
                    <!-- <echarts></echarts> -->
                    <el-image :src="urls[item.p]" lazy></el-image>
                    <!-- <img src="../assets/1.png"> -->
                    <span class="text">{{ item.i }}</span>
                    <span class="remove" @click="removeItem(item.i)">x</span>
                </grid-item>
            </grid-layout>
        </div>
    </div>
</template>

<script>
// import echarts from '../components/echarts'
import {GridLayout, GridItem} from "vue-grid-layout";
import pic1 from "../assets/1.png"
import pic2 from "../assets/2.png"
import pic3 from "../assets/3.png"
import pic4 from "../assets/4.png"
import pic5 from "../assets/5.png"
import pic6 from "../assets/6.png"
import pic7 from "../assets/7.png"
import pic8 from "../assets/8.png"
import pic9 from "../assets/9.png"
import pic10 from "../assets/10.png"
import pic11 from "../assets/11.png"
import pic12 from "../assets/12.png"
let mouseXY = {"x": null, "y": null};
export default {
    components: {
        GridLayout,
        GridItem,
        // echarts
    },
    setup() {
      return {}
    },
    data() {
        return {
            layout: [],
            orgOptions: {},
            urls: [
                pic1,
                pic2,
                pic3,
                pic4,
                pic5,
                pic6,
                pic7,
                pic8,
                pic9,
                pic10,
                pic11,
                pic12
            ],
            index: 0,
        }
    },
    mounted() {
        // this.$chart.line1('chart1');
        document.querySelector('body').setAttribute('style', 'margin:0;padding:0');
        document.addEventListener("dragover", function (e) {
            mouseXY.x = e.clientX;
            mouseXY.y = e.clientY;
        }, false);
        this.checkCookie();
        this.index = this.layout.length;
    },
    whatch() {
      //pass
    },
    beforeDestroy() {
    },
    created() {
    },
    methods: {
        setCookie: function () {
          let d = new Date();
          d.setTime(d.getTime() + (7*24*60*60*1000));
          let expires = "expires" + d.toGMTString();
          if(this.layout != ''){
            this.delCookie();
            for(let i = 0; i < this.layout.length; i++) {
              document.cookie = 'layout_'+ i + '_x=' + this.layout[i]['x'] + expires;
              document.cookie = 'layout_'+ i + '_y=' + this.layout[i]['y'] + expires;
              document.cookie = 'layout_'+ i + '_w=' + this.layout[i]['w'] + expires;
              document.cookie = 'layout_'+ i + '_h=' + this.layout[i]['h'] + expires;
              document.cookie = 'layout_'+ i + '=' + this.layout[i]['i'] + expires;
              document.cookie = 'layout_'+ i + '_p=' + this.layout[i]['p'] + expires;
            }
          } else {
            window.alert("layout is empty")
          }
        },
        checkCookie: function () {
          //检查cookie中是否有layout数据，如果有就读取，没有就自己初始化
          let cookie1 = document.cookie.split('; ');
          let ifHaveLayout = 0
          if(cookie1.length-6 > 0){
            this.layout = [];
            ifHaveLayout = 1
            for(let i=0; i<cookie1.length;i++) {
                let ca = cookie1[i].trim();
                if(ca.indexOf('layout_')===0){
                    var layout_index_in_cookie = i;
                    break
                }
            }
            for(let i=0; i<(cookie1.length-layout_index_in_cookie)/6; i++) {
              let c0 = cookie1[i*6+layout_index_in_cookie].trim();
              let c1 = cookie1[i*6+layout_index_in_cookie+1].trim();
              let c2 = cookie1[i*6+layout_index_in_cookie+2].trim();
              let c3 = cookie1[i*6+layout_index_in_cookie+3].trim();
              let c4 = cookie1[i*6+layout_index_in_cookie+5].trim();
              this.layout.push({
                x: parseInt(c0.substring(c0.indexOf('=')+1,c0.indexOf('e'))),
                y: parseInt(c1.substring(c1.indexOf('=')+1,c1.indexOf('e'))),
                w: parseInt(c2.substring(c2.indexOf('=')+1,c2.indexOf('e'))),
                h: parseInt(c3.substring(c3.indexOf('=')+1,c3.indexOf('e'))),
                i: String(i),
                p: parseInt(c4.substring(c4.indexOf('=')+1,c4.indexOf('e'))),
              })
            }
          }
          if (!ifHaveLayout) {
            this.layout = [
                {"x": 3, "y": 0, "w": 4, "h": 12, "i": "0", "p": 1,},
                {"x": 0, "y": 12, "w": 4, "h": 9, "i": "1", "p": 2,},
                {"x": 4, "y": 12, "w": 8, "h": 14, "i": "2", "p": 3},
                {"x": 0, "y": 0, "w": 3, "h": 12, "i": "3", "p": 4},
                {"x": 7, "y": 0, "w": 5, "h": 12,  "i": "4", "p": 5},
            ];
            this.setCookie();
          }
        },
        delCookie: function () {
          let cookie1 = document.cookie.split('; ');
          //for循环删除cookie中的layout数据
          for(let i = 0;i < (cookie1.length-2) / 5; i++) {
            document.cookie = "layout_"+i+"_x=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
            document.cookie = "layout_"+i+"_y=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
            document.cookie = "layout_"+i+"_w=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
            document.cookie = "layout_"+i+"_h=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
            document.cookie = "layout_"+i+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
            document.cookie = "layout_"+i+"_p=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
          }
        },
        clearLayout: function () {
          this.delCookie();
          window.location.reload();
        },
        getAboutUs: function () {
            this.$router.replace('/about');
        },
        addItem: function () {
            this.layout.push({
                x: (this.layout.length * 2) % (this.colNum || 12),
                y: this.layout.length + (this.colNum || 12), // puts it at the bottom
                w: 3,
                h: 7,
                i: this.index,
                p: this.index,
            });
            this.index++;
        },
        removeItem: function (val) {
            const index = this.layout.map(item => item.i).indexOf(val);
            this.layout.splice(index, 1);
        },
    }
}
</script>

<style lang="scss" scoped>
body {
    padding:0; margin:0;
}
.container {
    // background-color:#eee;
    width:100%;
}
.title {
    font-size: 28px;
    font-weight: bold;
    color: white;
    text-align:left;
    padding-left:2%;
    float:left;
    .about-us {
        font-size: 18px;
        font-weight: normal;
        padding-left: 10px;
    }
}
.btns {
    background-color: rgb(45, 81, 105);
    text-align: right;
    padding-right: 30px;
    padding-top: 15px;
    padding-bottom: 15px;
}
.droppable-element {
    height: 60px;
}
.content {
    width:100%;
}
.remove {
    position: absolute;
    right: 2px;
    top: 0;
    cursor: pointer;
}
.vue-grid-layout {
    background: #eee;
    touch-action: none;
    box-sizing: border-box;
}
.vue-grid-item:not(.vue-grid-placeholder) {
    background: rgb(255, 255, 255);
    border: 1px solid black;
}
.vue-grid-item .resizing {
    opacity: 0.9;
}
.vue-grid-item .static {
    background: #cce;
}
.vue-grid-item .text {
    font-size: 24px;
    text-align: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    height: 100%;
    width: 100%;
}
.vue-grid-item .no-drag {
    height: 100%;
    width: 100%;
}
.vue-grid-item .minMax {
    font-size: 12px;
}
.vue-grid-item .add {
    cursor: pointer;
}
.vue-draggable-handle {
    position: absolute;
    width: 20px;
    height: 20px;
    top: 0;
    left: 0;
    background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><circle cx='5' cy='5' r='5' fill='#999999'/></svg>") no-repeat;
    background-position: bottom right;
    padding: 0 8px 8px 0;
    background-repeat: no-repeat;
    background-origin: content-box;
    box-sizing: border-box;
    cursor: pointer;
}
.layoutJSON {
    background: #ddd;
    border: 1px solid black;
    margin-top: 10px;
    padding: 10px;
}
.layoutJSON {
    background: #ddd;
    border: 1px solid black;
    margin-top: 10px;
    padding: 10px;
}
.columns {
    -moz-columns: 120px;
    -webkit-columns: 120px;
    columns: 120px;
}
</style>