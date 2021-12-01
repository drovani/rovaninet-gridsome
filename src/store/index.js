import Vue from "vue";
import Vuex from "vuex";
import VuexPersistance from "vuex-persist";

Vue.use(Vuex);

const convertMercTiersToCollection = (obj, maxtiers) =>
  Object.keys(obj).reduce(
    (o, key) => ({ ...o, [key]: maxtiers - obj[key].tiers.length + 1 }),
    {}
  );

const ABILITY_MAX_TIER = 5;
const ITEM_MAX_TIER = 4;

export default new Vuex.Store({
  strict: true,
  state: {
    collection: {},
    mercenaries: {},
  },
  mutations: {
    setCollection(state, loadedCollection) {
      state.collection = loadedCollection;
    },
    setMercenaries(state, loadedMercenaries) {
      state.mercenaries = loadedMercenaries;
    },
    addToCollection(state, merc) {
      if (state.collection[merc.name]) {
        if (merc.collected !== undefined) {
          state.collection[merc.name].collected = merc.collected;
        }
      } else {
        const newmerc = {
          collected: merc.collected || false,
          level: 1,
          tasksCompleted: 0,
          itemEquipped: "",
          abilities: convertMercTiersToCollection(
            state.mercenaries[merc.name].abilities,
            5
          ),
          equipment: convertMercTiersToCollection(
            state.mercenaries[merc.name].equipment,
            4
          ),
        };
        state.collection = {
          ...state.collection,
          [merc.name]: newmerc,
        };
      }
    },
    decrementAbility(state, { mercName, abilityName }) {
      this.commit("addToCollection", { name: mercName });
      if (
        state.collection[mercName].abilities[abilityName] >
        ABILITY_MAX_TIER -
          state.mercenaries[mercName].abilities[abilityName].tiers.length +
          1
      ) {
        state.collection[mercName].abilities[abilityName]--;
      } else {
        return false;
      }
    },
    incrementAbility(state, { mercName, abilityName }) {
      this.commit("addToCollection", { name: mercName });
      if (
        state.collection[mercName].abilities[abilityName] < ABILITY_MAX_TIER
      ) {
        state.collection[mercName].abilities[abilityName]++;
      } else {
        return false;
      }
    },
    decrementItem(state, { mercName, itemName }) {
      this.commit("addToCollection", { name: mercName });
      if (
        state.collection[mercName].equipment[itemName] >
        ITEM_MAX_TIER -
          state.mercenaries[mercName].equipment[itemName].tiers.length +
          1
      ) {
        state.collection[mercName].equipment[itemName]--;
      } else {
        return false;
      }
    },
    incrementItem(state, { mercName, itemName }) {
      this.commit("addToCollection", { name: mercName });
      if (state.collection[mercName].equipment[itemName] < ITEM_MAX_TIER) {
        state.collection[mercName].equipment[itemName]++;
      } else {
        return false;
      }
    },
    toggleItemEquipped(state, { mercName, itemName }) {
      this.commit("addToCollection", { name: mercName });
      if (state.collection[mercName].itemEquipped == itemName) {
        state.collection[mercName].itemEquipped = null;
      } else {
        state.collection[mercName].itemEquipped = itemName;
      }
    },
  },
  actions: {
    importCollection({ commit }, { file }) {
      const reader = new FileReader();
      reader.onload = (e) =>
        commit("setCollection", JSON.parse(e.target.result));
      reader.readAsText(file);
    },
  },
  getters: {
    collected(state) {
      const asArray = Object.entries(state.collection);
      return Object.fromEntries(
        asArray.filter(([key, value]) => value.collected)
      );
    },
  },
  plugins: [
    new VuexPersistance({
      key: "hsmercs",
      storage: window.localStorage,
      reducer: (state) => ({ collection: state.collection }),
      filter: (mutation) => ["setMercenaries"].indexOf(mutation.type) === -1,
    }).plugin,
  ],
});
