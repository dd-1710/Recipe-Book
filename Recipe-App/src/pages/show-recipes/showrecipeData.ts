export interface recipeJson{
    id:number
    recipe_name:string;
    recipe_desc:string ;
    img_path:string;
    user_Id:number;
}


export class recipeData{
    id:number = 0;
    recipe_name:string = '';
    recipe_desc:string = '';
    img_path:string = '';
    user_Id = 0;

    constructor(json?:recipeJson){
      if(json != null){
        this.id = json.id;
        this.recipe_name = json.recipe_name;
        this.recipe_desc = json.recipe_desc;
        this.img_path = json.img_path;
        this.user_Id = json.user_Id;
      }
    }
}

