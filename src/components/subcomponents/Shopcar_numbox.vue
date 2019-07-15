<template>

<div class="mui-numbox">
	<button type="button" class="mui-btn mui-btn-numbox-minus" @click="reduceNumBox()">-</button>
    <input id="test" type="number" :value="nums" class="mui-input-numbox" @change="changeNumbox()" ref="numbox">
    <button  type="button" class="mui-btn mui-btn-numbox-plus" @click="increaseNumBox()">+</button>
    <input type="hidden" :value="maxNum" ref="maxNumBox"/>
</div>

</template>

<script>
// 引入组件
import { Toast } from 'mint-ui';


export default {
    data(){
        return {
            nums: 1,// 购买数量
        }
    },
    created(){
        this.nums = this.numbers;
    },
    methods: {
        reduceNumBox(){// 减数量
            /* 
                1、判断数量是否为0
                    为0，不能再减了
                    不为0，减1
            */
            if(this.nums == 0){
                Toast({
                    message: '数量已经为0！！',
                    duration: 2000
                });
            }else{
                this.nums--;
                // 同步到vuex
                this.$store.commit("updatedProductAccount", {
                    id: this.productId,
                    account: this.nums
                });
            }
        },
        increaseNumBox(){// 加数量
            /* 
                1、判断数量是否大于等于maxNum
                    大于等于maxNum：不能再加
                    否则，可以再加
            */ 
           if(this.nums >= this.$refs.maxNumBox.value){
                Toast({
                    message: '已经是最大库存了！！！',
                    duration: 2000
                });
           }else {
               this.nums++;
                // 同步到vuex
                this.$store.commit("updatedProductAccount", {
                    id: this.productId,
                    account: this.nums
                });
           }
        },
        changeNumbox(){// 修改数量
            // 得到修改后的值
            var newValue = this.$refs.numbox.value;
            // 修改
            this.nums = newValue;
            // 同步到 vuex 中 car中
            this.$store.commit("updatedProductAccount", {
                id: this.productId,
                account: newValue
            });
        }
    },
    props: {
        maxNum:Number,  // 商品最大购买量
        numbers:Number,  // 商品购买量
        productId:String // 商品的id
    }
}
</script>

<style lang="scss" scoped>
.mui-numbox{
    width: 100px;
    height: 25px;
}
</style>

