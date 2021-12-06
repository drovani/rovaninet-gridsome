<template>
    <Layout>
        <h1 class="text-4xl text-center mb-8">Hearthstones Mercenaries Helpers</h1>
        <div
            :class="{ hidden: !message }"
            class="
                border border-green-800
                rounded
                text-center
                bg-green-50
                mb-8
                p-4
                relative
                text-green-900
            "
            @click="message = null"
        >
            {{ message }}
            <app-icon class="absolute right-1 top-1" :icon="['fas', 'times-circle']"></app-icon>
        </div>
        <div class="container grid grid-flow-row lg:grid-flow-col lg:gap-3">
            <section class="whitespace-nowrap lg:row-span-2">
                <header class="flex">
                    <h3 class="text-lg underline flex-grow">Available Mercenaries</h3>
                    <label class="ml-2 place-self-end block" for="importCollectionInput">
                        <app-icon :icon="['fas', 'file-import']"></app-icon>
                        <input
                            class="hidden"
                            type="file"
                            @change="importCollection"
                            id="importCollectionInput"
                        />
                    </label>
                    <button
                        @click.prevent="exportCollection"
                        class="ml-2 place-self-end"
                        title="Export Collection"
                    >
                        <app-icon :icon="['fas', 'file-export']"></app-icon>
                    </button>
                </header>
                <ul>
                    <li
                        v-for="(merc, name) in mercenaries"
                        :key="name"
                        :mercName="name"
                        @click="activateMerc(name)"
                        :class="merc.role.toLowerCase()"
                        class="border-2 rounded-md pl-2 mb-1 cursor-pointer"
                    >
                        <app-icon
                            v-if="collection[name] ? collection[name].collected : false"
                            :icon="['fas', 'check']"
                        ></app-icon>
                        <app-icon
                            v-else
                            :icon="['fas', 'plus']"
                            @click="addToCollection(name)"
                        ></app-icon>
                        {{ name }}
                    </li>
                </ul>
            </section>
            <section v-if="highlightedMercName" class="object-fill">
                <MercenaryDetails
                    :mercName="highlightedMercName"
                    :mercenary="highlightedMerc"
                    :activeMerc="collection[highlightedMercName]"
                    :taskRewards="taskRewards"
                    @decrementTasksCompleted="decrementTasksCompleted"
                    @incrementTasksCompleted="incrementTasksCompleted"
                    @closeMercDetails="activateMerc(null)"
                    @decrementAbilityActiveTier="decrementAbilityActiveTier"
                    @incrementAbilityActiveTier="incrementAbilityActiveTier"
                    @decrementItemActiveTier="decrementItemActiveTier"
                    @incrementItemActiveTier="incrementItemActiveTier"
                    @toggleItemEquipped="toggleItemEquipped"
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
                    />
                </div>
            </section>
        </div>
    </Layout>
</template>

<script>
import mercjson from "~/store/modules/mercenaries.json";
import colljson from "~/store/modules/collection.json";
import taskRewardsJson from "~/store/modules/taskrewards.json";

import MercenaryCard from "~/components/MercenaryCard.vue";
import MercenaryDetails from "~/components/MercenaryDetails.vue";
import { mapState } from "vuex";

export default {
    data: () => ({
        highlightedMercName: null,
        message: "",
        taskRewards: {
            type: Array,
        },
    }),
    components: {
        MercenaryCard,
        MercenaryDetails,
    },
    metaInfo() {
        return {
            title: "Hearthstone Mercenaries Helpers",
        };
    },
    computed: {
        highlightedMerc() {
            return this.mercenaries[this.highlightedMercName];
        },
        ...mapState({
            mercenaries: (state) => state.mercenaries,
            collection: (state) => state.collection,
        }),
    },
    methods: {
        activateMerc(mercName) {
            if (mercName !== null) {
                this.$store.commit("activateMerc", { name: mercName });
            }
            if (this.highlightedMercName === mercName) {
                this.highlightedMercName = null;
            } else {
                this.highlightedMercName = mercName;
            }
        },
        addToCollection(mercName) {
            this.$store.commit("addToCollection", {
                name: mercName,
                collected: true,
            });
        },
        exportCollection() {
            const data = JSON.stringify({ collection: this.$store.getters.collected });
            const blob = new Blob([data], { type: "text/plain" }),
                event = document.createEvent("MouseEvents"),
                a = document.createElement("a");
            a.download = "collection.json";
            a.href = window.URL.createObjectURL(blob);
            a.dataset.downloadurl = ["text/json", a.download, a.href].join(":");
            event.initEvent(
                "click",
                true,
                false,
                window,
                0,
                0,
                0,
                0,
                0,
                false,
                false,
                false,
                false,
                0,
                null
            );
            a.dispatchEvent(event);
        },
        importCollection(ev) {
            this.$store.dispatch("importCollection", { file: ev.target.files[0] });
            this.message = "Collection Imported";
        },
        decrementAbilityActiveTier(mercenaryName, abilityName) {
            this.$store.commit("decrementAbility", {
                mercName: mercenaryName,
                abilityName: abilityName,
            });
        },
        incrementAbilityActiveTier(mercenaryName, abilityName) {
            this.$store.commit("incrementAbility", {
                mercName: mercenaryName,
                abilityName: abilityName,
            });
        },
        decrementItemActiveTier(mercenaryName, itemName) {
            this.$store.commit("decrementItem", { mercName: mercenaryName, itemName: itemName });
        },
        incrementItemActiveTier(mercenaryName, itemName) {
            this.$store.commit("incrementItem", { mercName: mercenaryName, itemName: itemName });
        },
        toggleItemEquipped(mercenaryName, itemName) {
            this.$store.commit("toggleItemEquipped", {
                mercName: mercenaryName,
                itemName: itemName,
            });
        },
        decrementTasksCompleted(mercenaryName) {
            this.$store.commit("decrementTasksCompleted", { mercName: mercenaryName });
        },
        incrementTasksCompleted(mercenaryName) {
            this.$store.commit("incrementTasksCompleted", { mercName: mercenaryName });
        },
    },
    mounted() {
        if (Object.keys(this.mercenaries).length === 0) {
            this.$store.commit("setMercenaries", mercjson.mercenaries);
        }
        if (Object.keys(this.collection).length === 0) {
            this.$store.commit("setCollection", colljson.collection);
        }
        this.taskRewards = taskRewardsJson.rewards;
    },
};
</script>
<style>
.protector {
    @apply border-red-400;
}
.protector .attack-value {
    background-image: url("/images/mercs/protector-attack.png");
}
.protector .health-value {
    background-image: url("/images/mercs/protector-health.png");
}
.fighter {
    @apply border-green-400;
}
.fighter .attack-value {
    background-image: url("/images/mercs/fighter-attack.png");
}
.fighter .health-value {
    background-image: url("/images/mercs/fighter-health.png");
}
.caster {
    @apply border-blue-400;
}
.caster .attack-value {
    background-image: url("/images/mercs/caster-attack.png");
}
.caster .health-value {
    background-image: url("/images/mercs/caster-health.png");
}
</style>