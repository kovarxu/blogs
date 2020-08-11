import { createStore } from 'vuex';
import login from './modules/login';
import { get } from '../common/utils';

const gState = {
	isLogin: false
};

const gGetters = {};

const gMutations = {
	mutateLogin(state, result) {
		state.isLogin = !!result;
	}
};

const gActions = {
	checkIsLogin({ commit }) {
		get('/action/checkLoginStatus')
			.then(data => {
				commit('mutateLogin', data.data.isLogin);
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
