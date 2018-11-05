<template>

  <div class="page-sidebar">
    <div class="page-sidebar__section">
      <ul class="pure-menu-list">
        <li class="pure-menu-heading">Действия</li>
        <li 
        v-for="link in links" 
        :key="link.id"
        @click="handleSidebarLinkClick(link)"
        class="pure-menu-item">
          <div class="pure-menu-link page-sidebar__link">{{link.name}}</div>
        </li>
      </ul>
    </div>
  </div>

</template>
<script>
export default {
  name: 'PageSidebar',
  props: ['links'],

  methods: {
    handleSidebarLinkClick(link) {
      this.$emit('sidebarLinkClicked', link);
    }
  }
}
</script>
<style src="../assets/sass/components/PageSidebar.scss" lang="scss"/>
