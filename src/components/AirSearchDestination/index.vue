<template>
  <div class="air_search_main_r">
    <ul>
      <li v-for="selectAirDestination in getAirDestination" :class="{active:selectAirDestination.isOpen}">
        <span @click="open($index)">{{selectAirDestination.destName}}</span>
        <i class="fa fa-sort-down"></i>
        <ul class="destin_list">
          <li v-for="item in selectAirDestination.destItems">
            <label>
              <input type="checkbox" :value="item" v-model="ckeckedItems" @change="ckeckedItem()">
              <span>{{item}}</span>
            </label>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
 import { airDestination } from '../../vuex/actions'
 import { getAirDestination } from '../../vuex/getters'
  export default {
   // props: {
   //   selectAirDestinationsList: {
   //     type: Object
   //   }
   // },
   vuex: {
     actions: {
       airDestination
     },
     getters: {
       getAirDestination
     }
   },
    data: function () {
      return {
        ckeckedItems:[],
        
      }
    },
    created: function() {
      this.$dispatch('select-air-destinations');
    },
    methods: {
      open: function (index) {
        this.getAirDestination[index].isOpen = !this.getAirDestination[index].isOpen
      },
      ckeckedItem: function () {
        console.log(this.ckeckedItems)
      }
    }
  }
</script>
<style>
  .air_search_main_r {
    float: right;
    width: 112px;
    padding: 12px 55px;
    margin-top: 52px;
    background: #fff;
    color: #333;
    font-size: 12px;
    line-height: 14px;
  }

  .air_search_main_r ul li {
    cursor: pointer;
    position: relative;
    line-height: 20px;
  }

  .air_search_main_r ul li i {
    position: absolute;
    top: -2px;
    margin-left: 10px;
    font-size: 18px;
    vertical-align: 0px;
    /*transition: all 0.2s ease;*/
  }

  li.active i {
    transform: rotateX(180deg);
    top: 6px !important;
  }

  .active .destin_list {
    display: block;
  }

  .destin_list {
    display: none;
    margin-top: 4px;
    margin-bottom: 4px;
  }

  .destin_list li {
    line-height: 18px;
  }

  .destin_list li input {
    margin-right: 4px;
    vertical-align: -2px;
  }
</style>
