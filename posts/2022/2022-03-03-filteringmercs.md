---
title: Filtering Mercs by Role & Tribe
category: Rovani's Vue
date: 2022-03-03
series: HSMercs From Scratch
step: 5
tags:
  - vuejs
  - vuex
---

The `MercenaryCard` is starting to look like a production-ready display, so in this step, we'll begin adding reactivity to the site by implementing filtering of the cards by role and by rarity.

![Mukla, Samuro, Jaina](/images/hsmercs-banner-roles.png)

> The fifth in a series of posts on ['HSMercs Helper From Scratch'](/hs-mercs-from-scratch), a tutorial for recreating _[HSMercs Helper](https://hsmercs.rovani.net)_.

Currently, the roles, rarities, and tribes are union literal types directly on the Mercenary interface. We'll want to extract that since the project is going to start using these in multiple locations.

#### src/models/roles.ts

```typescript
export const Roles = ["Protector", "Fighter", "Caster"] as const;
export type Role = typeof Roles[number];
```

The first line maps to a `ReadonlyArray<T>` where `T` is a union of the literal types `Protector`, `Fighter`, and `Caster`. It took me awhile to really understand the concept of literal strings being types and sometimes I still don't get it. The array is useful as something that we can globally import, because all classes and components will now use the exact same array of roles. By having this fixed array, though, we can also create a `Role` type that is a union literal type of the literal types in the array. Makes sense? (I struggled, too)

#### src/models/rarities.ts

```typescript
export const Rarities = ["Rare", "Epic", "Legendary"] as const;
export type Rarity = typeof Rarities[number];
```

This is a pattern we will be utilizing frequently.

#### src/models/tribes.ts
```typescript
export const AllianceTribes = ["Draenei", "Dwarf", "Gnome", "High Elf", "Human", "Night Elf"] as const;
export const HordeTribes = ["Blood Elf", "Goblin", "Half-Orc", "Orc", "Tauren", "Troll", "Undead"] as const;
export const NeutralTribes = ["Beast", "Demon", "Dragon", "Elemental", "Murloc", "Pirate"] as const;
export const Tribes = [...AllianceTribes, ...HordeTribes, ...NeutralTribes] as const;

export type AllianceTribe = typeof AllianceTribes[number];
export type HordeTribe = typeof HordeTribes[number];
export type NeutralTribe = typeof NeutralTribes[number];
export type Tribe = typeof Tribes[number];
```

Of the three fixed sets of values, Tribes is the one most likely to see new additions in the future. "Pirates", for example, was not a part of the launch set (though, there is some frustration in the community, because all of the others are immutable races, and then "Pirates" came along to confusing things.) Since there is a concept of some tribes belonging to the Alliance faction or the Horde faction, we can separate them now and still provide a union of the union literal types called `Tribes`.

From a usability standpoint, an immediate downside you may notice is that the `Tribes` array is not alphabetized. However, this can be handled with a computed property if any component needs that.

#### src/models/mercenary.ts
```diff
+ import { Rarity } from "./rarities";
+ import { Role } from "./roles";
+ import { Tribe } from "./tribes";
  
  export default interface Mercenary {
-     role: "Protector" | "Fighter" | "Caster",
+     role: Role,
-     rarity: "Rare" | "Epic" | "Legendary",
+     rarity: Rarity,
-     tribe?: "Beast" | "Blood Elf" | "Demon" | "Draenei" | "Dragon" | "Dwarf" | "Elemental" | "Gnome" | "Half-Orc" | "High Elf" | "Human" | "Murloc" | "Night Elf" | "Orc" | "Pirate" | "Tauren" | "Troll" | "Undead"
+     tribe: Tribe | null,
      attack: number,
      health: number,
      abilities: { [name: string]: any },
      equipment: { [name: string]: any },
      tasks: any[]
}
```

Going back to the `mercenary` interface, replace the hardcoded union literal types with the exported ones.

#### src/models/mercFilter.ts
```typescript
import { Rarity } from "./rarities";
import { Role } from "./roles";
import { Tribe } from "./tribes";

export default interface MercFilter {
    roles?: Role[],
    rarities?: Rarity[],
    tribes?: Tribe[]
}
```

Now that we have created exportable types for each of the fields we will filter by, the `MercFilter` interface provides for a wrapper that contains the properties.

#### src/store/getters.ts
```diff
  import { MercCollection } from "../models/mercCollection";
+ import MercFilter from "../models/mercFilter";
  import { State } from "./state";
  
  export default {
-   getMercenaries(state: State) : MercCollection {
+   getMercenaries: (state: State) => (filter?: MercFilter): MercCollection => {
      return state.mercenaries;
    }
  }
```

With this step, we're changing the `getMercenaries` function from returning a `MercCollection` to returning a function that takes a `MercFilter` and returns a `MercCollection`. JavaScript is fun like that. We aren't doing any this the `filter` argument just yet.

If you ran the tests, everything would break, so first we'll update the one existing test so it will get back to passing.

#### tests/vuex/getters.tests.ts
```diff
import { expect } from 'chai';
import Mercenary from '../../src/models/mercenary';
import getters from "../../src/store/getters";
import { State } from '../../src/store/state';

describe('Mercenary Data Getters', () => {

    it('gets mercenaries collection', () => {
        const state: State = {
            mercenaries: {
                "Alexstrasza": {
                    role: "Protector",
                    rarity: "Rare",
                    tribe: "Dragon",
                    attack: 10,
                    health: 80,
                    abilities: {},
                    equipment: {},
                    tasks: []
                }
            }
        };

-       const result = getters.getMercenaries(state);
+       const result = getters.getMercenaries(state)();

        expect(result).deep.equal({
            "Alexstrasza": {
                role: "Protector",
                rarity: "Rare",
                tribe: "Dragon",
                attack: 10,
                health: 80,
                abilities: {},
                equipment: {},
                tasks: []
            }
        });
    });
});
```

Time for a quick sanity check to make sure the one test is still working.

```bash
yarn test
```

![2 tests still passing](/images/mocha-test-2.png)

We have to make one more change in order to get the app back to a working state.

#### src/components/mercenaries.vue
```diff
<script lang="ts">
  import { defineComponent } from "vue";
  import { mapGetters } from "vuex";
  import { MercCollection } from "../models/mercCollection";
  import mercjson from "../static/mercenaries.json";
  import { SET_MERCENARIES } from "../store/types";
  import MercenaryCard from "./MercenaryCard.vue";
  
  export default defineComponent({
    computed: {
+     ...mapGetters(["getMercenaries"]),
      mercenaries(): MercCollection {
-       return this.$store.getters.getMercenaries;
+       return this.getMercenaries();
      },
    },
    mounted(): void {
      if (Object.keys(this.mercenaries ?? {}).length === 0) {
        this.$store.commit(SET_MERCENARIES, mercjson.mercenaries);
      }
    },
    components: { MercenaryCard },
  });
  </script>
```

The `mapGetters` function is a [helpful utility](https://next.vuex.vuejs.org/guide/getters.html#the-mapgetters-helper) that Vuex provides to directly map the named array of functions from the Vuex `getters` into `computed` properties on the component. We then update the `mercenaries()` computed to return the return value from the `getMercenaries` computed (which is just a wrapper for the Vuex getter).

```bash
yarn test
yarn dev
```

Hopefully, nothing changed from the last time we ran the tests and viewed the output.

### Adding Filter to Getters & Unit Tests

#### src/store/getters.ts
```diff
import { MercCollection } from "../models/mercCollection";
import MercFilter from "../models/mercFilter";
import { State } from "./state";

export default {
  getMercenaries: (state: State) => (filter?: MercFilter): MercCollection => {
+   if (filter === undefined) {
      return state.mercenaries;
+   }

+   let mercs = Object.entries(state.mercenaries);

+   if (Array.isArray(filter.roles)) {
+     mercs = mercs.filter(m => filter.roles.includes(m[1].role));
+   }

+   return Object.fromEntries(mercs);
  }
}
```

To keep the existing functionality of having an undefined `filter` return all of the Mercenaries, we put a quick check at the top for that scenario. Next, we convert the `mercenaries` [object to an array](https://developer.mozilla.org/en-US/docs/web/javascript/reference/global_objects/object/entries), filter the entries for those with a matching `role`, then [convert it back](https://developer.mozilla.org/en-US/docs/web/javascript/reference/global_objects/object/fromentries) to an object (so that it conforms with the `MercCollection` interface).

#### tests/vuex/getters.test.ts
```diff
  import { expect } from 'chai';
  import Mercenary from '../../src/models/mercenary';
+ import MercFilter from '../../src/models/mercFilter';
  import getters from "../../src/store/getters";
  import { State } from '../../src/store/state';
  
  describe('Mercenary Data Getters', () => {
  
      it('gets mercenaries collection', () => {
          const state: State = {
              mercenaries: {
                  "Alexstrasza": {
                      role: "Protector",
                      rarity: "Rare",
                      tribe: "Dragon",
                      attack: 10,
                      health: 80,
                      abilities: {},
                      equipment: {},
                      tasks: []
                  }
              }
          };
  
          const result = getters.getMercenaries(state)();
  
          expect(result).deep.equal({
              "Alexstrasza": {
                  role: "Protector",
                  rarity: "Rare",
                  tribe: "Dragon",
                  attack: 10,
                  health: 80,
                  abilities: {},
                  equipment: {},
                  tasks: []
              }
          });
      });
  
+     const mukla: Mercenary = {
+         role: "Protector",
+         rarity: "Epic",
+         tribe: "Beast",
+         attack: 10,
+         health: 73,
+         abilities: {},
+         equipment: {},
+         tasks: []
+     };
+     const samuro: Mercenary = {
+         role: "Fighter",
+         rarity: "Rare",
+         tribe: "Orc",
+         attack: 10,
+         health: 66,
+         abilities: {},
+         equipment: {},
+         tasks: []
+     };
+     const jaina: Mercenary = {
+         role: "Caster",
+         rarity: "Legendary",
+         tribe: "Human",
+         attack: 7,
+         health: 72,
+         abilities: {},
+         equipment: {},
+         tasks: []
+     };
 
+     it('filters mercs by single role', () => {
+         const state: State = {
+             mercenaries: {
+                 "King Mukla": mukla,
+                 "Blademaster Samuro": samuro,
+                 "Jaina Proudmoore": jaina
+             }
+         };
+         const filter: MercFilter = {
+             roles: ['Protector']
+         };
+ 
+         const result = getters.getMercenaries(state)(filter);
+ 
+         expect(result).deep.equal({ "King Mukla": mukla });
+ 
+     });
 
+     it('filters mercs by two roles', () => {
+         const state: State = {
+             mercenaries: {
+                 "King Mukla": mukla,
+                 "Blademaster Samuro": samuro,
+                 "Jaina Proudmoore": jaina
+             }
+         };
+         const filter: MercFilter = {
+             roles: ["Fighter", "Caster"]
+         };
+ 
+         const result = getters.getMercenaries(state)(filter);
+ 
+         expect(result).deep.equal({
+             "Blademaster Samuro": samuro,
+             "Jaina Proudmoore": jaina
+         })
+     });
  });
```

Since we are going to write a whole bunch of tests that create a new `State` object utilizing a few mercenaries, we add a trio of mercs that we can reuse. I selected these three because they are each unique roles, unique rarities, and unique factions. One test is to validate that a single `role` is filterable and another test to validate that multiple `roles` can be in the filter.

```bash
yarn test
```

We should now see three passing tests!


## Unit Testing Components

Before adding UI functionality, we need to add a little bit of functionality to the `Mercenaries` component and then write unit tests to validate them.

#### src/components/Mercenaries.vue
```diff
<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import { MercCollection } from "../models/mercCollection";
import MercFilter from "../models/mercFilter";
import { Roles } from "../models/roles";
import mercjson from "../static/mercenaries.json";
import { SET_MERCENARIES } from "../store/types";
import MercenaryCard from "./MercenaryCard.vue";

export default defineComponent({
  computed: {
    ...mapGetters(["getMercenaries"]),
    mercenaries(): MercCollection {
-     return this.getMercenaries();
+     return this.getMercenaries(this.filter);
    },
  },
+ data: () => {
+   return {
+     filter: {
+       roles: [...Roles],
+     } as MercFilter,
+   };
+ },
+ methods: {
+   showAllMercenaries() {
+     this.filter.roles = [...Roles];
+     this.filter.rarities = [...Rarities];
+   },
+   filterRole(role: string) {
+     this.filter.roles = [role];
+   },
+ },
  mounted(): void {
    if (Object.keys(this.mercenaries ?? {}).length === 0) {
      this.$store.commit(SET_MERCENARIES, mercjson.mercenaries);
    }
  },
  components: { MercenaryCard },
});
</script>
```

We have added two more sections to the component. The `data` properties hold data that is only going to be utilized by this component or passed down to children components. The `methods` section allows for functions that perform actions beyond just returning data. This is our first entry into getting some reactivity into the component.

#### tests/components/mercenaries.tests.ts
```typescript
```