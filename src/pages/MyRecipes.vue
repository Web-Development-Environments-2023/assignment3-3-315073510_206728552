<template>
  <div class="container">
    <h1 class="title">My Recipes </h1>
    <div v-if="recipes.length==0" >
        No my recipes yet
      </div>
      <div id="spinner-div" v-else-if="favoritRecipes==undefined">
        <b-spinner  label="Spinning"></b-spinner>
      </div>
      <RecipesGrid v-else-if="recipes!=undefined" :watched="lastWatched" :favorits="favoritRecipes" :recipes="recipes"></RecipesGrid>

  </div>

</template>
<script>
import api from '../services/api'
import RecipesGrid from '../components/RecipesGrid'
export default{
  name:'MyRecipes',
  components: {
    RecipesGrid
},
  data(){
    return{
       recipes:Array,
        lastWatched:Array,
      favoritRecipes:Array,
    }
  
  },
    props:{
      randomRecipes:[],
     
  },
  async created(){
   this.recipes=await api.getMyRecipes()
    this.lastWatched=await api.getWatched()
     this.favoritRecipes=await api.getFavoriteRecipes()
  }
}
</script>

<style>
#spinner-div{
  display: flex;
  justify-content: center;
}
</style>