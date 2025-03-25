<script>
export default {
    data() {
        return {
            count: 0
        }
    },
    methods: {
        increment() {
            if (this.count < 100) {
                this.count++;
            }

        },
        decremtne() {
            if (this.count > 0) {
                this.count--;
            }

        }
    }
}
</script>
<template>
    <div class="count">
        <h1>Simple increment decrement Count page</h1>
        <p>{{ count }}</p>
        <div>
            <button @click="increment">increment</button>
            <button @click="decremtne">Decrement</button>
        </div>

    </div>
</template>
<style>
.count {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.count p{
    font-size: 40px;
}
</style>