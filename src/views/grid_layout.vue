<template>
    <div>
        <!-- <div class="hello">
            <div id="chart1">jhkjgkufjy</div>
        </div> -->
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
        <div class="btns">
            <span class="sub-title">工具栏</span>
            <el-button type='primary' @click='clearLayout'>重置位置信息</el-button>
            <el-button type='primary' @click='setCookie'>保存面板信息</el-button>
            <el-button type='primary' @drag="drag" @dragend="dragend" class="droppable-element" draggable="true"
            unselectable="on">拖动到合适位置松开添加组件</el-button>
        </div>
        <div>
            <grid-layout ref="gridlayout" :layout.sync="layout"
                         :col-num="12"
                         :row-height="30"
                         :is-draggable="true"
                         :is-resizable="true"
                         :vertical-compact="true"
                         :use-css-transforms="true"
            >
                <grid-item :key="item.i" v-for="item in layout"
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
// import ElementUI from "element-ui"
// import echarts from '../components/echarts'
import {GridLayout, GridItem} from "vue-grid-layout";
import ultraman from "../assets/1.png"
let mouseXY = {"x": null, "y": null};
let DragPos = {"x": null, "y": null, "w": 1, "h": 1, "i": null};
export default {
    components: {
        GridLayout,
        GridItem,
        // echarts
    },
    data() {
        return {
            layout: [],
            orgOptions: {
            //     xAxis: {
            //     type: 'category',
            //     data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            // },
            // yAxis: {
            //     type: 'value'
            // },
            // series: [{
            //     data: [820, 932, 901, 934, 1290, 1330, 1320],
            //     type: 'line',
            //     smooth: true
            // }]
            },
            urls: [
                ultraman,
                'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
                'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
                'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
                'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
                'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
                'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
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
        // this.orgOptions = {
        //     xAxis: {
        //         type: 'category',
        //         data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        //     },
        //     yAxis: {
        //         type: 'value'
        //     },
        //     series: [{
        //         data: [820, 932, 901, 934, 1290, 1330, 1320],
        //         type: 'line',
        //         smooth: true
        //     }]
        // }
        // console.log("orgOptions mounted")
        // console.log(this.orgOptions)
    },
    whatch() {
      //pass
    },
    beforeDestroy() {
    },
    created() {
    },
    methods: {
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
            for(let i = 0; i < this.layout.length; i++) {
              // console.log("添加中")
              document.cookie = 'layout_'+ i + '_x=' + this.layout[i]['x'] + expires;
              document.cookie = 'layout_'+ i + '_y=' + this.layout[i]['y'] + expires;
              document.cookie = 'layout_'+ i + '_w=' + this.layout[i]['w'] + expires;
              document.cookie = 'layout_'+ i + '_h=' + this.layout[i]['h'] + expires;
              document.cookie = 'layout_'+ i + '=' + this.layout[i]['i'] + expires;
              // console.log("添加成功")
            }
          } else {
            console.log("layout is empty")
          }
        },
        checkCookie: function () {
          //检查cookie中是否有layout数据，如果有就读取，没有就自己初始化
          let cookie1 = document.cookie.split('; ');
          let ifHaveLayout = 0
          //cookie1.length-2>0,表示cookie中有layout的值，下面做读取cookie中layout的值
          if(cookie1.length-2 > 0){
            ifHaveLayout = 1
            for(let i=0; i<(cookie1.length-2)/5; i++) {
              let c0 = cookie1[i*5+2].trim();
              let c1 = cookie1[i*5+3].trim();
              let c2 = cookie1[i*5+4].trim();
              let c3 = cookie1[i*5+5].trim();
              this.layout.push({
                x: parseInt(c0.substring(c0.indexOf('=')+1,c0.indexOf('e'))),
                y: parseInt(c1.substring(c1.indexOf('=')+1,c1.indexOf('e'))),
                w: parseInt(c2.substring(c2.indexOf('=')+1,c2.indexOf('e'))),
                h: parseInt(c3.substring(c3.indexOf('=')+1,c3.indexOf('e'))),
                i: String(i),
              })
            }
          }
          if (!ifHaveLayout) {
            this.layout = [
                {"x": 0, "y": 0, "w": 4, "h": 9, "i": "0"},
                {"x": 4, "y": 0, "w": 4, "h": 9, "i": "1"},
                {"x": 2, "y": 9, "w": 3, "h": 7, "i": "2"},
                {"x": 8, "y": 8, "w": 3, "h": 6, "i": "3"},
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
          // to do 刷新页面
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

<style scoped>
.title {
    /*to do */
}
.sub-title {
    margin-right: 15px;
}
.droppable-element {
    /* width: 200px;
    text-align: center; */
    /* background: #fdd; */
    /* border: 1px solid black; */
    /* margin: 10px 0; */
    /* padding: 10px; */
}
.vue-grid-layout {
    background: #eee;
}
.vue-grid-item:not(.vue-grid-placeholder) {
    background: #ccc;
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