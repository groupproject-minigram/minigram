<template>
    <div v-if="page == 'home'">
         <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand>MiniGram</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item>add new photo</b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <b-nav-form>
                <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
                <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                </b-nav-form>              
            </b-navbar-nav>
            <b-button v-b-modal.modal-register>Register</b-button>
            <b-button v-b-modal.modal-login>Login</b-button>
            <b-button>Logout</b-button>
            </b-collapse>
        </b-navbar>

        <div>
    

    <!-- <div class="mt-3">
      Submitted Names: -->
      <!-- <div v-if="submittedNames.length === 0">--</div> -->
      <!-- <ul v-else class="mb-0 pl-3"> -->
        <!-- <li v-for="name in submittedNames">{{ name }}</li> -->
      <!-- </ul> -->
    <!-- </div> -->

    <b-modal
      id="modal-register"
      ref="modal"
      title="Submit Your Data"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >

      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          :state="nameState"
          label="Username"
          label-for="name-input"
          invalid-feedback="Name is required"
        >        
          <b-form-input
            id="user-name-input"
            v-model="name"
            :state="nameState"
            required
          ></b-form-input>

          <b-form-group
          :state="emailState"
          label="Email"
          label-for="email-input"
          invalid-feedback="Email is required"
        >
          <b-form-input
            id="email"
            v-model="registerEmail"
            :state="emailState"
            required
          ></b-form-input>

          <b-form-group
          :state="password"
          label="Password"
          label-for="password-input"
          invalid-feedback="password is required"
        >
          <b-form-input
            id="password"
            type="password"
            v-model="registerPassword"
            :state="password"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>

    <b-modal
      id="modal-login"
      ref="modal"
      title="Login With Your Registered Email"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">      
          <b-form-group
          :state="emailState"
          label="Email"
          label-for="email-input"
          invalid-feedback="Email is required"
        >
          <b-form-input
            id="email"
            v-model="loginEmail"
            :state="emailState"
            required
          ></b-form-input>

          <b-form-group
          :state="password"
          label="Password"
          label-for="password-input"
          invalid-feedback="password is required"
        >
          <b-form-input
            id="password"
            type="password"
            v-model="loginPassword"
            :state="password"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
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
           }
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
        }


    }
}
</script>

<style>

</style>
