<template>
<div class="grid">
    <RecipePreviewList  v-if="evenRecipes.length" :favoritRecipes="favorits" :watchedRecipes="watched"  :recipes="evenRecipes"></RecipePreviewList>
    <RecipePreviewList v-if="oddRecipes.length" :favoritRecipes="favorits" :watchedRecipes="watched"  :recipes="oddRecipes"></RecipePreviewList>
    
</div>
</template>
<script>
import RecipePreview from './RecipePreview.vue'
import RecipePreviewList from './RecipePreviewList.vue';
export default {
    name: "RecipesGrid",
    props: {
        recipes: Array,
        watched:Array,
        favorits:Array
    },
    data() {
        return {
            dividedRecipes: [],
            numPerRow: 2,
        };
    },
    created() {
        this.dividedRecipes = this.divide();
    },
    methods: {
        divide() {
            let res = [];
            for (let i = 0; i < this.recipes.length; i += this.numPerRow) {
                let cur = [];
                for (let j = 0; j < this.numPerRow; j++) {
                    cur.push(this.recipes[i + j]);
                }
                res.push(cur);
                if (this.recipes.length - i < this.numPerRow) {
                    let cur = [];
                    for (let k = i; k < this.recipes.length; k++) {
                        cur.push(this.recipes[k]);
                    }
                    res.push(cur);
                    break;
                }
            }
            return res;
        },
   
        

    },
    computed:{
        evenRecipes(){
                let res=[]
                for (var i = 0; i < this.recipes.length; i++) {
                    if(i%2==0){
                        res.push(this.recipes[i])
                    }
                }
                return res
            },
        oddRecipes(){
        let res=[]
        for (var i = 0; i < this.recipes.length; i++) {
            if(i%2!=0){
                res.push(this.recipes[i])
            }
        }
        return res
    }
    },
    components: { RecipePreviewList }
}
</script>
<style scoped>
.grid{
     display: flex;
    justify-content: space-around;
    width: 100%;
}
</style>