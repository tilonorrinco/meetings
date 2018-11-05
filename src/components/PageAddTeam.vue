<template>
  <form 
  class="pure-form page-form" 
  @submit.prevent="sendFormData"
  @reset.prevent="resetFormFields">
    <fieldset>
      <legend>Создать команду</legend>
      <div class="pure-g page-form__field">
        <label for="name" class="pure-u-1-5">Имя команды</label>
        <input 
        v-model="formData.fields.name"
        type="text" 
        id="name"
        class="pure-u-4-5"
        required>
      </div>

      <div class="pure-g page-form__field">
        <label for="usersIds" class="pure-u-1-5">Участники</label>
        <select 
        id="usersIds"
        class="pure-u-4-5"
        v-model="formData.fields.usersIds"
        multiple
        required>
          <option 
          v-for="user in $store.state.users"
          :key="user.id"
          :value="user.id"
          class="page-form__option">{{`${user.surname} ${user.name}`}}</option>
        </select>
      </div>
    </fieldset>
    <button class="pure-button" type="reset">Очистить</button>
    <button class="pure-button" type="submit">Отправить</button>
  </form>
</template>
<script>
export default {
  name: 'PageAddTeam',
  components: {},
  data() {
    return {
      formData: {
        name: 'teams',
        fields: {
          id: this.getUniqueId(),
          name: '',
          usersIds: []
        }
      }
    }
  },

  methods: {
    sendFormData() {
      let data = JSON.parse(JSON.stringify(this.formData)); //deep copying
      this.$emit('formDataSent', data);
      this.resetFormFields();
    },

    resetFormFields() {
      let defaultFormFields = {
          id: this.getUniqueId(),
          name: '',
          usersIds: []
        }

      this.formData.fields = defaultFormFields;
    },

    getUniqueId() {
      return Math.random().toString(36).substring(7);
    }

  }
}
</script>
<style src="../assets/sass/components/PageForm.scss" lang="scss">
