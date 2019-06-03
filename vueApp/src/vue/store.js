import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        lang: 'en'
    },

    actions: {
        setLang: (store, lang) => {
            return new Promise((resolve, reject) => {

                setTimeout(() => {
                    store.commit('setLang', lang);
                    resolve(lang);
                }, 2000);
            });
        }
    },

    mutations: {
        setLang: (state, lang) => {
            state.lang = lang;
            console.log(`commited setLang to ${lang}`);
        }
    },

    getters: {
        lang: state => state.lang
    }
});