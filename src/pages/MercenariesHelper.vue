<template>
    <Layout>
        <h1 class="text-4xl text-center mb-8">Hearthstones Mercenaries Helpers</h1>
        <div class="container grid grid-flow-row md:grid-flow-col md:gap-3">
            <section class="whitespace-nowrap md:row-span-2">
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
                        {{ name }}
                        <span v-if="collection[name]" class="float-right">✔</span>
                    </li>
                </ul>
            </section>
            <section v-if="highlightedMercName" class="object-fill">
                <MercenaryDetails
                    :mercName="highlightedMercName"
                    :mercenary="highlightedMerc"
                    :collected="collection[highlightedMercName]"
                    @closeMercDetails="highlightMerc(null)"
                    @decrementAbilityActiveTier="decrementAbilityActiveTier"
                    @incrementAbilityActiveTier="incrementAbilityActiveTier"
                    @decrementItemActiveTier="decrementItemActiveTier"
                    @incrementItemActiveTier="incrementItemActiveTier"
                />
            </section>
            <section>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-1">
                    <MercenaryCard
                        v-for="(merc, name) in mercenaries"
                        :key="name"
                        :mercName="name"
                        :mercenary="merc"
                        :collected="collection[name]"
                        @decrementAbilityActiveTier="decrementAbilityActiveTier"
                        @incrementAbilityActiveTier="incrementAbilityActiveTier"
                    />
                </div>
            </section>
        </div>
    </Layout>
</template>

<script>
import mercjson from "~/store/mercenaries.json";
import colljson from "~/store/collection.json";
import MercenaryCard from '~/components/MercenaryCard.vue';
import MercenaryDetails from '~/components/MercenaryDetails.vue';
const ABILITY_MAX_TIER = 5;
const ITEM_MAX_TIER = 4;

export default {
    data: function () {
        return {
            mercenaries: mercjson.mercenaries,
            collection: colljson.mercenaries,
            highlightedMercName: null
        }
    },
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
        }
    },
    methods: {
        highlightMerc: function (mercName) {
            this.highlightedMercName = mercName;
        },
        decrementAbilityActiveTier: function (mercenaryName, abilityName) {
            if (this.collection[mercenaryName].abilities[abilityName] > ABILITY_MAX_TIER - this.mercenaries[mercenaryName].abilities[abilityName].tiers.length + 1) {
                this.collection[mercenaryName].abilities[abilityName]--;
            } else {
                return false;
            }
        },
        incrementAbilityActiveTier: function (mercenaryName, abilityName) {
            if (this.collection[mercenaryName].abilities[abilityName] < ABILITY_MAX_TIER) {
                this.collection[mercenaryName].abilities[abilityName]++;
            } else {
                return false;
            }
        },
        decrementItemActiveTier: function (mercenaryName, itemName) {
            if (this.collection[mercenaryName].equipment[itemName] > ITEM_MAX_TIER - this.mercenaries[mercenaryName].equipment[itemName].tiers.length + 1) {
                this.collection[mercenaryName].equipment[itemName]--;
            } else {
                return false;
            }
        },
        incrementItemActiveTier: function (mercenaryName, itemName) {
            if (this.collection[mercenaryName].equipment[itemName] < ITEM_MAX_TIER) {
                this.collection[mercenaryName].equipment[itemName]++;
            } else {
                return false;
            }
        }
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