<template>
  <div class="page">
    <div class="page__header"></div>
    <div class="page__main">
      <div class="pure-g">
        <div class="pure-u-18-24">
          <div class="page__content">
            <page-info/>
          </div>
        </div>

        <div class="pure-u-6-24">
          <div class="page__sidebar">
            <page-sidebar :links="sidebarLinks" @sidebarLinkClicked="handleSidebarLinkClick($event)"/>
          </div>
        </div>

      </div>
    </div>

    <div class="page__footer"></div>
    <modal 
    :isShown.sync="isModalShown" v-if="isModalShown">
      <component 
      :is="modalComponentName" 
      @formDataSent="updateFormData($event)"/>
    </modal>
  </div>
</template>

<script>
import PageSidebar from './PageSidebar';
import PageInfo from './PageInfo';
import PageAddUser from './PageAddUser';
import PageAddTeam from './PageAddTeam';
import PageAddMeeting from './PageAddMeeting';

import Modal from './Modal';

export default {
  name: 'Page',
  components: {
    PageSidebar,
    PageInfo,
    PageAddUser,
    PageAddTeam,
    PageAddMeeting,

    Modal
  },

  data () {
    return {
      sidebarLinks: [       
        {id: 1, name: 'Создать пользователя', component: 'PageAddUser'}, 
        {id: 2, name: 'Создать группу', component: 'PageAddTeam'}, 
        {id: 3, name: 'Создать встречу', component: 'PageAddMeeting'}
      ],

      isModalShown: false,
      modalComponentName: null
    }
  },

  methods: {   
    init() {
      this.$store.commit('getLocalStorageData');
    },

    updateFormData({name, fields}) {
      this.$store.commit('pushData', {path: this.$store.state[name], value: fields});
      this.$store.commit('saveLocalStorageData', {key: name, value: this.$store.state[name]});  
    },

    handleSidebarLinkClick(link) {
      this.isModalShown = true;
      this.modalComponentName = link.component;
    }
  },

  beforeMount() {
    this.init();
  }

}
</script>
<style src="../assets/sass/components/Page.scss" lang="scss"/>
