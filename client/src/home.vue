<template>
    <div v-if="page == 'home'">
         <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand>MiniGram</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item v-b-modal.modal-prevent-closing>add new photo</b-nav-item>
                <!-- <b-button v-b-modal.modal-prevent-closing>Open Modal</b-button> -->
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <b-nav-form>
                <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
                <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                </b-nav-form>              
            </b-navbar-nav>            
            <b-button>Logout</b-button>
            </b-collapse>
        </b-navbar>     
    </div>
      <b-container fluid class="bv-example-row">
      <b-row>
        <b-col md="6" offset-md="3"><cardImage></cardImage></b-col>
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
        <b-form-file v-model="file" ref="file-input" class="mb-2"></b-form-file>
        <b-button @click="file = null">Reset Image</b-button>
      </div>
      </form>
    </b-modal>
  </div>    
    </div>    
</template>

<script>
import cardImage from './cardpost.vue'
import axios from './api/api'

export default {
    name:'home',
    props:['page'],
    components : {
      cardImage
    },
    data(){
        return {
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
        setImage(){
            this.image= event.target.files[0]
        },
        fetchAllPost(){
            axios({
                method : "get",
                url : `/posts`,
                headers : {
                    "token" : localStorage.token
                }
            })
            .then(({data}) => {
                console
                this.allPost= data
            })
            .catch(err => {
                console.log(err)
            })
        },
        addPost(){
            let formData = new FormData()
            formData.append('caption', this.newPost.image)
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
      checkFormValidity() {
      const valid = this.$refs.form.checkValidity()
      this.nameState = valid ? 'valid' : 'invalid'
      return valid
      },
      resetModal() {
        this.name = ''
        this.nameState = null
      },
      handleOk(bvModalEvt) {
        // Prevent modal from closing
        bvModalEvt.preventDefault()
        // Trigger submit handler
        this.handleSubmit()
      },
      handleSubmit() {
        // Exit when the form isn't valid
        if (!this.checkFormValidity()) {
          return
        }
        // Push the name to submitted names
        this.submittedNames.push(this.name)
        // Hide the modal manually
        this.$nextTick(() => {
          this.$refs.modal.hide()
        })
      }


    }
}
</script>

<style>

</style>
