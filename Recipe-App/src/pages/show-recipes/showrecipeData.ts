export interface recipeJson{
    id:number
    recipe_name:string;
    recipe_desc:string ;
    img_path:string;
    user_id:number;
    is_bookmarked:string;
    rating:number;
    category:string;
    preparation_time:string;
    cooking_time:string;
    serve:string;
    ingredients:string;
    recipe_procedure:string;

  
}

export interface BookmarkResponse {
  bookmarked: boolean;
}

export class recipeData{
    id:number = 0;
    recipe_name:string = '';
    recipe_desc:string = '';
    img_path:string = '';
    user_id = 0;
    is_bookmarked = '';
    rating = 1;
    category:string = '';
    preparation_time:string = '' ;
    cooking_time:string= '';
    serve:string = '';
    ingredients:string = '';
    recipe_procedure:string = ''


    constructor(json?:recipeJson){
      if(json != null){
        this.id = json.id;
        this.recipe_name = json.recipe_name;
        this.recipe_desc = json.recipe_desc;
        this.img_path = json.img_path;
        this.user_id = json.user_id;
        this.is_bookmarked = json.is_bookmarked;
        this.rating = json.rating;
        this.category = json.category;
        this.preparation_time = json.preparation_time;
        this.cooking_time = json.cooking_time;
        this.serve = json.serve;
        this.recipe_procedure = json.recipe_procedure;
        this.ingredients = json.ingredients;
      }
    }
}

