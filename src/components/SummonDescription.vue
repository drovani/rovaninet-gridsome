<template>
    <div>
        <p
            :class="{
                'text-sm': description.length > 60,
            }"
        >
            {{ description }}
        </p>
        <div class="grid grid-cols-3 justify-items-center rounded-xl bg-gray-50 bg-opacity-20 py-1">
            <Attack :role="summon.role" :value="summonAttack" class="h-8 w-8 text-xl p-1" />
            <div class="self-end font-semibold">{{ summon.race }}</div>
            <Health :role="summon.role" :value="summonHealth" class="h-8 w-8 text-xl p-1" />
        </div>
    </div>
</template>

<script>
import Attack from "~/components/Attack.vue";
import Health from "./Health.vue";

export default {
    props: {
        summon: {
            type: Object,
            required: true,
        },
        activeTierInfo: {
            type: Object,
            required: true,
        },
        itemEquippedTier: {
            type: Object,
            required: false,
        },
    },
    computed: {
        description() {
            let desc = this.summon.description;
            let itemMod = this.itemEquippedTier?.modifier?.summon?.description;
            let abilityDesc = this.activeTierInfo?.summon?.description;

            /* console.debug({
                desc,
                itemMod,
                abilityDesc,
            }); */

            if (itemMod?.type === "replace") {
                desc = itemMod.text;
                itemMod = itemMod.value;
            } else if (itemMod?.type === "append") {
                desc = `${desc} ${itemMod.text}`;
                itemMod = itemMod.value;
            } else if (itemMod?.type === "prepend") {
                desc = `${itemMod.text} ${desc}`;
                itemMod = itemMod.value;
            }

            if (!Array.isArray(itemMod)) {
                itemMod = [itemMod === undefined ? null : itemMod];
            }
            if (!Array.isArray(abilityDesc)) {
                abilityDesc = [abilityDesc === undefined ? null : abilityDesc];
            }

            const regex = new RegExp(/\{([\w\d\s:\.]+)\}/, "g");
            const matches = [...desc.matchAll(regex)];
            for (let i = 0; i < matches.length; i++) {
                if (!isNaN(matches[i][1])) {
                    // Found {0}
                    const baseValue = Number(matches[i][1]);
                    const tierValue = Number(abilityDesc[i]) || 0;
                    const itemValue = Number(itemMod[i]) || 0;

                    // console.debug({ baseValue, tierValue: tierValue(), itemValue: itemValue() });
                    desc = desc.replace(matches[i][0], baseValue + tierValue + itemValue);
                } else {
                    // Found {string}
                    /*console.debug({
                        index: i,
                        match: matches[i][1],
                        itemModDesc: itemMod,
                        abilityDesc: abilityDesc,
                    });*/
                    if (itemMod[i] !== undefined && itemMod[i] !== null) {
                        // replace {string} with modifier
                        desc = desc.replace(matches[i][0], itemMod[i]);
                    } else if (abilityDesc[i] !== undefined && abilityDesc[i] !== null) {
                        // replace {string} with active tier replacement
                        desc = desc.replace(matches[i][0], abilityDesc[i]);
                    } else {
                        // replace {string} with string (i.e. remove braces)
                        desc = desc.replace(matches[i][0], matches[i][1]);
                    }
                }
            }

            return desc.replaceAll("{", "").replaceAll("}", "");
        },
        summonAttack() {
            return (
                (this.summon.attack ?? 0) +
                (this.activeTierInfo.summon?.attack ?? 0) +
                (this.itemEquippedTier?.modifier?.summon?.attack ?? 0)
            );
        },
        summonHealth() {
            return (
                (this.summon.health ?? 0) +
                (this.activeTierInfo.summon?.health ?? 0) +
                (this.itemEquippedTier?.modifier?.summon?.health ?? 0)
            );
        },
    },
    components: { Attack, Health },
};
</script>

<style>
</style>