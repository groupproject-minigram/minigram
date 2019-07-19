<template>
    <div>
      <b-card
        title="Card Title"
        :img-src="myImage.image"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem;"
        class="mb-2"
      >
        <b-card-text>
          {{ myImage.caption }}
        </b-card-text>
        <b-button href="#" variant="primary" @click="remove(myImage._id)">Delete this photo</b-button>
      </b-card>
    </div>
</template>

<script>
import axios from './api/api'
export default {
    name : 'myCardImage',
    props : ['myImage'],
    methods : {
      remove(id){
        this.$emit('removeImage', id)
      }
    }
}
</script>

<style>

</style>
