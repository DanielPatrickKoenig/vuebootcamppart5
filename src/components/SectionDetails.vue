<template>
  <div>
    <label>{{ currentProperties.text }}</label>
    <ul>
      <li v-for="(c, i) in currentProperties.content" :key="i">
        <label>{{c.name}}</label>
        <p>{{c.description}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import {MenuData, ItemManifest} from './MenuLoader.js'
export default {
  computed: {
    currentProperties: function () {
      var self = this
      var id = self.$route.params.sectionid
      console.log(id)
      var properties = {}
      var propertiesSet = false
      for (var m in MenuData) {
        if (MenuData[m].id === id && MenuData[m].content !== undefined) {
          properties = {text: MenuData[m].text, content: MenuData[m].content}
          propertiesSet = true
        }
        else if (MenuData[m].sub !== undefined) {
          for (var s in MenuData[m].sub) {
            if (MenuData[m].sub[s].id === id && MenuData[m].sub[s].content !== undefined) {
              properties = {text: MenuData[m].sub[s].text, content: MenuData[m].sub[s].content}
              propertiesSet = true
            }
          }
        }
      }
      if (!propertiesSet) {
        if (id.split('item_').length > 1) {
          var itemIndex = Number(id.split('item_')[1])
          properties = {text: 'Search Results', content: [ItemManifest[itemIndex]]}
        } else {
          properties = MenuData.NOTFOUND
        }
      }
      return properties
    }
  }
}
</script>

<style lang="scss" scoped>
ul {
  > li {
    display: block;

  }
}
</style>
