<template>
  <div>
    <div>
      <div class="branding"><slot name="branding"></slot></div>
      <div class="tools"><slot name="tools"></slot></div>
    </div>
    <label class="menu-toggle-checkbox-label" :for="menuId"><slot name="menu-icon"></slot>&nbsp;</label><input class="menu-toggle-checkbox" type="checkbox" :id="menuId" />
    <div style="width:100%;">
      <div class="main-menu"><slot name="main-menu"></slot></div>
      <div class="utility-menu"><slot name="utility-menu"></slot></div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      menuId: 'menuid_' + Math.random().toString().split('.').join('') + Math.random().toString().split('.').join('') + Math.random().toString().split('.').join('')
    }
  }
}
</script>

<style lang="scss" scoped>
input.menu-toggle-checkbox{
  display: none;
  + div{
    display: none;
  }
}
input.menu-toggle-checkbox:checked + div{
  display: block;
}
label.menu-toggle-checkbox-label{
  display: block;
  width:100%;
}
@media screen and (min-width: 770px) {
  label.menu-toggle-checkbox-label{
    display: none;
  }
  input.menu-toggle-checkbox,
  input.menu-toggle-checkbox:checked{
    + div{
      display: inline-block;
    }
  }

  div.branding,
  div.tools{
    display: inline-block;
  }
  div.main-menu{
    clear: both;
  }
  div.main-menu,
  div.utility-menu{
    margin: 0 4px;
    a {
      padding: 8px 4px;
    }
    float: left;
  }
  div.utility-menu,
  div.tools{
    float: right;
  }
}
</style>


