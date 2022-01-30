---
title: Filtering Mercs by Role
category: Rovani's Vue
date: 2022-03-03
series: HSMercs From Scratch
step: 5
tags:
  - vuejs
  - vuex
  - vitest
---

The `MercenaryCard` is starting to look like a production-ready display, so in this step, we'll begin adding reactivity to the site by implementing filtering of the cards by role.

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
-   [GET_MERCENARIES](state: State) : MercCollection {
+   [GET_MERCENARIES]: (state: State) => (filter?: MercFilter): MercCollection => {
      return state.mercenaries;
    }
  }
```

With this step, we're changing the `[GET_MERCENARIES]` function from returning a `MercCollection` to returning a function that takes a `MercFilter` and returns a `MercCollection`. JavaScript is fun like that. We aren't doing any thing with the `filter` argument just yet.

If you ran the tests, everything would break, so first we'll update the one existing test so it will get back to passing.

#### tests/vuex/getters.tests.ts
```diff
  import { describe, expect, it } from "vitest";
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
  
-         const result = getters[GET_MERCENARIES](state);
+         const result = getters[GET_MERCENARIES](state)();
  
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

![2 tests still passing](/images/vitest-mutations.png)

We have to make one more change in order to get the app back to a working state.

#### src/components/Mercenaries.vue
```diff
<script lang="ts">
  import { defineComponent } from "vue";
+ import { mapGetters } from "vuex";
  import { MercCollection } from "../models/mercCollection";
  import mercjson from "../static/mercenaries.json";
  import { GET_MERCENARIES, SET_MERCENARIES } from "../store/types";
  import MercenaryCard from "./MercenaryCard.vue";
  
  export default defineComponent({
    computed: {
+     ...mapGetters([GET_MERCENARIES]),
      mercenaries(): MercCollection {
-       return this.$store.getters[GET_MERCENARIES];
+       return this[GET_MERCENARIES]();
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

The `mapGetters` function is a [helpful utility](https://next.vuex.vuejs.org/guide/getters.html#the-mapgetters-helper) that Vuex provides to directly map the named array of functions from the Vuex `getters` into `computed` properties on the component. We then update the `mercenaries()` computed to return the return value from the `[GET_MERCENARIES]` computed (which is just a wrapper for the Vuex getter).

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
    [GET_MERCENARIES]: (state: State) => (filter?: MercFilter): MercCollection => {
+     if (filter === undefined) {
        return state.mercenaries;
+     }
  
+     let mercs = Object.entries(state.mercenaries);
  
+     if (Array.isArray(filter.roles)) {
+       mercs = mercs.filter(m => filter.roles.includes(m[1].role));
+     }
  
+     return Object.fromEntries(mercs);
    }
  }
```

To keep the existing functionality of having an undefined `filter` return all of the Mercenaries, we put a quick check at the top for that scenario. Next, we convert the `mercenaries` [object to an array](https://developer.mozilla.org/en-US/docs/web/javascript/reference/global_objects/object/entries), filter the entries for those with a matching `role`, then [convert it back](https://developer.mozilla.org/en-US/docs/web/javascript/reference/global_objects/object/fromentries) to an object (so that it conforms with the `MercCollection` interface).

#### tests/constants.ts
```typescript
import Mercenary from "../src/models/mercenary";

export const KingMukla: Mercenary = {
    role: "Protector",
    rarity: "Epic",
    tribe: "Beast",
    attack: 10,
    health: 73,
    abilities: {},
    equipment: {},
    tasks: []
};
export const BlademasterSamuro: Mercenary = {
    role: "Fighter",
    rarity: "Rare",
    tribe: "Orc",
    attack: 10,
    health: 66,
    abilities: {},
    equipment: {},
    tasks: []
};
export const JainaProudmoore: Mercenary = {
    role: "Caster",
    rarity: "Legendary",
    tribe: "Human",
    attack: 7,
    health: 72,
    abilities: {},
    equipment: {},
    tasks: []
};
```

We'll want a fixed set of Mercenaries that we can unit test upon. These three were picked because they are from unique roles, rarities, and factions.

#### tests/vuex/getters.test.ts
```diff
  import { describe, expect, it } from "vitest";
- import Mercenary from '../../src/models/mercenary';
+ import MercFilter from '../../src/models/mercFilter';
  import getters from "../../src/store/getters";
  import { State } from '../../src/store/state';
+ import { BlademasterSamuro, JainaProudmoore, KingMukla } from "../constants";
  
  describe('Mercenary Data Getters', () => {
+     let state: State;
+ 
+     beforeEach(() => {
+         state = {
+             mercenaries: {
+                 "King Mukla": { ...KingMukla },
+                 "Blademaster Samuro": { ...BlademasterSamuro },
+                 "Jaina Proudmoore": { ...JainaProudmoore },
+             },
+         };
+     });
  
      it('gets mercenaries collection', () => {
-         const state: State = {
-             mercenaries: {
-                 "Alexstrasza": {
-                     role: "Protector",
-                     rarity: "Rare",
-                     tribe: "Dragon",
-                     attack: 10,
-                     health: 80,
-                     abilities: {},
-                     equipment: {},
-                     tasks: []
-                 }
-             }
-         };
- 
          const result = getters[GET_MERCENARIES](state)();
  
          expect(result).deep.equal({
-           "Alexstrasza": {
-               role: "Protector",
-               rarity: "Rare",
-               tribe: "Dragon",
-               attack: 10,
-               health: 80,
-               abilities: {},
-               equipment: {},
-               tasks: []
-           }
+           "King Mukla": KingMukla,
+           "Blademaster Samuro": BlademasterSamuro,
+           "Jaina Proudmoore": JainaProudmoore,
          });
      });

+     it('filters mercs by single role', () => {
+         const filter: MercFilter = {
+             roles: ['Protector']
+         };
+ 
+         const result = getters[GET_MERCENARIES](state)(filter);
+ 
+         expect(result).deep.equal({ "King Mukla": mukla });
+ 
+     });
 
+     it('filters mercs by two roles', () => {
+         const filter: MercFilter = {
+             roles: ["Fighter", "Caster"]
+         };
+ 
+         const result = getters[GET_MERCENARIES](state)(filter);
+ 
+         expect(result).deep.equal({
+             "Blademaster Samuro": samuro,
+             "Jaina Proudmoore": jaina
+         })
+     });
  });
```

Since we are going to write a whole bunch of tests that need a new `State` object utilizing a few mercenaries, we add a `beforeEach` call. As implied by the name, this set of code runs before each of the tests (the '`it`' statements). This consolidates the "Assemble" part of the unit tests so each test only has to create the filter we are testing against. We then create one test to validate that a single `role` is filterable and another test to validate that multiple `roles` can be in the filter.

An important bit of code to note is the use of the spread operator when initializing the `state`. This is so the original object are never modified. We could call `Object.freeze` in the `tests/constants.ts` file, but writes would just silently fail. This way, if the code modifies the mercenary unexpectedly, it will be noticed during assertion. Ideally, `Object.freeze` would throw a runtime error in code and the tests would detect that, but as of today, this doesn't occur.

```bash
yarn test
```

We should now see three passing tests!

## Unit Testing Components

Before adding displayable UI functionality, we need to add the filter logic to the `Mercenaries` component and then write unit tests to validate them.

#### src/components/Mercenaries.vue
```diff
<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapMutations } from "vuex";
import { MercCollection } from "../models/mercCollection";
import MercFilter from "../models/mercFilter";
import { Roles } from "../models/roles";
import mercjson from "../static/mercenaries.json";
import { GET_MERCENARIES, SET_MERCENARIES } from "../store/types";
import MercenaryCard from "./MercenaryCard.vue";

export default defineComponent({
+ data: () => {
+   return {
+     filter: {
+       roles: [...Roles],
+     } as MercFilter,
+   };
+ },
  computed: {
    ...mapGetters([GET_MERCENARIES]),
    mercenaries(): MercCollection {
-     return this[GET_MERCENARIES]();
+     return this[GET_MERCENARIES](this.filter);
    },
  },
+ methods: {
+   ...mapMutations([SET_MERCENARIES])
+   showAllMercenaries(): boolean {
+     this.filter.roles = [...Roles];
+   },
+   filterRole(role: string): string {
+     this.filter.roles = [role];
+   },
+ },
  mounted(): void {
    if (Object.keys(this.mercenaries ?? {}).length === 0) {
-     this.$store.commit(SET_MERCENARIES, mercjson.mercenaries);
+     this[SET_MERCENARIES](mercjson.mercenaries);
    }
  },
  components: { MercenaryCard },
});
</script>
```

We have added two more sections to the component. The `data` properties hold data that is only going to be utilized by this component or passed down to children components. The `methods` section allows for functions that perform actions beyond just returning data. This is our first entry into getting some reactivity into the component.

Oh, and while we're here, let's utilize the `mapMutations` helper and refractor the initial collection loading mutations.

#### tests/components/mercenaries.tests.ts
```typescript
import { shallowMount } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";
import Mercenaries from "../../src/components/Mercenaries.vue";
import { store } from "../../src/store";
import { GET_MERCENARIES } from "../../src/store/types";
import { BlademasterSamuro, JainaProudmoore, KingMukla } from "../constants";

describe("Mercenaries.vue component", () => {
    let mercvue: typeof Mercenaries;

    beforeEach(() => {
        store.state.mercenaries = {
            "King Mukla": { ...KingMukla },
            "Blademaster Samuro": { ...BlademasterSamuro },
            "Jaina Proudmoore": { ...JainaProudmoore },
        };
        mercvue = shallowMount(Mercenaries, {
            global: {
                plugins: [store]
            }
        });
    })

    it('gets mercenaries collection', () => {
        const result = mercvue.vm[GET_MERCENARIES]();

        expect(result).to.eql({
            "King Mukla": KingMukla,
            "Blademaster Samuro": BlademasterSamuro,
            "Jaina Proudmoore": JainaProudmoore
        })
    });
    it('updates filters by role', () => {
        expect(mercvue.vm.filter.roles).to.have.members(["Protector", "Fighter", "Caster"]);

        mercvue.vm.filterRole('Protector');

        expect(mercvue.vm.filter.roles).to.eql(["Protector"]);
    });
    it('toggleRole enables/disables a role', () => {
        expect(mercvue.vm.filter.roles).to.have.members(["Fighter", "Protector", "Caster"]);

        // turn off Fighter
        mercvue.vm.toggleRole("Fighter");

        expect(mercvue.vm.filter.roles).to.have.members(["Protector", "Caster"]);

        // turn off Caster
        mercvue.vm.toggleRole("Caster");

        expect(mercvue.vm.filter.roles).to.have.members(["Protector"]);
        
        // turn on Fighter
        mercvue.vm.toggleRole("Fighter");

        expect(mercvue.vm.filter.roles).to.have.members(["Protector", "Fighter"]);
    })
})
```

That should be all we need to have the appropriate methods on the component and test that they work as expected.

```bash
yarn test
```

![Filtering mercs and unit testing](/images/vitest-filter-roles.png)

 ## Building the User Interface

 With all of the un-sexy functionality out of the way, it's time to add some user-interactable widgets.

 #### src/components/RoleFilter.vue
 ```vue
 <template>
  <div class="flex gap-2">
    <div
      v-for="role in Roles"
      :key="role"
      class="rounded-t-md pl-6 pr-2 cursor-pointer flex"
      :class="[
        'bg-' + role.toLowerCase(),
      ]"
      @click="$emit('filterRole', role)"
    >
      <div>{{ role }}s</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Role, Roles } from "../models/roles";

defineEmits<{
  (event: "filterRole", role: Role): void;
}>();
</script>
```

This component iterates over the `Roles` array, renders a div for each role, which emits a `filterRole` event and includes the clicked `Role`. Pretty straightforward.

#### src/components/Mercenaries.vue
```diff
  <template>
    <section class="px-2">
      <h1 class="text-2xl font-bold m-8">Collectable Mercenaries</h1>
+     <div
+       class="flex text-white font-bold text-xl gap-2 mb-1 pl-4 border-b-8"
+     >
+       <RoleFilter
+         @filter-role="filterRole"
+       />
+     </div>
      <div class="flex flex-wrap gap-2">
        <MercenaryCard
          v-for="(merc, mercName) in mercenaries"
          :key="mercName"
          v-bind="merc"
          >{{ mercName }}
        </MercenaryCard>
      </div>
    </section>
  </template>

  <script lang="ts">
  // include with the existing imports
+ import RarityFilter from "./RarityFilter.vue";

  // ...snip...

  // add to existing components
-   components: { MercenaryCard },
+   components: { MercenaryCard, RoleFilter },
  });
  </script>
```

We're listening to the `filterRole` event to be emitted by the `RoleFilter` then telling Vue to pass the arguments to this parent control's `filterRole` method. Since the functionality of the `Mercenaries.vue`'s `filterRole` method have been tested, it should... just work!

```bash
yarn dev
```

Fire up the server, click on "Fighter". Then click on "Caster". And then "Protector". Pretty neat!

![Role filter component filters](/images/hsmercs-rolefilter.png)

## Show All and Toggle Role

The quick demo shows two early limitations. First, once you click a filter, you can't get back to all of the Mercenaries. Second, you can only show one role at a time. There's no ability to display both "Fighters" and "Protectors".

#### src/components/RoleFilter.vue
```diff
  <template>
    <div class="flex gap-2">
      <div
        v-for="role in Roles"
        :key="role"
-       class="rounded-t-md pl-6 pr-2 cursor-pointer flex"
+       class="rounded-t-md pl-6 pr-2 cursor-pointer opacity-50 flex"
        :class="[
          'bg-' + role.toLowerCase(),
+         { 'opacity-100': enabledRoles.includes(role) },
        ]"
        @click="$emit('filterRole', role)"
      >
        <div>{{ role }}s</div>
+       <div class="ml-6 font-mono" @click.stop="$emit('toggleRole', role)">
+         <template v-if="enabledRoles.includes(role)">-</template>
+         <template v-if="!enabledRoles.includes(role)">+</template>
+       </div>
      </div>
    </div>
  </template>
  <script setup lang="ts">
  import { Role, Roles } from "../models/roles";
  
+ defineProps({
+   enabledRoles: {
+     type: Array as () => Role[],
+     default: [],
+   },
+ });
 
  defineEmits<{
    (event: "filterRole", role: Role): void;
+   (event: "toggleRole", role: Role): void;
  }>();
  </script>
```

We add some controls to emit a `toggleRole` event when they are clicked. The `@click.stop` calls means to fire when the element is clicked and stop propagation of the event to parents. In order to know whether this is going to be an "include" or an "exclude" click, we need to know which roles are currently enabled. To get that information, we specify that the parent can pass that information in the `enabledRoles` prop.

#### src/components/Mercenaries.vue
```diff
  <template>
    <section class="px-2">
      <h1 class="text-2xl font-bold m-8">Collectable Mercenaries</h1>
      <div
        class="flex text-white font-bold text-xl gap-2 mb-1 pl-4 border-b-8"
+       :class="[filterBorderColor]"
      >
+       <div
+         class="bg-gray-800 rounded-t-md px-2 cursor-pointer opacity-50"
+         :class="{
+           'opacity-100': showingAllMercenaries,
+         }"
+         @click="showAllMercenaries"
+       >
+         All Mercenaries
+       </div>
       <RoleFilter
+         :enabled-roles="filter.roles"
          @filter-role="filterRole"
+         @toggle-role="toggleRole"
        />
      </div>
      <div class="flex flex-wrap gap-2">
        <MercenaryCard
          v-for="(merc, mercName) in mercenaries"
          :key="mercName"
          v-bind="merc"
          >{{ mercName }}
        </MercenaryCard>
      </div>
    </section>
  </template>
  <script lang="ts">
  import { defineComponent } from "vue";
  import { mapGetters, mapMutations } from "vuex";
  import { MercCollection } from "../models/mercCollection";
  import MercFilter from "../models/mercFilter";
  import { Roles } from "../models/roles";
  import mercjson from "../static/mercenaries.json";
  import { GET_MERCENARIES, SET_MERCENARIES } from "../store/types";
  import MercenaryCard from "./MercenaryCard.vue";
  import RoleFilter from "./RoleFilter.vue";
  
  export default defineComponent({
    data: () => {
      return {
        Roles,
        filter: {
          roles: [...Roles],
        } as MercFilter,
      };
    },
    computed: {
      ...mapGetters([GET_MERCENARIES]),
      mercenaries(): MercCollection {
        return this[GET_MERCENARIES](this.filter);
      },
+     showingAllMercenaries(): boolean {
+       return (
+         this.filter.roles.length === Roles.length &&
+         this.filter.rarities.length === Rarities.length
+       );
+     },
+     filterBorderColor(): string {
+       if (this.filter.roles.length === 1) {
+         return "border-" + this.filter.roles[0].toLowerCase();
+       } else {
+         return "border-gray-800";
+       }
+     },
    },
    methods: {
      ...mapMutations([SET_MERCENARIES]),
+     showAllMercenaries(): void {
+       this.filter.roles = [...Roles];
+     },
      filterRole(role: string): void {
        this.filter.roles = [role];
      },
      toggleRole(role: string): void {
        const idx = this.filter.roles.indexOf(role);
        if (idx < 0) {
          this.filter.roles.push(role);
        } else {
          this.filter.roles.splice(idx, 1);
        }
      },
    },
    mounted(): void {
      if (Object.keys(this.mercenaries ?? {}).length === 0) {
        this[SET_MERCENARIES](mercjson.mercenaries);
      }
    },
    components: { MercenaryCard, RoleFilter },
  });
  </script>
```

#### tests/components/mercenaries.test.ts
```diff
  describe("Mercenaries.vue component", () => {
      let mercvue: typeof Mercenaries;
  
      // ...snip...

+     it('showAllMercenaries resets filter to view all', () => {
+         mercvue.vm.filter = {};
+         expect(mercvue.vm.filter.roles).to.be.undefined;
+ 
+         mercvue.vm.showAllMercenaries();
+ 
+         expect(mercvue.vm.filter.roles).to.have.members(["Fighter", "Protector", "Caster"]);
+     });
  })
```

This `Mercenaries.vue` component is growing quite quickly, isn't it! We added a new method to show all of the mercenaries, created a new test for that method, added an element that will call that method when it is clicked, and we updated the interaction with the `RolesFilter` to pass in the currently enabled roles and to listen for the `toggleRole` event to be emitted. While we were in there, we added a bit of fun styling to the filtering tabs.

![Show all and toggle roles](/images/hsmercs-rolefilters.png)

## Step 6: [Filtering Mercs by Rarity and Sorting](/posts/2022/filtering-mercs-by-rarity-and-sorting)

The first filter took a lot of explaining to piece together. The `RoleFilter` is going to come together very quickly and then we'll add alphabetical sorting.