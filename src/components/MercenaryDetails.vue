<template>
    <section
        :class="mercenary.role.toLowerCase()"
        class="p-2 border-2 rounded-md relative inline-block"
    >
        <button
            class="absolute top-1 right-1 w-6 hidden sm:inline"
            @click="$emit('closeMercDetails')"
        >
            <app-icon :icon="['fas', 'times-circle']"></app-icon>
        </button>
        <div class="grid grid-cols-1 sm:grid-cols-4 sm:space-x-2 space-y-4">
            <div class="sm:row-span-6 text-xl">
                <header class="text-center bg-gray-900 text-white rounded-md flex px-1">
                    <span v-if="activeMerc.collected">
                        <app-icon :icon="['fas', 'check']"></app-icon>
                    </span>
                    <h2 class="flex-grow">{{ mercName }}</h2>
                    <button class="float-right sm:hidden" @click="$emit('closeMercDetails')">
                        <app-icon :icon="['fas', 'times-circle']"></app-icon>
                    </button>
                </header>
                <div class="flex px-1 items-center">
                    <div
                        class="
                            attack-value
                            bg-center bg-contain
                            w-12
                            h-12
                            text-center
                            pt-3
                            font-semibold
                            text-white
                            bg-no-repeat
                        "
                    >
                        {{ mercenaryAttack }}
                    </div>
                    <div class="flex-grow text-center">{{ mercenary.race }}</div>
                    <div
                        class="
                            health-value
                            bg-center bg-contain
                            w-12
                            h-12
                            text-center
                            pt-3
                            font-semibold
                            text-white
                            bg-no-repeat
                        "
                    >
                        {{ mercenaryHealth }}
                    </div>
                </div>
                <div class="text-center mb-4">
                    {{ abilitiesMaxCost + equipmentMaxCost }}
                    <img src="/images/mercs/mercenary-coin.png" class="h-6 inline" />
                </div>
                <div class="text-base rounded bg-gray-50">
                    <div class="flex">
                        <div
                            class="flex-1"
                            v-if="activeMerc.tasksCompleted < mercenary.tasks.length"
                        >
                            Next Task: Task {{ activeMerc.tasksCompleted + 1 }}
                        </div>
                        <div class="flex-1" v-else>Tasks Complete!</div>
                        <UpDownButtons
                            :showDecrement="activeMerc.tasksCompleted > 0"
                            :showIncrement="activeMerc.tasksCompleted < mercenary.tasks.length"
                            :upIcon="'check-circle'"
                            :downIcon="'undo'"
                            class="text-sm"
                            @decrement="$emit('decrementTasksCompleted', mercName)"
                            @increment="$emit('incrementTasksCompleted', mercName)"
                        />
                    </div>
                    <template v-if="activeMerc.tasksCompleted < mercenary.tasks.length">
                        <transition name="fade">
                            <p class="font-semibold">
                                {{ mercenary.tasks[activeMerc.tasksCompleted].name }}
                            </p>
                            <p>{{ mercenary.tasks[activeMerc.tasksCompleted].description }}</p>
                            <p>Rewards:</p>
                            <ul class="list-disc list-inside">
                                <li
                                    v-for="(reward, index) in taskRewards(
                                        mercenary.tasks[activeMerc.tasksCompleted].rewards
                                    )"
                                    :key="index"
                                >
                                    {{ reward }}
                                </li>
                            </ul>
                        </transition>
                    </template>
                </div>
            </div>
            <div
                class="sm:col-span-3 text-center mb-4 text-lg pt-1 pb-2 rounded"
                :class="{
                    'bg-red-50': mercenary.role === 'Protector',
                    'bg-blue-50': mercenary.role === 'Caster',
                    'bg-green-50': mercenary.role === 'Fighter',
                }"
            >
                Abilities ({{ abilitiesMaxCost }}
                <img src="/images/mercs/mercenary-coin.png" class="h-6 inline" />)
            </div>
            <AbilityCard
                v-for="(ability, name) in abilities"
                :key="name"
                :ability="ability"
                :activeTier="activeMerc.abilities[name]"
                :costToMax="abilityCostToMax(name)"
                :showDetails="true"
                :itemEquippedTier="itemEquippedTierForAbility(name)"
                @decrementActiveTier="$emit('decrementAbilityActiveTier', mercName, name)"
                @incrementActiveTier="$emit('incrementAbilityActiveTier', mercName, name)"
                >{{ name }}</AbilityCard
            >
            <div
                class="sm:col-span-3 text-center mb-4 text-lg pt-1 pb-2 rounded"
                :class="{
                    'bg-red-50': mercenary.role === 'Protector',
                    'bg-blue-50': mercenary.role === 'Caster',
                    'bg-green-50': mercenary.role === 'Fighter',
                }"
            >
                Equipment ({{ equipmentMaxCost }}
                <img src="/images/mercs/mercenary-coin.png" class="h-6 inline" />)
            </div>
            <ItemCard
                v-for="(item, name) in equipment"
                :key="name"
                :item="item"
                :activeTier="activeMerc.equipment[name]"
                :costToMax="itemCostToMax(name)"
                :showDetails="true"
                :isEquiped="activeMerc.itemEquipped === name"
                @decrementActiveTier="$emit('decrementItemActiveTier', mercName, name)"
                @incrementActiveTier="$emit('incrementItemActiveTier', mercName, name)"
                @toggleItemEquipped="$emit('toggleItemEquipped', mercName, name)"
                >{{ name }}</ItemCard
            >
        </div>
    </section>
</template>

<script>
import AbilityCard from "./AbilityCard.vue";
import ItemCard from "./ItemCard.vue";
import UpDownButtons from "./UpDownButtons.vue";
const abilityUpgradeCosts = [50, 125, 150, 150];
const itemUpgradeCosts = [100, 150, 175];

export default {
    name: "MercenaryDetails",
    props: {
        mercenary: {
            type: Object,
            required: true,
        },
        activeMerc: {
            type: Object,
            required: true,
        },
        mercName: {
            type: String,
            required: true,
        },
    },
    emits: [
        "closeMercDetails",
        "decrementAbilityActiveTier",
        "incrementAbilityActiveTier",
        "decrementItemActiveTier",
        "incrementItemActiveTier",
    ],
    computed: {
        abilities() {
            return Object.fromEntries(
                Object.entries(this.mercenary.abilities).sort((l, r) => l[1].unlock - r[1].unlock)
            );
        },
        equipment() {
            return Object.fromEntries(
                Object.entries(this.mercenary.equipment).sort((l, r) =>
                    l[1].position < r[1].position ? -1 : l[1].position > r[1].position ? 1 : 0
                )
            );
        },
        abilityCostToMax() {
            return (abilityName) => {
                const numTiers = this.mercenary.abilities[abilityName].tiers.length;
                const currentTier = this.activeMerc?.abilities[abilityName] || 5 - numTiers + 1;
                if (currentTier >= numTiers) {
                    return 0;
                } else {
                    return abilityUpgradeCosts
                        .slice(-1 * (numTiers - currentTier))
                        .reduce((totalCost, cost) => totalCost + cost, 0);
                }
            };
        },
        itemCostToMax() {
            return (itemName) => {
                const numTiers = this.mercenary.equipment[itemName].tiers?.length ?? 0;
                const currentTier = this.activeMerc?.equipment[itemName] || 4 - numTiers + 1;
                if (currentTier >= numTiers) {
                    return 0;
                } else {
                    return itemUpgradeCosts
                        .slice(-1 * (numTiers - currentTier))
                        .reduce((totalCost, cost) => totalCost + cost, 0);
                }
            };
        },
        itemEquippedTierForAbility() {
            return (abilityName) => {
                if (
                    this.activeMerc?.itemEquipped &&
                    this.mercenary.equipment[this.activeMerc.itemEquipped].affects === abilityName
                ) {
                    const tiers = this.mercenary.equipment[this.activeMerc.itemEquipped].tiers ?? [
                        this.mercenary.equipment[this.activeMerc.itemEquipped],
                    ];
                    return tiers[
                        this.activeMerc.equipment[this.activeMerc.itemEquipped] + tiers.length - 5
                    ];
                }
                return null;
            };
        },
        abilitiesMaxCost() {
            return Object.keys(this.mercenary.abilities).reduce(
                (totalCost, abilityName) => totalCost + this.abilityCostToMax(abilityName),
                0
            );
        },
        equipmentMaxCost() {
            return Object.keys(this.mercenary.equipment).reduce(
                (totalCost, itemName) => totalCost + this.itemCostToMax(itemName),
                0
            );
        },
        mercenaryAttack() {
            return (
                this.mercenary.attack +
                (this.abilitiesMaxCost === 0 && this.equipmentMaxCost === 0 ? 1 : 0)
            );
        },
        mercenaryHealth() {
            return (
                this.mercenary.health +
                (this.abilitiesMaxCost === 0 && this.equipmentMaxCost === 0 ? 5 : 0)
            );
        },
        taskRewards() {
            return (taskRewards) => {
                if (taskRewards instanceof Array) {
                    return taskRewards.map((coins, index) => {
                        if (isFinite(coins)) {
                            return `${coins} ${index === 0 ? this.mercName : "Random"} Coins`;
                        } else {
                            return coins;
                        }
                    });
                } else {
                    return [taskRewards];
                }
            };
        },
    },
    components: {
        AbilityCard,
        ItemCard,
        UpDownButtons,
    },
};
</script>