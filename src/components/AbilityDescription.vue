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
            const regex = new RegExp(/\{([\w\d\s:\.]+)\}/, "g");
            const matches = [...this.abilityDescription.matchAll(regex)];
            for (let i = 0; i < matches.length; i++) {
                if (!isNaN(matches[i][1])) {
                    // Found {0}
                    const baseValue = Number(matches[i][1]);
                    const tierValue = () => {
                        if (Array.isArray(this.activeTierInfo.description)) {
                            return Number(this.activeTierInfo.description[i]) || 0;
                        } else {
                            return Number(this.activeTierInfo.description) || 0;
                        }
                    };
                    const itemValue = () => {
                        if (Array.isArray(this.itemEquippedTier?.modifier?.description)) {
                            return Number(this.itemEquippedTier.modifier.description[i]) || 0;
                        } else {
                            return Number(this.itemEquippedTier?.modifier?.description) || 0;
                        }
                    };
                    // console.debug({ baseValue, tierValue: tierValue(), itemValue: itemValue() });
                    desc = desc.replace(matches[i][0], baseValue + tierValue() + itemValue());
                } else {
                    // Found {string}
                    /*
                    console.debug({
                        index: i,
                        match: matches[i][1],
                        itemEquippedTierModifier: this.itemEquippedTier?.modifier,
                        activeTierInfoDescription: this.activeTierInfo?.description,
                    });
*/
                    if (
                        Array.isArray(this.itemEquippedTier?.modifier?.description) &&
                        this.itemEquippedTier.modifier.description[i] !== undefined &&
                        this.itemEquippedTier.modifier.description[i] !== null
                    ) {
                        // replace {string} with modifier
                        //console.debug(this.itemEquippedTier.modifier.description[i]);
                        desc = desc.replace(
                            matches[i][0],
                            this.itemEquippedTier.modifier.description[i]
                        );
                    } else if (
                        !Array.isArray(this.itemEquippedTier?.modifier?.description) &&
                        this.itemEquippedTier?.modifier?.description !== undefined &&
                        this.itemEquippedTier.modifier.description !== null
                    ) {
                        // replace {string} with modifier
                        desc = desc.replace(
                            matches[i][0],
                            this.itemEquippedTier.modifier.description
                        );
                    } else if (
                        Array.isArray(this.activeTierInfo.description) &&
                        this.activeTierInfo.description[i] !== undefined &&
                        this.activeTierInfo.description[i] !== null
                    ) {
                        // replace {string} with active tier replacement
                        desc = desc.replace(matches[i][0], this.activeTierInfo.description[i]);
                    } else if (
                        this.activeTierInfo.description !== undefined &&
                        this.activeTierInfo.description !== null
                    ) {
                        desc = desc.replace(matches[i][0], this.activeTierInfo.description);
                    } else {
                        // replace {string} with string (i.e. remove braces)
                        desc = desc.replace(matches[i][0], matches[i][1]);
                    }
                }
            }
            if (this.itemEquippedTier?.modifier?.description instanceof Object) {
                if (this.itemEquippedTier.modifier.description.type === "append") {
                    desc = `${desc} ${this.itemEquippedTier.modifier.description.text}`;
                }
            }
            return desc.replaceAll("{", "").replaceAll("}", "");
        },
    },
};
</script>

<style>
</style>