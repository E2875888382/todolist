<template>
    <div>
        <van-cell-group>
            <van-field v-model="title" label="标题" left-icon="new"></van-field>
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
import {mapState, mapGetters, mapActions} from 'vuex';
export default {
    data() {
        return {
            title: '无标题',
            content: '',
            tag: '未标签',
            showPicker: false
        };
    },
    computed: {
        ...mapState({
            tags: 'tags'
        }),
        ...mapGetters({
            tagsName: 'getTagsNames'
        })
    },
    methods: {
        ...mapActions({
            newTask: 'newTask'
        }),
        onConfirm(value) {
            [this.tag, this.showPicker] = [value, false];
        },
        cancel() {
            [this.title, this.content, this.tag] = ['无标题', '', '未标签'];
        },
        build() {
            this.newTask({
                id: Number(new Date().getTime()),
                title: this.title,
                tag: this.tag,
                time: new Date().toLocaleString(),
                content: this.content
            });
        }
    }
};
</script>
