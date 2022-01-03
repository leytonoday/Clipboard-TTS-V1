import Store from "electron-store"

const store = new Store()

const state = {
    apiKeyTTS: "",
    apiKeyVision: "", 
}

const mutations = {
    LOAD_API_KEY_TTS(state) {
        if (!store.get("apiKeyTTS"))
            store.set("apiKeyTTS", "")
        state.apiKeyTTS = store.get("apiKeyTTS")
    },
    SET_API_KEY_TTS(state, payload) {
        state.apiKeyTTS = payload
        store.set("apiKeyTTS", payload)
    },
    LOAD_API_KEY_VISION(state) {
        if (!store.get("apiKeyVision"))
            store.set("apiKeyVision", "")
        state.apiKeyVision = store.get("apiKeyVision")
    },
    SET_API_KEY_VISION(state, payload) {
        state.apiKeyVision = payload
        store.set("apiKeyVision", payload)
    },
}

const actions = {
    loadApiKeyTTS({commit}) {
        commit("LOAD_API_KEY_TTS")
    },
    setApiKeyTTS({commit}, key) {
        commit("SET_API_KEY_TTS", key)
    },
    loadApiKeyVision({commit}) {
        commit("LOAD_API_KEY_VISION")
    },
    setApiKeyVision({commit}, key) {
        commit("SET_API_KEY_VISION", key)
    }
}

const getters = {
    apiKeyTTS: state => state.apiKeyTTS,
    apiKeyVision: state => state.apiKeyVision
}

export default { state, mutations, actions, getters }