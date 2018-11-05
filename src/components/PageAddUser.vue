<template>
  <form 
  class="pure-form page-form" 
  @submit.prevent="sendFormData"
  @reset.prevent="resetFormFields">
    <fieldset>
      <legend>Создать пользователя</legend>
      <div class="pure-g page-form__field">
        <label for="name" class="pure-u-1-5">Имя</label>
        <input 
        type="text" 
        id="name"
        class="pure-u-4-5"
        v-model="formData.fields.name"
        required>
      </div>

      <div class="pure-g page-form__field">
        <label for="surname" class="pure-u-1-5">Фамилия</label>
        <input 
        type="text" 
        id="surname"
        class="pure-u-4-5"
        v-model="formData.fields.surname"
        required>
      </div>
    </fieldset>

    <button class="pure-button" type="reset">Очистить</button>
    <button class="pure-button" type="submit">Отправить</button>

  </form>
</template>
<script>
export default {
  name: 'PageAddUser',
  components: {},
  data() {
    return {
      formData: {
        name: 'users',
        fields: {
          id: this.getUniqueId(),
          name: '',
          surname: ''
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
          surname: ''
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
