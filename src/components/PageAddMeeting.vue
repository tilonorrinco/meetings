<template>
  <form 
  class="pure-form page-form" 
  @submit.prevent="sendFormData"
  @reset.prevent="resetFormFields">
    <fieldset>
      <legend>Создать встречу</legend>
      <div class="pure-g page-form__field">
        <label for="name" class="pure-u-1-5">Тема встречи</label>
        <input 
        v-model="formData.fields.name"
        type="text" 
        id="name"
        class="pure-u-4-5"
        required>
      </div>

      <div class="pure-g page-form__field">
        <label for="teamId" class="pure-u-1-5">Команда-участник</label>
        <select 
        v-model="formData.fields.teamId"
        id="teamId"
        class="pure-u-4-5">
          <option 
          v-for="team in $store.state.teams"
          :key="team.id"
          :value="team.id">{{team.name}}</option>
        </select>
      </div>

      <div class="pure-g page-form__field">
        <label for="usersIds" class="pure-u-1-5">Приглашенные пользователи команды</label>
        <select 
        id="usersIds"
        class="pure-u-4-5"
        v-model="formData.fields.usersIds" 
        multiple>
          <option 
          v-for="user in getIdleTeamUsersList"
          :key="user.id"
          :value="user.id">
            {{`${user.surname} ${user.name}`}}
          </option>
        </select>
      </div>

      <div class="pure-g page-form__field">
        <label for="dateStart" class="pure-u-1-5">Дата начала встречи</label>
        <input 
        id="dateStart"
        class="pure-u-4-5"
        type="date"
        v-model="formData.fields.dateStart"
        :min="minDate"
        required>
      </div>

      <div class="pure-g page-form__field">
        <label for="dateEnd" class="pure-u-1-5">Дата окончания встречи</label>
        <input 
        id="dateEnd"
        class="pure-u-4-5"
        type="date"
        v-model="formData.fields.dateEnd"
        :min="formData.fields.dateStart"
        required>
      </div>

      <div class="pure-g page-form__field">
        <label for="secretaryId" class="pure-u-1-5">Секретарь</label>
        <select 
        id="secretaryId"
        class="pure-u-4-5"
        v-model="formData.fields.secretaryId"
        :class="this.formData.fields.usersIds.length < 2 ? 'page-form__select_disabled' : ''"
        required>
          <option 
          v-for="user in getMeetingParticipantsList"
          :key="user.id"
          :value="user.id"
          :disabled="formData.fields.facilitatorId === user.id">
            {{`${user.surname} ${user.name}`}}
          </option>
        </select>
      </div>

      <div class="pure-g page-form__field">
        <label for="facilitatorId" class="pure-u-1-5">Фасилитатор</label>
        <select 
        id="facilitatorId"
        class="pure-u-4-5"
        v-model="formData.fields.facilitatorId"
        :class="this.formData.fields.usersIds.length < 2 ? 'page-form__select_disabled' : ''"
        required>
          <option 
          v-for="user in getMeetingParticipantsList"
          :key="user.id"
          :value="user.id"
          :disabled="formData.fields.secretaryId === user.id">
            {{`${user.surname} ${user.name}`}}
          </option>
        </select>
      </div>
    </fieldset>
    <button class="pure-button" type="reset">Очистить</button>
    <button class="pure-button" type="submit">Отправить</button>
  </form>
</template>
<script>
import Moment from 'moment';
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment);

export default {
  name: 'PageAddMeeting',
  components: {},
  data() {
    return {
      formData: {
        name: 'meetings',
        fields: {
          id: this.getUniqueId(),
          name: '',
          teamId: '',
          usersIds: [],
          dateStart: moment().format('YYYY-MM-DD'),
          dateEnd: moment().format('YYYY-MM-DD'),
          secretaryId: '',
          facilitatorId: ''
        }
      },
    }
  },

  computed: {
    minDate() {
      return moment().format('YYYY-MM-DD');
    },

    getTeamUsersList() {
      let result = [],
          teamId = this.formData.fields.teamId,
          team = this.$store.state.teams.find(t => t.id === teamId);

      if(team) {
        let usersIds = team.usersIds;
        result = this.$store.state.users.filter(u => usersIds.includes(u.id));
      }

      return result;
    },

    getIdleTeamUsersList() {       
      let teamUsers = this.getTeamUsersList,
          meetings = this.$store.state.meetings,
          fields = this.formData.fields;

      return teamUsers.filter(u => {
        let userMeetings = meetings.filter(m => m.usersIds.includes(u.id)),
            userMeetingsDates = userMeetings.map(m => moment.range(m.dateStart, m.dateEnd)),
            currentDate = moment.range(fields.dateStart, fields.dateEnd);

        let isDatesOverlap = userMeetings && userMeetingsDates.some(range => 
          range.overlaps(currentDate, {adjacent: true}));
        
        return !isDatesOverlap;
      });
    },

    getMeetingParticipantsList() {
      let usersIds = this.formData.fields.usersIds;
      return this.$store.state.users.filter(u => usersIds.includes(u.id));
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
          teamId: '',
          usersIds: [],
          dateStart: moment().format('YYYY-MM-DD'),
          dateEnd: moment().format('YYYY-MM-DD'),
          secretaryId: '',
          facilitatorId: ''
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
