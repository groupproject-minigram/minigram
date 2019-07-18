<template>
    <div>
        <landing :page="page"></landing>
        <home :page="page" ></home>
    </div>
</template>

<script>
import landing from './landing.vue'
import home from './home.vue'

export default {
    name:'app',
    components:{
        landing,
        home
    },
    data(){
        return {
            page: 'home'
        }
    },
    methods:{
        changePage(value){
            this.page= value
        }
    }
}
</script>

<style scoped>

</style>
