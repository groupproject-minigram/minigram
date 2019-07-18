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
                            <input type="text" class="form-control" id="caption">
                        </div>
                        <div class="form-group">
                            <label for="img">Uplad Your Image below : </label>                          
                            <input type="file" id="img">
                        </div>                    
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
                    
                    <!-- Modal footer -->
                    <div class="modal-footer">
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
           allPost : [] 
        }
    },
    methods : {
        fetchAllPost(){
            axios({
                method : "post",
                url : `/`,
                headers : {
                    "token" : localStorage.token
                }
            })
            .then(({data}) => {
                this.allPost.push(data)
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
