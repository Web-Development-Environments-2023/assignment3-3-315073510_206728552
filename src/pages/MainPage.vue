<template>
  <div class="container" >
    {{$cookies.get("username")}}
    <b-row class="main-content" v-if="init">

    <b-col >
      <RecipePreviewList  :watchedRecipes="lastWatched" :favoritRecipes="favoritRecipes"  :recipes="randomRecipes" title="Explore this recipes"  />
      <div class="newRandDiv">
        <b-button id="newRandomsBtn" variant="outline-primary" @click="newRandoms">Get New Random Recipes</b-button>
      </div>
    </b-col>
 
    <b-col>
            <router-link v-if="!$root.store.username" to="/login" tag="button">You need to Login to vue Last watched recipes</router-link>
       <RecipePreviewList v-if="$root.store.username"  :watchedRecipes="lastWatched" :favoritRecipes="favoritRecipes" :recipes="lastWatched" title="Last watched recipes" />
    </b-col>

  </b-row>
    <div v-else id="spinner-div">
        <b-spinner  label="Spinning"></b-spinner>
    </div>
    
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import api from '../services/api'
export default {
  name:'main-page',
  components: {
    RecipePreviewList
  },
  data(){
    return {
     randomRecipes:[],
      lastWatched:[],
      favoritRecipes:[],
      init:false
    }
  },
  computed:{
     isLoading(){
      return !this.randomRecipes.length && !this.lastWatched.length
     }
  },
  async created(){
    //get random recipes
    this.randomRecipes=await api.getRandomRecipes(3)
    //we need to know which recipes the user visited so we can display the watched icon
    this.lastWatched= await api.getWatched(3)
    //we need to know which recipes the user favorits so we can display the filled star icon
    this.favoritRecipes=await api.getFavoriteRecipes()
    this.init=true
    },
  methods: { 
    newRandoms(){
      api.getRandomRecipes(3).then(r=>this.randomRecipes=r)  
    }
  }

};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}

.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
#newRandomsBtn{
  text-align: center;

  margin-top: 10px;
}
.newRandDiv{
  width: 530px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
#spinner-div{
  display: flex;
  justify-content: center;
  margin-top: 100px;
}
.main-content{
  margin-top: 5px;
}
</style>
