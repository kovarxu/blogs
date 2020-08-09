import { createStore } from 'vuex';
import globalState from './state';
import globalGetters from './getters';
import globalActions from './actions';
import globalMutations from './mutations';

export default createStore({
	strict: true,
	state: globalState,
	getters: globalGetters,
	actions: globalActions,
	mutations: globalMutations,
	modules: {
		
	}
})
