<template>
    <div>
        <van-field  v-model="name"  placeholder="标签名称">
            <Icon type="md-bookmark" color="skyblue" slot="left-icon"/>
        </van-field>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: ''
        };
    },
    methods: {
        build() {
            if (this.name.trim().length === 0) {
                return; 
            } else {
                const tags = this.$store.state.tags;
                const newTag = {
                    id: Number(new Date().getTime()),
                    name: this.name,
                    num: 0,
                    color: this.randomColor()
                };

                let exe = false;

                tags.forEach(item=> {
                    if (item.name === this.name.trim()) {
                        exe = true;
                    }
                });
                !exe && this.$store.dispatch('newTag', newTag);
            }
        },
        randomColor() {
            const r = Math.floor(Math.random() * 256); // 随机生成256以内r值
            const g = Math.floor(Math.random() * 256); // 随机生成256以内g值
            const b = Math.floor(Math.random() * 256); // 随机生成256以内b值
            const alpha = Math.random(); // 随机生成1以内a值

            return `rgb(${r},${g},${b},${alpha})`;
        }
    }
};
</script>
