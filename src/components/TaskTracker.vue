<template>
    <div class="text-base rounded bg-gray-50">
        <div class="mb-4 mx-2 border-b text-center h-12 pb-4">
            <span v-if="tasksCompleted === 0">No tasks completed, yet!</span>
            <span v-else>Task #{{ tasksCompleted }}: {{ tasks[tasksCompleted - 1].name }}</span>
        </div>
        <div class="flex">
            <div class="flex-1">
                <span v-if="tasksCompleted < taskRewards.length">
                    Next Task: #{{ tasksCompleted + 1 }}</span
                >
                <span v-else>Tasks Complete!</span>
            </div>
            <UpDownButtons
                :showDecrement="tasksCompleted > 0"
                :showIncrement="tasksCompleted < taskRewards.length"
                :upIcon="'check-circle'"
                :downIcon="'undo'"
                class="text-sm"
                style="direction: rtl"
                @decrement="$emit('decrementTasksCompleted', mercName)"
                @increment="$emit('incrementTasksCompleted', mercName)"
            />
        </div>
        <template v-if="tasksCompleted < taskRewards.length">
            <p class="font-semibold">
                {{ tasks[tasksCompleted].name }}
            </p>
            <p>{{ tasks[tasksCompleted].description }}</p>
            <p>Rewards:</p>
            <ul class="list-disc list-inside">
                <li
                    v-for="(reward, index) in rewardsFormatted(taskRewards[tasksCompleted])"
                    :key="index"
                >
                    {{ reward }}
                </li>
            </ul>
            <p class="hidden sm:block mt-4">{{tasks[tasksCompleted].quote}}</p>
        </template>
    </div>
</template>

<script>
import UpDownButtons from "./UpDownButtons.vue";

export default {
    props: {
        tasks: {
            type: Array,
            required: true,
        },
        taskRewards: {
            type: Array,
            required: true,
        },
        mercName: {
            type: String,
            required: true,
        },
        tasksCompleted: {
            type: Number,
            default: 0,
        },
        task2itemName: {
            type: String,
            required: true,
        },
        task7itemName: {
            type: String,
            required: true,
        },
    },
    computed: {
        rewardsFormatted() {
            return (taskRewards) => {
                if (taskRewards instanceof Array) {
                    return taskRewards.map((coins, index) => {
                        if (isFinite(coins)) {
                            return `${coins} ${index === 0 ? this.mercName : "Random"} Coins`;
                        } else {
                            return coins;
                        }
                    });
                } else if (taskRewards == "Task 2") {
                    return [this.task2itemName];
                } else if (taskRewards == "Task 7") {
                    return [this.task7itemName];
                }
            };
        },
    },
    components: { UpDownButtons },
};
</script>