<template>
    <div
        :class="{
            'text-sm': description.length > 100,
        }"
    >
        {{ description }}
    </div>
</template>

<script>
export default {
    props: {
        abilityDescription: {
            type: String,
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
            let desc = this.abilityDescription;
            let itemMod = this.itemEquippedTier?.modifier?.description;
            let abilityDesc = this.activeTierInfo?.description;

            /* console.debug({
                desc,
                itemMod,
                abilityDesc,
            }); */

            if (itemMod?.type === "replace") {
                desc = itemMod.text;
                itemMod = itemMod.value;
            } else if (itemMod?.type === "append") {
                const space = itemMod.text[0] === "," ? "" : " ";
                desc = `${desc}${space}${itemMod.text}`;
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
    },
};
</script>

<style>
</style>