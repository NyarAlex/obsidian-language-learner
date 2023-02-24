<template>
    <div id="jukuu">
        <ul class="jukuu-sens">
            <li class="jukuu-sen" v-for="item in result.content">
                <p class="jukuu-trans" v-html="item"></p>
            </li>
        </ul>
        <div>延伸内容：</div>
        <ul class="jukuu-sens">
            <li class="jukuu-sen" v-for="item in result.relate">
                <p class="jukuu-trans" v-html="item"></p>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { reactive, watch } from "vue";
import { useLoading } from "@dict/uses"
import { search, etymonlineResult } from "./engine";

const props = defineProps<{
    word: string,
}>();
const emits = defineEmits<{
    (event: "loading", status: { id: string, loading: boolean, result: boolean; }): void;
}>();

let result = reactive<etymonlineResult>({ content: [], relate: [] });

async function onSearch() {
    debugger;
    let res = await search(props.word);
    debugger;
    if (!res) return false;

    result.content = res.result.content;
    result.relate = res.result.relate;
    console.log(result);
    return true;
}

useLoading(() => props.word, "jukuu", onSearch, emits)

</script>

<style lang="scss">
#jukuu {
    ul.jukuu-sens {
        padding-left: 20px;

        li.jukuu-sen {
            margin: 0.5em 0;

            p {
                margin: 0;

                b {
                    color: #f9690e
                }
            }
        }
    }
}
</style>