package com.ai.SpringAiDemo;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import org.springframework.http.*;

import java.util.List;
import java.util.Map;

@Service
public class RecipeService {



    @Value("${groq.api.key}")
    private String groqapiKey;

    @Value("${groq.api.url}")
    private String groqapiUrl;



    private final RestTemplate restTemplate = new RestTemplate();


    public String createRecipe(String ingredients,String cuisine,String dietaryRestrictions) {

        String prompt = """
                I want to create a recipe using the following ingredients: %s.
                The cuisine type I prefer is %s.
                Please consider the following dietary restrictions: %s.
                Please provide me with a detailed recipe including title, list of ingredients, and cooking instructions.
                """.formatted(ingredients, cuisine, dietaryRestrictions);


        //call

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization","Bearer "+ groqapiKey);


        Map<String,Object> body = Map.of(
                "model", "llama-3.3-70b-versatile",
                "temperature", 0.7,
                "messages", List.of(
                        Map.of("role","user","content",prompt)
                )
        );


        ResponseEntity<Map> response = restTemplate.postForEntity(
                groqapiUrl,
                new HttpEntity<>(body,headers),
                Map.class
        );

        List<Map> choices =(List<Map>)  response.getBody().get("choices");
        Map messages = (Map) choices.get(0).get("message");
        return  (String) messages.get("content");
    }

}
