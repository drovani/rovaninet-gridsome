<template>
    <Layout>
        <h1 class="text-4xl text-center mb-8">Hearthstones Mercenaries Helpers</h1>
        <div class="container grid grid-flow-col gap-3">
            <section class="whitespace-nowrap row-span-2">
                <h3 class="text-lg underline">Available Mercenaries</h3>
                <ul>
                    <li
                        v-for="merc in mercenaries"
                        :key="merc.name"
                        @click="highlightMerc(merc.name)"
                        :class="merc.role.toLowerCase()"
                        class="border-2 rounded-md pl-2 mb-1 cursor-pointer"
                    >{{ merc.name }}
                    <span v-if="collection[merc.name]" class="float-right">✔</span></li>
                </ul>
            </section>
            <section v-if="highlightedMercId" class="object-fill">
                <MercenaryDetails :mercenary="highlightedMerc" :collected="collection[highlightedMerc.name]" />
            </section>
            <section>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
                gap-1">
                    <MercenaryCard :mercenary="merc" v-for="merc in mercenaries" :key="merc.name" />
                </div>
            </section>
        </div>
    </Layout>
</template>

<script>
import mercjson from "~/types/mercenaries.json";
import colljson from "~/types/collection.json";
import MercenaryCard from '~/components/MercenaryCard.vue';
import MercenaryDetails from '~/components/MercenaryDetails.vue';

export default {
    data: function () {
        return {
            mercenaries: mercjson.mercenaries,
            collection: colljson.mercenaries,
            highlightedMercId: null
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
            return this.mercenaries.find(merc => merc.name === this.highlightedMercId);
        }
    },
    methods: {
        highlightMerc: function (mercId) {
            this.highlightedMercId = mercId;
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