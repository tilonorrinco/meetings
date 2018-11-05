import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    users: [],
    teams: [],
    meetings: []
  },

  getters: {
    getUserById(state) {
      return id => state.users.find(u => u.id === id);
    },

    getTeamById(state) {
      return id => state.teams.find(t => t.id === id);
    },

    getMeetingById(state) {
      return id => state.meetings.find(m => m.id === id);
    },
  },

  mutations: {
    pushData(state, {path, value}) {
      if(Array.isArray(path)) path.push(value);
    },

    getLocalStorageData(state) {
      let users = localStorage.getItem('users'),
          teams = localStorage.getItem('teams'),
          meetings = localStorage.getItem('meetings');

      state.users = users ? JSON.parse(users) : [];
      state.teams = teams ? JSON.parse(teams) : [];
      state.meetings = meetings ? JSON.parse(meetings) : [];
    },

    saveLocalStorageData(state, {key, value}) {
      let json = JSON.stringify(value);
      localStorage.setItem(key, json); 
    }
  }
});

export default store;