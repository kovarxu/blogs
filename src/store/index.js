import { createStore } from 'vuex';
import login from './modules/login';
import { get } from '../common/utils';

const gState = {
	isLogin: false,
	isMaster: false
};

const gGetters = {};

const gMutations = {
	mutateLogin(state, result) {
		state.isLogin = !!result;
	},
	mutateMaster(state, master) {
		state.isMaster = master === 'kovarxu';
	}
};

const gActions = {
	checkIsLogin({ commit }) {
		get('/action/checkLoginStatus')
			.then(data => {
				commit('mutateLogin', data.data.isLogin);
				commit('mutateMaster', data.data.user);
			})
	},

	logout({ commit }) {
		get('/action/logout');
		commit('mutateLogin', 0);
	}
};

export default createStore({
	strict: true,
	state: gState,
	getters: gGetters,
	mutations: gMutations,
	actions: gActions,
	modules: {
		login
	}
})
