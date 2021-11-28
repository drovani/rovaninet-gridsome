<template>
    <Layout>
        <h1 class="text-4xl text-center mb-8">Hearthstones Mercenaries Helpers</h1>
        <div class="container grid grid-flow-row lg:grid-flow-col lg:gap-3">
            <section class="whitespace-nowrap lg:row-span-2">
                <h3 class="text-lg underline">Available Mercenaries</h3>
                <ul>
                    <li
                        v-for="(merc, name) in mercenaries"
                        :key="name"
                        :mercName="name"
                        @click="highlightMerc(name)"
                        :class="merc.role.toLowerCase()"
                        class="border-2 rounded-md pl-2 mb-1 cursor-pointer"
                    >
                        <span v-if="loadingCollection">
                            <app-icon :icon="['fas', 'sync']"></app-icon>
                        </span>
                        <span v-else>
                            <app-icon
                                v-if="collection[name] ? collection[name].collected : false"
                                :icon="['fas', 'check']"
                            ></app-icon>
                            <app-icon v-else :icon="['fas', 'plus']" @click="addToCollection(name)"></app-icon>
                        </span>
                        {{ name }}
                    </li>
                </ul>
            </section>
            <section v-if="highlightedMercName" class="object-fill">
                <MercenaryDetails
                    :mercName="highlightedMercName"
                    :mercenary="highlightedMerc"
                    :activeMerc="collection[highlightedMercName]"
                    @closeMercDetails="highlightMerc(null)"
                    @decrementAbilityActiveTier="decrementAbilityActiveTier"
                    @incrementAbilityActiveTier="incrementAbilityActiveTier"
                    @decrementItemActiveTier="decrementItemActiveTier"
                    @incrementItemActiveTier="incrementItemActiveTier"
                />
            </section>
            <section>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-1">
                    <MercenaryCard
                        v-for="(merc, name) in mercenaries"
                        :key="name"
                        :mercName="name"
                        :mercenary="merc"
                        :activeMerc="collection[name]"
                        @decrementAbilityActiveTier="decrementAbilityActiveTier"
                        @incrementAbilityActiveTier="incrementAbilityActiveTier"
                        @decrementItemActiveTier="decrementItemActiveTier"
                        @incrementItemActiveTier="incrementItemActiveTier"
                    />
                </div>
            </section>
        </div>
    </Layout>
</template>

<script>
import mercjson from "~/store/modules/mercenaries.json";
import colljson from "~/store/modules/collection.json";
import MercenaryCard from '~/components/MercenaryCard.vue';
import MercenaryDetails from '~/components/MercenaryDetails.vue';
import { mapState } from 'vuex';

export default {
    data: () => ({
        highlightedMercName: null,
        loadingCollection: false
    }),
    components: {
        MercenaryCard,
        MercenaryDetails
    },
    metaInfo() {
        return {
            title: "Hearthstone Mercenaries Helpers"
        }
    },
    computed: {
        highlightedMerc() {
            return this.mercenaries[this.highlightedMercName];
        },
        ...mapState({
            mercenaries: state => state.mercenaries,
            collection: state => state.collection
        })
    },
    methods: {
        highlightMerc(mercName) {
            this.highlightedMercName = mercName;
        },
        addToCollection(mercName) {
            this.$store.commit('addToCollection', {
                name: mercName,
                collected: true
            });
        },
        decrementAbilityActiveTier(mercenaryName, abilityName) {
            this.$store.commit('decrementAbility', { mercName: mercenaryName, abilityName: abilityName });
        },
        incrementAbilityActiveTier(mercenaryName, abilityName) {
            this.$store.commit('incrementAbility', { mercName: mercenaryName, abilityName: abilityName });
        },
        decrementItemActiveTier(mercenaryName, itemName) {
            this.$store.commit('decrementItem', { mercName: mercenaryName, itemName: itemName });
        },
        incrementItemActiveTier(mercenaryName, itemName) {
            this.$store.commit('incrementItem', { mercName: mercenaryName, itemName: itemName });
        }
    },
    async mounted() {
        this.loadingCollection = true;
        this.$store.commit('setMercenaries', mercjson.mercenaries);
        this.$store.commit('setCollection', colljson.mercenaries);
        this.loadingCollection = false;
    }
}
</script>
<style>
.protector {
    @apply border-red-400;
}
.fighter {
    @apply border-green-400;
}
.caster {
    @apply border-blue-400;
}
</style>