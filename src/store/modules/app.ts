const app = {
    state: {
        token: ''
    },
    mutations: {
        SET_TOKEN: (state: any, token: string) => {
            state.token = token;
        }
    },
    actions: {
        SetToken({ commit }: any, data: any) {
            commit('SET_TOKEN', data.token);
        }
    }
};

export default app;
