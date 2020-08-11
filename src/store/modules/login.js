import { get, post } from '../../common/utils';

const state = {
    username: '',
    email: '',
    password: '',
}

const getters = {

}

const mutations = {
    changeValue(state, {key, value}) {
        if (state.hasOwnProperty(key)) {
            state[key] = value;
        }
    }
}

const actions = {
    login({ state, commit }, params) {
        return get('/action/login', params);
    },

    register({ state, commit }, data) {
        return post('/action/register', data);
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
