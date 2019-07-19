<template>
    <div>
    <b-card-group>
        <b-card :img-src="post.image" img-alt="Image" img-top style="height : 100px;">
        <b-card-text>{{post.userId.username}}</b-card-text>
        <b-card-text>{{post.caption}}</b-card-text>
        <div slot="footer">
            <a @click="updatelike(post._id)">
                <i v-if="statuslike =='no'" class="fas fa-heart" style="font-size: 20px;"></i>
                <i v-if="statuslike =='ok'" class="fas fa-heart" style="font-size: 20px; color:red"></i>
            </a>

            <small class="text-muted">Likes {{post.likes.length}}</small>

            <b-button size="sm" variant="outline-success">
                <a :href="fburl"><i class="fab fa-facebook-f"></i> <span>Share on Facebook </span></a>
            </b-button>
            <b-button size="sm" variant="outline-success">
                <a :href="twitterurl"><a v-bind:href="twitterurl"><i class="fab fa-twitter"></i> <span>Share on Twitter </span></a>
            </b-button>
            

            </div>
        </b-card>
    </div>
</template>

<script>
import axios from './api/api.js'

export default {
    name : "cardImage",
    props : ['post'],
    data(){
        return {
            statuslike:'no',
            fburl: '',
            twitterurl:''
        }
    },
    methods:{
        updatelike(id){
            console.log(id)
            console.log('masuk update like');

            axios({
                method: "patch",
                url:`/posts/${id}`,
                headers : { 'token' : localStorage.token}
            })
            .then(({data}) => {
                console.log(data)
                this.getOnePost()
            })
            .catch(err =>{
                console.log('error update like')
                console.log(err.response.data)
                console.log(err)
                
            })
        },
        checklike(){
            if(this.post.likes.includes(localStorage.userId)){
                this.statuslike='ok'
            }
        },
        changeUrl(){
            let url = this.post.image.replace(":", "%3A")
            this.fburl="https://www.facebook.com/sharer/sharer.php?u=" + url
            this.twitterurl = "https://twitter.com/intent/tweet?url=" + url;
        },
        getOnePost(id){
            axios({
                url: `posts/one/${id}`,
                method: 'get',
                headers:{
                    'token': localStorage.token
                }
            })
            .then(({data})=>{
                this.post= data
                this.checklike()
            })
            .catch(err =>{
                console.log('error get one');
                console.log(err)
            })
        }
    },
    mounted(){
        this.changeUrl()
    }

}
</script>

<style>
        
</style>
