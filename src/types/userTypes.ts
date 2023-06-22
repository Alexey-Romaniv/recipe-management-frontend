export type SignRequest = {
    email: string,
    password: string,
}

export type SignResponse = {
    token: string,
    email: string,
    id: string,
    savedRecipes: Recipe[],
}

export type RejectValue = { message: string}

export type Ingredient = {
    quantity: string,
    name: string
};

export type Recipe = {
    _id: string,
    title: string,
    description: string,
    ingredients: Ingredient[],
    instructions: string[],
    imageURL?: string,


}

export type RecipeState = {
    recipes: Recipe[],
    isLoading: boolean,
    error: string | null,
}