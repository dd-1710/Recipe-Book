
export interface viewRecipeJson{
    id:number ;
    recipe_name:string;
    preparation_time:string;
    cooking_time:string;
    ingredients:string;
    img_path:string,
    recipe_procedure:string;
}

export class uniqueRecipeData{
    id:number = 0;
    recipe_name:string = '';
    preparation_time:string = '';
    cooking_time:string = '';
    ingredients:string = '';
    img_path:string = '';
    recipe_procedure:string = '';

    constructor(json:viewRecipeJson){
        this.id = json.id;
        this.recipe_name = json.recipe_name;
        this.preparation_time = json.preparation_time;
        this.cooking_time = json.cooking_time;
        this.ingredients = json.ingredients;
        this.img_path = json.img_path;
        this.recipe_procedure = json.recipe_procedure;

}
}