export interface recipeJson{
    id:number
    recipe_name:string;
    recipe_desc:string ;
    img_path:string;
}


export class recipeData{
    id:number = 0;
    recipe_name:string = '';
    recipe_desc:string = '';
    img_path:string = '';

    constructor(json?:recipeJson){
      if(json != null){
        this.id = json.id;
        this.recipe_name = json.recipe_name;
        this.recipe_desc = json.recipe_desc;
        this.img_path = json.img_path;
      }
    }
}

