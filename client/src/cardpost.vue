<template>
    <div>
    <b-card-group>
        <b-card title="Title" img-src="https://placekitten.com/g/300/450" img-alt="Image" img-top style="height : 100px;">
        <b-card-text>
            This is a wider card with supporting text below as a natural lead-in to additional content.
            This content is a little bit longer.
        </b-card-text>
        <div slot="footer"><small class="text-muted">Last updated 3 mins ago</small></div>
        </b-card>
    </div>
</template>

<script>
export default {
    name : "cardImage",
    props : ['post']

}
</script>

<style>
        
</style>
