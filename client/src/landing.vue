<template>
    <div id="landing" v-if="page== 'landing'">
        <b-button v-b-modal.modal-register>Register</b-button>
        <b-button v-b-modal.modal-login>Login</b-button>

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
      @show="resetModalRegister"
      @hidden="resetModalRegister"
      @ok="handleOkRegister"
    >

      <form @submit.stop.prevent="register">
        <b-form-group
          label="Username"
          label-for="name-input"
          invalid-feedback="Name is required"
        >        
          <b-form-input
            id="user-name-input"
            v-model="newUser.username"
            required
          ></b-form-input>

          <b-form-group
          label="Email"
          label-for="email-input"
          invalid-feedback="Email is required"
        >
          <b-form-input
            id="email"
            v-model="newUser.email"
            required
          ></b-form-input>

          <b-form-group
          label="Password"
          label-for="password-input"
          invalid-feedback="password is required"
        >
          <b-form-input
            id="password"
            type="password"
            v-model="newUser.password"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>

    <b-modal
      id="modal-login"
      ref="modal"
      title="Login With Your Registered Email"
      @show="resetModalLogin"
      @hidden="resetModalLogin"
      @ok="handleOkLogin"
    >
      <form @submit.stop.prevent="login">      
          <b-form-group
          label="Email"
          label-for="email-input"
          invalid-feedback="Email is required"
        >
          <b-form-input
            id="email"
            v-model="user.email"
            required
          ></b-form-input>

          <b-form-group
          label="Password"
          label-for="password-input"
          invalid-feedback="password is required"
        >
          <b-form-input
            id="password"
            type="password"
            v-model="user.password"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
    </div>
</template>

<script>
import axios from './api/api.js'

export default {
    name: 'landing',
    props:['page'],
    data(){
        return {
            newUser:{
                username:'',
                email:'',
                password:''
            },
            user:{
                email:'',
                password:''
            }
        }
    },
    methods:{
        toHome(){
            this.$emit('changePage', 'home')
        },
        register(){
           
            console.log('masuk registe', this.user)
             axios({
                method: "post",
                url: `/users/register`,
                data:this.newUser
            })
            .then(({data})=>{
                
                console.log('success register')
                this.firstName=''
                this.lastName=''
                this.user.email= data.email,
                this.user.password= this.newUser.password
                this.login()
                
            })
            .catch(function(err){
                console.log('masuk error')
                console.log(err)
            })
        },
        login(){
            axios({
                method: "post",
                url: `/users/login`,
                data: this.user
            })
            .then(({data}) => {
                console.log('berhasil login')

                this.user.email=''
                this.user.password=''
                localStorage.setItem('username', data.username)
                localStorage.setItem('userId', data.userId)
                localStorage.setItem('token', data.token)
                
                this.toHome()

                this.$nextTick(() => {
                this.$refs.modal.hide()
        })

            })
            .catch(function(err){
                console.log('masuk error')
                console.log(err, 'ini errroorrrr')
            })
        },
        resetModalRegister() {
            this.newUser.username = ''
            this.newUser.email = ''
            this.newUser.password = ''
        },
        handleOkRegister(bvModalEvt) {
            // Prevent modal from closing
            bvModalEvt.preventDefault()
            // Trigger submit handler
            this.register()
        },
        resetModalLogin() {
            this.newUser.username = ''
            this.newUser.email = ''
            this.newUser.password = ''
        },
        handleOkLogin(bvModalEvt) {
            // Prevent modal from closing
            bvModalEvt.preventDefault()
            // Trigger submit handler
            this.login()
        },
    }
}
</script>

<style>

</style>
