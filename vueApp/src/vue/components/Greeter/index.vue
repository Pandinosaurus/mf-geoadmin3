<template>
    <button v-on:click="greet">{{prefix}} {{name}}</button>
</template>

<script>
import { Greeter } from './js/poc.js'

export default {
    name: "Greeter",
    props: ["name"],
    // data is a function -> each instance has
    // its own copy
    data: function() {
        return {
            prefix: "Greet the",
            greeter: new Greeter(this.name)
        }
    }
    methods: {
        greet: function() {
            this.greeter.greet()
        }
    }

}

</script>