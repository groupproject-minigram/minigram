<template>
    <div v-if="page == 'home'">
         <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand @click="body = 'feeds'" style="cursor : pointer">MiniGram</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item v-b-modal.modal-prevent-closing>add new photo</b-nav-item>
                <b-nav-item @click="body = 'myImage'">My Images</b-nav-item>
                <!-- <b-button v-b-modal.modal-prevent-closing>Open Modal</b-button> -->
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">                        
              <b-button @click="logout">Logout</b-button>
            </b-navbar-nav>            
            </b-collapse>
        </b-navbar>     
    </div>
      <b-container fluid class="bv-example-row">
      <b-row>
        <b-col v-if="body === 'feeds'" md="6" offset-md="3"><cardImage></cardImage></b-col>
      </b-row>
      <b-row>
        <b-col v-if="body === 'myImage'" md="4"><myImages><myImages></b-col>
      </b-row>

    <!-- modal upload file -->
    <div>
      <b-modal
        id="modal-prevent-closing"
        ref="modal"
        title="Submit Your Name"
        @show="resetModal"
        @hidden="resetModal"
        @ok="handleOk"
      >
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group
            label="Caption"
            label-for="caption-input"
          >
            <b-form-input
              id="name-input"
              v-model="caption"
              required
            ></b-form-input>
          </b-form-group>
          
      <!-- upload file -->
      <div>      
        <b-form-file v-model="newPost.image" class="mb-2"></b-form-file>
        <b-button @click="file = null">Reset Image</b-button>
      </div>
        </form>
      </b-modal>
    </div>    
  </div>    
</template>

<script>
import cardImage from './cardpost.vue'
import myImages from './cardMyimages.vue'
import axios from './api/api'

export default {
    name:'home',
    props:['page'],
    components : {
      cardImage,
      myImages
    },
    data(){
        return {
          body : 'feeds',
          allPost : [],
          myposts:[],
          newPost:{
              image:'',
              caption:''
          },
          caption: '',
          nameState: null,
          submittedNames: [],
           file : null
        }
    },
    methods : {
        changePage(val){
          this.body = val
        },
        toLanding(){
          this.$emit('changePage', 'landing')
        },
        fetchAllPost(){
            console.log('masuk fetch all post')
            axios({
                method : "get",
                url : `/posts`,
                headers : {
                    "token" : localStorage.token
                }
            })
            .then(({data}) => {
                console.log(data)
                this.allPost= data
            })
            .catch(err => {
                console.log(err)
            })
        },
        addPost(){
            let formData = new FormData()
            formData.append('caption', this.newPost.caption)
            formData.append('image', this.newPost.image)

            axios({
                method: "post",
                url: `/posts`,
                data: formData,
                headers:{
                    'token': localStorage.token
                }
            })
                .then(({data})=>{
                    console.log(data)
                    Swal.fire(
                        'Your article have been posted!',
                        'Posted!',
                        'success'
                    )

                    this.fetchAllPost()
                    this.$nextTick(() => {
                        this.$refs.modal.hide()
                    })
                                    
                })
                .catch(function(err){
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: 'Check your input!',
                    })
                        console.log('masuk error publish')
                        console.log(err)
                })

        },
        fetchMyPost(){
            axios({
                method : "get",
                url : `/posts/mypost`,
                headers : {
                    "token" : localStorage.token
                }
            })
            .then(({data}) => {
                console
                this.myposts= data
            })
            .catch(err => {
                console.log(err)
            })
        },
        logout(){
            localStorage.clear()
            this.toLanding()
        },
        resetModal() {
            this.newPost.image = null
            this.newPost.caption = null
        },
        handleOk(bvModalEvt) {
            // Prevent modal from closing
            bvModalEvt.preventDefault()
            // Trigger submit handler
            this.addPost()
        }
    },
    created(){
        this.fetchAllPost()
    }
}
</script>

<style>

</style>
