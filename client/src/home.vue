<template>
    <div v-if="page == 'home'">
        <nav class="navbar navbar-expand-lg navbar bg-info">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
            <a class="navbar-brand" href="#">Hidden brand</a>
            <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item active">
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">Open modal</button>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
            </li>            
            </ul>
            <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2 " type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
            <button type="button" class="btn btn-secondary">Logout</button>


            <!-- The Modal -->
            <div class="modal" id="myModal">
                <div class="modal-dialog">
                <div class="modal-content">
                
                <!-- Modal Header -->
                <div class="modal-header">
                <h4 class="modal-title">Modal Heading</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                    
                <!-- Modal body -->
                <div class="modal-body">
                    <form action="/action_page.php">
                        <div class="form-group">
                            <label for="caption">Caption</label>
                            <input v-model="newPost.caption" type="text" class="form-control" id="caption">
                        </div>
                        <div class="form-group">
                            <label for="img">Uplad Your Image below : </label>                          
                            <input @change="setImage" type="file" id="img">
                        </div>                    
                    </form>
                </div>
                    
                    <!-- Modal footer -->
                    <div class="modal-footer">
                    <button @click="addPost" type="submit" class="btn btn-primary">Submit</button>
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                    </div>
                    
                </div>
                </div>
            </div>
        </div>
        </nav>

        <div class="container">
            <div v-for="post in allPost" :key="post._id">
            <cardImage :post="post"></cardImage>          
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
