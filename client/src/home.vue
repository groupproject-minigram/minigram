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
            <b-button @click="logout">Logout</b-button>
            </b-collapse>
        </b-navbar>       
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
        toLanding(){
            this.$emit('changePage', 'landing')
        },
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
        logout(){
            localStorage.clear()
            this.toLanding()
        }


    }
}
</script>

<style>

</style>
