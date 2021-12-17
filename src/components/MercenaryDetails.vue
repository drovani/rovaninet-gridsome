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
                    <Attack
                        :role="mercenary.role"
                        :value="mercenaryAttack"
                        class="w-12 h-12 text-2xl p-2"
                    ></Attack>
                    <div class="flex-grow text-center sm:text-sm md:text-xl">
                        {{ mercenary.race }}
                    </div>
                    <Health
                        :role="mercenary.role"
                        :value="mercenaryHealth"
                        class="w-12 h-12 text-2xl p-2"
                    ></Health>
                </div>
                <div class="text-center mb-4">
                    {{ abilitiesMaxCost + equipmentMaxCost }}
                    <img src="/images/mercs/mercenary-coin.png" class="h-6 inline" />
                </div>
                <TaskTracker
                    :taskRewards="taskRewards"
                    :mercName="mercName"
                    :tasks="mercenary.tasks"
                    :tasksCompleted="activeMerc.tasksCompleted"
                    :task2itemName="getItemRewardForTask(2)"
                    :task7itemName="getItemRewardForTask(7)"
                    @decrementTasksCompleted="$emit('decrementTasksCompleted', mercName)"
                    @incrementTasksCompleted="$emit('incrementTasksCompleted', mercName)"
                ></TaskTracker>
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
import TaskTracker from "./TaskTracker.vue";
import UpDownButtons from "./UpDownButtons.vue";
import Attack from "./Attack.vue";
import Health from "./Health.vue";
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
        taskRewards: {
            type: Array,
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
                const currentTier = this.activeMerc.abilities[abilityName];
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
                const currentTier = this.activeMerc.equipment[itemName];
                if (currentTier > itemUpgradeCosts.length) {
                    return 0;
                } else {
                    return itemUpgradeCosts
                        .slice(-1 * (4 - currentTier))
                        .reduce((totalCost, cost) => totalCost + cost, 0);
                }
            };
        },
        itemEquippedTierForAbility() {
            return (abilityName) => {
                if (
                    this.activeMerc.itemEquipped &&
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
        itemEquippedActiveTierModifier() {
            const item = this.mercenary.equipment[this.activeMerc.itemEquipped];
            if (item) {
                if (Array.isArray(item.tiers)) {
                    return (
                        item.tiers[
                            this.activeMerc.equipment[this.activeMerc.itemEquipped] +
                                item.tiers.length -
                                5
                        ].modifier ?? null
                    );
                } else {
                    return item.modifier ?? null;
                }
            }
            return null;
        },
        mercenaryAttack() {
            return (
                this.mercenary.attack +
                (this.abilitiesMaxCost === 0 &&
                this.equipmentMaxCost === 0 &&
                this.activeMerc.tasksCompleted >= 7
                    ? 1
                    : 0) +
                (this.itemEquippedActiveTierModifier?.attack ?? 0)
            );
        },
        mercenaryHealth() {
            return (
                this.mercenary.health +
                (this.abilitiesMaxCost === 0 &&
                this.equipmentMaxCost === 0 &&
                this.activeMerc.tasksCompleted >= 7
                    ? 5
                    : 0) +
                (this.itemEquippedActiveTierModifier?.health ?? 0)
            );
        },
        getItemRewardForTask() {
            return (taskNumber) => {
                return Object.entries(this.mercenary.equipment).find(
                    (item) => item[1].unlock === `Task ${taskNumber}`
                )?.[0];
            };
        },
    },
    components: {
        AbilityCard,
        ItemCard,
        UpDownButtons,
        TaskTracker,
        Attack,
        Health,
    },
};
</script>