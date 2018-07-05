<template>
  <div id="app">
    <navbar class="navigation-bar-component">
      <div slot="branding">
        <label>Tayne's Place</label><img src="./assets/logo.png" />
      </div>
      <span class="menu-icon" slot="menu-icon"></span>
      <div slot="tools">
        <search :content="searchContent" :useslots="true" class="search-tool">
          <div class="search-result" v-for="(s, i) in searchResults" :key="'result'+i.toString()" :slot="'search-result-'+s.index.toString()">
            <router-link :to="{ name: 'section', params: {sectionid: 'item_'+s.index}}">
              <label>{{searchables[s.index].name}}</label>
              <span>{{searchables[s.index].description}}</span>
            </router-link>
          </div>
        </search>
      </div>
      <div class="dropdown-menu" slot="main-menu">
        <router-link :to="{name: 'home'}">Home</router-link>
        <dropdown v-for="(m, i) in mainMenu" :key="'main'+i" :items="m.items" :title="m.title" z="10">
          <span v-for="(item, j) in allItems(m.items)" :key="j" :slot="item.id">
            <router-link v-if="item.sub == undefined" :to="{name: 'section', params: { sectionid: item.id, title: item.text, content: item.content}}">
              {{item.text}}
            </router-link>
            <a v-else>
              {{item.text}}
            </a>
          </span>
          <span class="sub-menu-icon" slot="sub-menu-icon"></span>
        </dropdown>
      </div>
      <div class="dropdown-menu" slot="utility-menu">
        <dropdown v-for="(u, i) in utilityMenu" :key="'utility'+i" :items="u.items" :title="u.title" z="10">
          <span v-for="(item, j) in allItems(u.items)" :key="j" :slot="item.id">
            <router-link v-if="item.sub == undefined" :to="{name: 'section', params: { sectionid: item.id, title: item.text, content: item.content}}">
              {{item.text}}
            </router-link>
            <a v-else>
              {{item.text}}
            </a>
          </span>
          <span class="sub-menu-icon" slot="sub-menu-icon"></span>
        </dropdown>
      </div>
    </navbar>
    <div class="main-content"><router-view></router-view></div>
  </div>
</template>

<script>
import {EventBus} from './components/EventBus.js'
import {MenuData, ItemManifest} from './components/MenuLoader.js'
import NavBar from './components/NavBar.vue'
import DropdownMenu from './components/DropdownMenu.vue'
import SearchBar from './components/SearchBar.vue'
export default {
  name: 'app',
  components: {
    navbar: NavBar,
    dropdown: DropdownMenu,
    search: SearchBar
  },
  data () {
    return {
      mainMenu: [
        {
          title: 'Food',
          items: [
            MenuData.ENTRES,
            MenuData.APPATIZERS,
            MenuData.DESERTS
          ]
        },
        {
          title: 'Drinks',
          items: [
            MenuData.FOUNTAINDRINKS,
            MenuData.BEER
          ]
        }
      ],
      utilityMenu: [
        {
          title: 'Our Company',
          items: [
            MenuData.CONTACT,
            MenuData.ABOUT
          ]
        }
      ],
      searchables: [],
      searchResults: [],
      sectionDelimiter: ':'
    }
  },
  methods: {
    getContentBySection: function (s) {
      var self = this
      var content = []
      var sectionSplit = s.split(sectionDelimiter)
      switch (sectionSplit.length) {
        case 1:
        {
          content = MenuData[s].content
          break
        }
        case 2:
        {
          content = MenuData[sectionSplit[0]][sectionSplit[1]].content
          break
        }
      }
      return content
    },
    runLink: function (e) {
      // var self = this
      console.log(this.$route)
      this.$router.push({name: 'section', parms: {sectionid:e.target.getAttribute('l')}})
    },
    allItems: function (mData) {
      var items = []
      for (var i = 0; i < mData.length; i++) {
        items.push(mData[i])
        if (mData[i].sub !== undefined) {
          for (var s in mData[i].sub) {
            items.push(mData[i].sub[s])
          }
        }
      }
      console.log(items)
      return items
    },
    goBack () {
      var self = this
      window.history.length > 1
        ? self.$router.go(-1)
        : self.$router.push('/')
    }
  },
  computed:{
    searchContent: function () {
      var self = this
      var searchContent = []
      self.$data.searchables = ItemManifest
      for (var i = 0; i < self.$data.searchables.length; i++) {
        searchContent.push(self.$data.searchables[i].name + ". " + self.$data.searchables[i].description)
      }
      return searchContent
    }
  },
  mounted: function () {
    var self = this
    //console.log(JSON.stringify(self.$data.mainMenu))
    EventBus.$on('drop-down-menu-item-clicked', (n) => {
      console.log('menu change')
      console.log(self.$route.params)
      switch (n) {
        case MenuData.ENTRES.sub.HOT.id:
        {
          console.log('a-1')
          break;
        }
        case MenuData.ENTRES.sub.COLD.id:
        {
          console.log('a-2')
          break;
        }
        case MenuData.APPATIZERS.id:
        {
          console.log('b')
          break;
        }
        case MenuData.DESERTS.id:
        {
          console.log('c')
          break;
        }
        case MenuData.FOUNTAINDRINKS.id:
        {
          console.log('d')
          break;
        }
        case MenuData.BEER.id:
        {
          console.log('e')
          break;
        }
      }
    })
    EventBus.$on('on-search-term-entered', (n) => {
      self.$data.searchResults = n.matches
    })
    window.onhashchange = function (e) {
      console.log('hash change')
      console.log(self.$route.params)
      // console.log(self.$router.length)
    }
  }
}
</script>

<style lang="scss">
$menuFont: Arial;
$bodyFont: Arial;
$logoFont: Arial;
$itemColor: #dddddd;
$hoverColor: #cccccc;
$searchFont: Arial;
$searchTitleFontSize: 14px;
$searchFontSize: 12px;
html,body{
  margin:0;
  padding:0;
  background-color:#c69c6d;
}
#app{
  > div.navigation-bar-component{
    background-color: #eeeeee;
    padding:2px 2px 0 2px;
  }
}
div{
  div.branding {
    > div{
      > img{
        height: 40px;
        width: auto;
        float: left;
      }
      > label{
        display: inline-block;
        padding: 11px 0 6px 8px;
        font-family: $logoFont;
        font-weight: bold;
      }
    }
  }
}
div.dropdown-menu{
  > a {
    float:left;
    text-align: center;
    color: #666666;
    padding: 10px 0 !important;
    box-shadow: 0 -3px 0 rgba(0, 0, 0, 0.1) inset;
    min-width: 180px;
    font-weight: bold;
    text-decoration: none;
  }
  font-family: $menuFont;
  font-size: 14px;
  div{
    margin:0 4px;
    > a {
      font-weight: bold;
      padding: 18px 0;
      display: block;
      box-shadow:0 -1px 0 rgba(0,0,0,.1) inset;
    }
    > ul {
      min-width:100%;
      li {
        width:100%;
        display: block;
        > a {
          width:100%;
          height: 100%;
          background-color: $itemColor;
          padding: 18px 10px;
          display: block;
          box-shadow:0 -1px 0 rgba(0,0,0,.1) inset;
          > label{
            > span{
              > a{
                background-color:transparent;
                width: 100%;
                display: block;
                height: 26px;
                padding: 8px 4px;
              }
            }
          }
        }
      }
    }
  }
}
div.search-tool{
  width:99% !important;
  display:inline-block;
  > ul{
    overflow-y: auto;
    max-height: 220px;
  }
  input{
    width: 99%;
    padding: 6px 0;
    border-radius: 3px;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.6) inset;
    border: none;
    padding-left: 5px;
    font-size: 18px;
  }
  display:block;
  position: relative;

  z-index: 20;
  .search-result{
    padding:5px 3px;
    box-shadow: 0 -1px 0 rgba(0,0,0,.3) inset;
    font-family: $searchFont;
    background-color:rgba(255,255,255,.8);
    > a {
      > label{
        display: block;
        font-weight: bold;
        font-size: $searchTitleFontSize;
      }
      > span{
        display: block;
        font-size: $searchFontSize;
      }
    }
  }
}
span.menu-icon::before{
  content: "\2261";
  font-size: 50px;
  font-weight: bold;
  margin-left:10px;
}
span.sub-menu-icon{
  display: block;
  padding-top:10px;
  padding-right: 12px;
}
span.sub-menu-icon::before{
  content: "\2193";
  font-size: 20px;
  font-weight: bold;
}
div.main-content{
  font-family: $bodyFont;
  > div {
    > label {
      font-size:50px;
      font-weight: bold;
      padding: 8px;
      background-color: #8c6239;
      width: 100%;
      display: block;
      color:#c69c6d;
      font-style: italic;
    }
  }
  ul {
    margin-top:-10px;
    padding:12px;
    > li {
      > label {
        font-size: 32px;
        font-weight: bold;
      }
      > p {
        margin-top: 0px;
        font-size: 20px;
      }
    }
  }
}

@media screen and (min-width: 770px) {
  div.dropdown-menu{
    font-size: 12px;

    div{
      margin:0 4px;
      > a {
        text-align: center;
        color:#666666;
        padding: 10px 0;
        box-shadow:0 -3px 0 rgba(0,0,0,.1) inset;
        min-width:180px;
      }
      > ul {
        min-width:180px;
        li {
          > a {
            background-color: $itemColor;
            padding: 0px;

            > label{
              > span{
                > a{
                  height: 16px;
                  padding: 8px 4px;
                }
              }
            }
          }
          > a:hover {
            background-color: $hoverColor;
          }
        }
      }
    }
  }
  div.search-tool{
    > ul{
      max-height: 300px;
    }
    input{
      border: none;
      box-shadow:0 1px 0 rgba(0,0,0, 0.05), 0 -1px 0 rgba(255,255,255, 0.8) inset, -18px 0 30px #ffffff inset;
      background-color: transparent;
      border-radius: 0;
      padding:6px 6px;
      font-size:14px;
      margin-left: -12px;
    }
    width:250px !important;
  }
  span.sub-menu-icon{
    display: block;
    padding-top:0px;
    padding-right: 0px;
  }
  span.sub-menu-icon::before{
    content: "\2193";
    font-size: 16px;
    font-weight: bold;
  }
}
</style>
