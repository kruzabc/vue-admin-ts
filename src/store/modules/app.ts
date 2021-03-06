const app = {
    state: {
        token: '',
        moduleId: '01' // 模块id
    },
    mutations: {
        SET_TOKEN: (state: any, token: string) => {
            state.token = token;
        },
        SET_MODULE_ID: (state: any, moduleId: string) => {
            state.moduleId = moduleId;
        }
    },
    actions: {
        SetToken({ commit }: any, data: any) {
            commit('SET_TOKEN', data.token);
        }
    }
};

export default app;
