<template>
    <div>
        <van-cell-group>
            <van-field v-model="title" label="标题" left-icon="new"/>
            <van-field
                readonly
                clickable
                label="标签"
                left-icon="label-o"
                :value="tag"
                placeholder="选择标签"
                @click="showPicker = true"
            />
            <van-field
                v-model="content"
                rows="3"
                autosize
                type="textarea"
                maxlength="100"
                placeholder="请输入留言"
                show-word-limit
            />
        </van-cell-group>
        <van-popup v-model="showPicker" position="top" :overlay="false">
            <van-picker
                show-toolbar
                :columns="tagsName"
                @cancel="showPicker = false"
                @confirm="onConfirm"
            />
        </van-popup>
    </div>
</template>

<script>
import {mapState, mapActions, mapGetters} from 'vuex';
export default {
    props: {
        id: Number
    },
    data() {
        return {
            title: '无标题',
            content: '',
            tag: '未标签',
            showPicker: false
        };
    },
    created() {
        this.task.forEach(({id, title, content, tag})=> {
            if (this.id === id) {
                [this.title, this.content, this.tag] = [title, content, tag];
            }
        });
    },
    computed: {
        ...mapState({
            task: 'task',
            tags: 'tags'
        }),
        ...mapGetters({
            tagsName: 'getTagsNames'
        })
    },
    methods: {
        ...mapActions({
            updateTask: 'updateTask'
        }),
        onConfirm(value) {
            [this.tag, this.showPicker] = [value, false];
        },
        async change() {
            let oldTag;
            const newTask = {
                content: this.content,
                title: this.title || '无标题',
                id: this.id,
                time: new Date().toLocaleString(),
                tag: this.tag
            };

            this.task.forEach(item=> {
                if (item.id === this.id) {
                    oldTag = item.tag;
                }
            });
            this.updateTask({
                oldTag: oldTag,
                newTag: this.tag,
                newTask: newTask
            });
        }
    }
};
</script>
