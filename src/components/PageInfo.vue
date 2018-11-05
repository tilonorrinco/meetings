<template>
  <div class="page-info">
    <h2 class="page-info__title">Встречи</h2>

    <table class="pure-table pure-table-horizontal pure-table-striped page-info__table">
      <thead>
        <tr>
          <th>Имя</th>
          <th>Участники</th>
          <th>Даты проведения</th>
          <th>Команда</th>
          <th>Статус</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="meeting in $store.state.meetings" :key="meeting.id">
          <td>{{meeting.name}}</td>
          <td>
            <ul>
              <li v-for="user in getMeetingUsers(meeting)" :key="user.id">
                {{`${user.surname} ${user.name}`}}
              </li>
            </ul>
          </td>
          <td>{{getMeetingDates(meeting)}}</td>
          <td>{{getMeetingTeamName(meeting)}}</td>
          <td>{{getMeetingStatus(meeting)}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import Moment from 'moment';
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment);

export default {
  name: 'PageInfo',
  components: {},
  methods: {
    getMeetingUsers({usersIds}) {
      return this.$store.state.users.filter(u => usersIds.includes(u.id));
    },

    getMeetingDates({dateStart, dateEnd}) {
      let f = 'DD.MM.YYYY';
      return `${moment(dateStart).format(f)} — ${moment(dateEnd).format(f)}`;
    },

    getMeetingTeamName({teamId}){
      return this.$store.state.teams.find(t => t.id == teamId).name
    },

    getMeetingStatus({dateStart, dateEnd}) {
      let range = moment.range(dateStart, dateEnd),
          currentDate = moment(new Date()).startOf('day'),
          status = '',
          isCurrentDateWithin = range.contains(currentDate),
          isCurrentDateAfter = range.end.isBefore(currentDate),
          isCurrentDateBefore = range.start.isAfter(currentDate);

      if(isCurrentDateWithin) status = 'проходит';
      else if(isCurrentDateBefore) status = 'запланирована';
      else if(isCurrentDateAfter) status = 'завершена';   

      return status;
    }
  }
}
</script>
<style src="../assets/sass/components/PageInfo.scss" lang="scss"/>
