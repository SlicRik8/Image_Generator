package com.ai.SpringAiDemo;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
@RequiredArgsConstructor
@RestController
public class GenAIController {


    private final ChatService chatService;
    private final ImageService imageService;
    private final RecipeService recipeService;

    @GetMapping("ask-ai")
    public String getResponse(@RequestParam String prompt){
        return chatService.getResponse(prompt);
    }


    @GetMapping("ask-ai-options")
    public String getResponseOptions(@RequestParam String prompt){
        return chatService.getResponseOptions(prompt);
    }


    @GetMapping("generate-image")
    public String generateImage(@RequestParam String prompt,
                                @RequestParam(defaultValue= "30") int steps,
                                @RequestParam(defaultValue = "7.5") double guidanceScale,
                                @RequestParam(defaultValue = "1024") int width,
                                @RequestParam(defaultValue = "1024") int height
    ){
        return imageService.generateImage(prompt,steps,guidanceScale,width,height);
    }

    @GetMapping("create-recipe")
    public String createRecipe(@RequestParam String ingredients,
                               @RequestParam String cuisine,
                               @RequestParam String dietaryRestrictions){
        return recipeService.createRecipe(ingredients,cuisine,dietaryRestrictions);

    }


}
