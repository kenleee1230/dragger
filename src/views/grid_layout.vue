<template>
    <div class="container">
        <!-- <div class="hello">
            <div id="chart1">jhkjgkufjy</div>
        </div> -->
        <div class="btns">
            <span class="sub-title">工具栏</span>
            <el-button-group>
                <el-button round size='small' type='primary' @click='clearLayout'>重置位置信息</el-button>
                <el-button round size='small' type='primary' @click='setCookie'>保存面板信息</el-button>
                <el-button round size='small' type='primary' @drag="drag" @dragend="dragend" class="droppable-element" draggable="true"
                unselectable="on">拖动到合适位置松开添加组件</el-button>
            </el-button-group>
        </div>
        <div>
            <div class="title">可拖拽面板demo演示</div>
            <!-- <div class="layoutJSON">
                各组件位置信息 <code>[x, y, w, h]</code>:
                <div class="columns">
                    <div class="layoutItem" v-for="item in layout" v-bind:key="item.i">
                        <b>{{ item.i }}</b>: [{{ item.x }}, {{ item.y }}, {{ item.w }}, {{ item.h }}]
                    </div>
                </div>
            </div> -->
        </div>
        <div>
            <grid-layout ref="gridlayout" :layout.sync="layout"
                         :col-num="12"
                         :row-height="30"
                         :is-draggable="true"
                         :is-resizable="true"
                         :vertical-compact="true"
                         
            >
                <grid-item :key="item.i" v-for="item in layout" class="grid-layout-item"
                           :x="item.x"
                           :y="item.y"
                           :w="item.w"
                           :h="item.h"
                           :i="item.i"
                >
                    <!-- <echarts></echarts> -->
                    <el-image :src="urls[item.i]" lazy></el-image>
                    <!-- <img src="../assets/1.png"> -->
                    <span class="text">{{ item.i }}</span>
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
import { Msgbox, Message } from 'element-ui'
let mouseXY = {"x": null, "y": null};
let DragPos = {"x": null, "y": null, "w": 1, "h": 1, "i": null};
export default {
    components: {
        GridLayout,
        GridItem,
        // echarts
    },
    setup() {
      return {
        open() {
          Msgbox
            .confirm('已重置位置信息，是否重新渲染？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            })
            .then(() => {
              Message({
                type: 'success',
                message: '渲染成功!'
              })
            })
            .catch(() => {
              Message({
                type: 'info',
                message: '暂不刷新'
              })
            })
        }
      }
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
            ]
        }
    },
    mounted() {
        // this.$chart.line1('chart1');
        document.addEventListener("dragover", function (e) {
            mouseXY.x = e.clientX;
            mouseXY.y = e.clientY;
        }, false);
        this.checkCookie();
    },
    whatch() {
      //pass
    },
    beforeDestroy() {
    },
    created() {
    },
    methods: {
        initialize: function () {
            let $this = this;
            $this.$store.commit("SET_LAYOUT", this.layout);
        },
        getCookie: function () {
          var cookie1 = document.cookie.split('; ');
          console.log('getCookie entered');
          for(let i=0; i<(cookie1.length-2)/5; i++) {
            // console.log("checkCookie进入循环")
            let c0 = cookie1[i*5+2].trim();
            let c1 = cookie1[i*5+3].trim();
            let c2 = cookie1[i*5+4].trim();
            let c3 = cookie1[i*5+5].trim();
            // console.log(c0.indexOf('='));
            console.log(c0.substring(c0.indexOf('=')+1,c0.indexOf('e')));
            console.log(c1.substring(c1.indexOf('=')+1,c1.indexOf('e')));
            console.log(c2.substring(c2.indexOf('=')+1,c2.indexOf('e')));
            console.log(c3.substring(c3.indexOf('=')+1,c3.indexOf('e')));
            this.layout[i]['x'] = parseInt(c0.substring(c0.indexOf('=')+1,c0.indexOf('e')));
            this.layout[i]['y'] = parseInt(c1.substring(c1.indexOf('=')+1,c1.indexOf('e')));
            this.layout[i]['w'] = parseInt(c1.substring(c1.indexOf('=')+1,c1.indexOf('e')));
            this.layout[i]['h'] = parseInt(c1.substring(c1.indexOf('=')+1,c1.indexOf('e')));
            this.layout[i]['i'] = String(i)
          }
        },
        setCookie: function () {
          let d = new Date();
          d.setTime(d.getTime() + (7*24*60*60*1000));
          let expires = "expires" + d.toGMTString();
          if(this.layout != ''){
            this.delCookie();
            console.log(this.layout);
            for(let i = 0; i < this.layout.length; i++) {
              console.log("添加中")
              document.cookie = 'layout_'+ i + '_x=' + this.layout[i]['x'] + expires;
              document.cookie = 'layout_'+ i + '_y=' + this.layout[i]['y'] + expires;
              document.cookie = 'layout_'+ i + '_w=' + this.layout[i]['w'] + expires;
              document.cookie = 'layout_'+ i + '_h=' + this.layout[i]['h'] + expires;
              document.cookie = 'layout_'+ i + '=' + this.layout[i]['i'] + expires;
              console.log("添加成功")
            }
            console.log(document.cookie);
          } else {
            console.log("layout is empty")
          }
        },
        setLayout: function () {
          let cookie1 = document.cookie.split('; ');
          let layoutLength = (cookie1.length-2)/5;
          for(let i = 0; i < layoutLength; i++) {
            // console.log("添加中")
            let c0 = cookie1[i*5+2].trim();
            let c1 = cookie1[i*5+3].trim();
            let c2 = cookie1[i*5+4].trim();
            let c3 = cookie1[i*5+5].trim();
            this.layout[i]['x'] = parseInt(c0.substring(c0.indexOf('=')+1,c0.indexOf('e')));
            this.layout[i]['y'] = parseInt(c1.substring(c1.indexOf('=')+1,c1.indexOf('e')));
            this.layout[i]['w'] = parseInt(c2.substring(c2.indexOf('=')+1,c2.indexOf('e')));
            this.layout[i]['h'] = parseInt(c3.substring(c3.indexOf('=')+1,c3.indexOf('e')));
            this.layout[i]['i'] = String(i);
            // console.log("添加成功")
          }
          console.log(this.layout);
        },
        checkCookie: function () {
          //检查cookie中是否有layout数据，如果有就读取，没有就自己初始化
          console.log('checkCookie');
          let cookie1 = document.cookie.split('; ');
          console.log(cookie1);
          let ifHaveLayout = 0
          //cookie1.length-2>0,表示cookie中有layout的值，下面做读取cookie中layout的值
          if(cookie1.length-5 > 0){
            // console.log("有cookie,当前的layout值如下")
            // console.log(this.layout)
            // console.log("存放cookie值到layout中前，cookie值："+ document.cookie);
            this.layout = [];
            ifHaveLayout = 1
            for(let i=0; i<cookie1.length;i++) {
                let ca = cookie1[i].trim();
                if(ca.indexOf('layout_')===0){
                    var layout_index_in_cookie = i;
                    // console.log(layout_index_in_cookie);
                    break
                }
            }
            for(let i=0; i<(cookie1.length-layout_index_in_cookie)/5; i++) {
              let c0 = cookie1[i*5+1].trim();
              let c1 = cookie1[i*5+2].trim();
              let c2 = cookie1[i*5+3].trim();
              let c3 = cookie1[i*5+4].trim();
              console.log("c0 is " + c0);
              this.layout.push({
                x: parseInt(c0.substring(c0.indexOf('=')+1,c0.indexOf('e'))),
                y: parseInt(c1.substring(c1.indexOf('=')+1,c1.indexOf('e'))),
                w: parseInt(c2.substring(c2.indexOf('=')+1,c2.indexOf('e'))),
                h: parseInt(c3.substring(c3.indexOf('=')+1,c3.indexOf('e'))),
                i: String(i),
              })
            }
            // this.setLayout();
            console.log("读取完成，cookie值："+ document.cookie);
            console.log("layout值", this.layout);
          }
          if (!ifHaveLayout) {
            this.layout = [
                {"x": 4, "y": 0, "w": 3, "h": 7, "i": "0"},
                {"x": 4, "y": 7, "w": 4, "h": 9, "i": "1"},
                {"x": 8, "y": 8, "w": 4, "h": 10, "i": "2"},
                {"x": 0, "y": 0, "w": 4, "h": 10, "i": "3"},
                {"x": 8, "y": 0, "w": 4, "h": 8, "i": "4"},
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
          }
        },
        clearLayout: function () {
          this.delCookie();
          window.location.reload();
        },
        // eslint-disable-next-line no-unused-vars
        drag: function (e) {
            let parentRect = document.getElementById('content').getBoundingClientRect();
            let mouseInGrid = false;
            if (((mouseXY.x > parentRect.left) && (mouseXY.x < parentRect.right)) && ((mouseXY.y > parentRect.top) && (mouseXY.y < parentRect.bottom))) {
                mouseInGrid = true;
                console.log
            }
            if (mouseInGrid === true && (this.layout.findIndex(item => item.i === 'drop')) === -1) {
                this.layout.push({
                    x: (this.layout.length * 2) % (this.colNum || 12),
                    y: this.layout.length + (this.colNum || 12), // puts it at the bottom
                    w: 1,
                    h: 1,
                    i: 'drop',
                });
            }
            let index = this.layout.findIndex(item => item.i === 'drop');
            if (index !== -1) {
                try {
                    this.$refs.gridlayout.$children[this.layout.length].$refs.item.style.display = "none";
                } catch {
                  //pass
                }
                let el = this.$refs.gridlayout.$children[index];
                el.dragging = {"top": mouseXY.y - parentRect.top, "left": mouseXY.x - parentRect.left};
                let new_pos = el.calcXY(mouseXY.y - parentRect.top, mouseXY.x - parentRect.left);
                if (mouseInGrid === true) {
                    this.$refs.gridlayout.dragEvent('dragstart', 'drop', new_pos.x, new_pos.y, 1, 1);
                    DragPos.i = String(index);
                    DragPos.x = this.layout[index].x;
                    DragPos.y = this.layout[index].y;
                }
                if (mouseInGrid === false) {
                    this.$refs.gridlayout.dragEvent('dragend', 'drop', new_pos.x, new_pos.y, 1, 1);
                    this.layout = this.layout.filter(obj => obj.i !== 'drop');
                }
            }
        },
        // eslint-disable-next-line no-unused-vars
        dragend: function (e) {
            let parentRect = document.getElementById('content').getBoundingClientRect();
            let mouseInGrid = false;
            if (((mouseXY.x > parentRect.left) && (mouseXY.x < parentRect.right)) && ((mouseXY.y > parentRect.top) && (mouseXY.y < parentRect.bottom))) {
                mouseInGrid = true;
            }
            if (mouseInGrid === true) {
                alert(`Dropped element props:\n${JSON.stringify(DragPos, ['x', 'y', 'w', 'h'], 2)}`);
                this.$refs.gridlayout.dragEvent('dragend', 'drop', DragPos.x, DragPos.y, 1, 1);
                this.layout = this.layout.filter(obj => obj.i !== 'drop');
                // UNCOMMENT below if you want to add a grid-item
                this.layout.push({
                    x: DragPos.x,
                    y: DragPos.y,
                    w: 1,
                    h: 3,
                    i: DragPos.i,
                });
                this.$refs.gridLayout.dragEvent('dragend', DragPos.i, DragPos.x,DragPos.y,1,1);
                try {
                    this.$refs.gridLayout.$children[this.layout.length].$refs.item.style.display="block";
                } catch {
                  //pass
                }
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.container {
    // background-color:#eee;
    width:100%;
}
.title {
    font-size: 28px;
    font-weight: bold;
    margin: 20px;
    text-align: center;
}
.btns {
    background-color: rgb(45, 81, 105);
    width: 100%;
    text-align: left;
    padding-left: 30px;
    padding-top: 15px;
    padding-bottom: 15px;
    .sub-title {
        color: white;
        font-style: bold;
        margin-right: 15px;
        font-size: 16px;
    }
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
#chart1 {
    width: 300px;
    height: 300px;
}
</style>