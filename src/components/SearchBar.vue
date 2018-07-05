<template>
  <div class="search-bar-container-element">
    <input type="text" v-model="searchTerm" v-on:keyup="onSearchEntered" placeholder="search" />
    <ul>
      <li v-for="(m, i) in matches" :key="'match'+i.toString()">
        <slot v-if="useslots" :name="'search-result-'+m.index.toString()"></slot>
        <a v-else v-on:click="searchLinkClicked" :index="i">{{m.content}}</a>
      </li>
    </ul>
  </div>
</template>
<script>
import {EventBus} from './EventBus.js'
export default {
  data () {
    return {
      searchTerm: '',
      matches: []
    }
  },
  props: ['content', 'useslots'],
  methods: {
    onSearchEntered: function (e) {
      var self = this
      self.$data.matches = []
      for (var i = 0; i < self.content.length; i++) {
        if (self.$data.searchTerm !== undefined && self.$data.searchTerm !== '' && self.content[i].toLowerCase().split(self.$data.searchTerm.toLowerCase()).length > 1) {
          self.$data.matches.push({index: i, content: self.content[i]})
        }
      }
      EventBus.$emit('on-search-term-entered', {term: self.$data.searchTerm, matches: self.$data.matches})
    },
    searchLinkClicked: function (e) {
      var self = this
      EventBus.$emit('on-search-term-clicked', self.content[Number(e.currentTarget.getAttribute('index'))])
    }
  }
}
</script>
<style lang="scss" scoped>
div.search-bar-container-element{
  position: static;
  ul{
    position: absolute;
    width:99%;
    margin:0;
    padding:0;
    > li{
      display: block;
    }
  }
}
@media screen and (min-width: 770px) {
  div.search-bar-container-element{
    width: 100%;
    position: relative;
    input{
      width:100%;
    }
  }
}

</style>


