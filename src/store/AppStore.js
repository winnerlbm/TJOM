/**
 * @desc: 全局存储器
 * @author: LBM
 * @date: 2019-12-25 16:41:26
 */
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

const appModule = {
    //the data attribute of all components
    state: {
        chartFontSize: 15,
    },
    //the getters as computed attribute for all components
    getters: {
        otherParams: () => [{name: 'home', title: 'index'}]
    },
    mutations: {
        setChartFontSize(state, chartFontSize) {
            state.chartFontSize = chartFontSize
        }
    },
    plugins: [createPersistedState()]
};

export default new Vuex.Store({
    modules: {
        appModule: appModule
    }
});

