<template>
  <div>
    <div class="drop-down-menu-closer-div" v-on:mouseover="closerHover" :style="'position:fixed;left:0;top:0;right:0;bottom:0;z-index:'+z.toString()" v-if="show"></div>
    <a class="drop-down-menu-anchor" :style="'z-index:'+(Number(z)+(1*zFactor)).toString()" v-on:click="headerClicked">{{title}}</a>
    <ul class="drop-down-menu-list-element" :style="getMenuStyle(show)+'z-index:'+(Number(z)+(2*zFactor)).toString()">
      <li v-for="(item, i) in items" :key="i">

        <a class="dropdown-item" v-on:click="itemClicked" :clickid="item.id" :hassubmenu="item.sub != undefined ? '1' : '0'">
          <label><slot :name="item.id">{{item.text}}</slot></label>
          <slot name="sub-menu-icon" v-if="item.sub"></slot>
        </a>
        <ul v-if="item.sub != undefined" :style="getMenuStyle(submenuStates[item.id])">
          <li v-for="(s, k, j) in item.sub" :key="i.toString()+'.'+j.toString()">
            <a class="dropdown-item" v-on:click="itemClicked" :clickid="s.id">
              <label><slot :name="s.id">{{s.text}}</slot></label>
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
import {EventBus} from './EventBus.js'
export default {
  props: ['title', 'items', 'z'],
  data () {
    return {
      show: false,
      submenuStates: {},
      menuStateStyles: {
        shown: 'overflow-1:hidden;height:auto;',
        hidden: 'overflow-y:hidden;height:0px;'
      }
    }
  },
  computed: {
    zFactor: function () {
      var self = this
      return self.$data.show ? 1 : -1
    }
  },
  methods: {
    itemClicked: function (e) {
      var self = this
      var hasSubMenu = Number(e.currentTarget.getAttribute('hassubmenu')) === 1
      if (hasSubMenu) {
        self.$data.submenuStates[e.currentTarget.getAttribute('clickid')] = !self.$data.submenuStates[e.currentTarget.getAttribute('clickid')]
        console.log(self.$data.submenuStates)
        self.$data.show = false
        self.$data.show = true
      } else {
        EventBus.$emit('drop-down-menu-item-clicked', e.currentTarget.getAttribute('clickid'))
        self.$data.show = false
        // self.$router.push({name: 'section', path: '/section/' + e.currentTarget.getAttribute('clickid')})
        // self.unHovered(e)
      }
    },
    headerClicked: function (e) {
      var self = this
      self.$data.show = !self.$data.show
    },
    closerHover: function (e) {
      var self = this
      for (var s in self.$data.submenuStates) {
        self.$data.submenuStates[s] = false
      }
      self.$data.show = false
    },
    getMenuStyle: function (show) {
      var self = this
      return show ? self.$data.menuStateStyles.shown : self.$data.menuStateStyles.hidden
    }
  },
  mounted: function () {
    var self = this
    for (var i = 0; i < self.items.length; i++) {
      if (self.items[i].sub != undefined) {
        self.$data.submenuStates[self.items[i].id] = false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
div{
  > div.drop-down-menu-closer-div{
    display:none;
  }
  > a.drop-down-menu-anchor{
    position: static;
  }
  > ul.drop-down-menu-list-element {
    position: static;
    padding:0;
    margin:0;
    overflow-x:hidden;
    li {
      display: block;
      > a.dropdown-item {
        position: relative;
        > span {
          display: block;
          position: absolute;
          right: 24px;
          top: 0;
        }
      }
    }
    > li {
      > ul {
        padding:0;
        margin:0 0 0 5px;
      }
    }
  }
}
@media screen and (min-width: 770px) {

  div{
    a.dropdown-item {
      cursor: pointer;
      display: block;
    }
    float: left;
    > div.drop-down-menu-closer-div{
      display:inline-block;
    }
    > a.drop-down-menu-anchor{
      position: relative;
    }
    > ul.drop-down-menu-list-element{
      position: absolute;
    }
  }
}
</style>

