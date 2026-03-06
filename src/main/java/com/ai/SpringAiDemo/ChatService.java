package com.ai.SpringAiDemo;



import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

import java.util.List;
import java.util.Map;

@Service
public class ChatService {

    @Value("${groq.api.key}")
    private String groqapiKey;

    @Value("${groq.api.url}")
    private String groqapiUrl;


    private final RestTemplate restTemplate = new RestTemplate();


    //for smaller simpler questions
    public String getResponse(String prompt){
        return callGroq(prompt,"llama-3.3-70b-versatile",0.7);

    }

    //for complex detailed questions
    public String getResponseOptions(String prompt){
        return callGroq(prompt,"llama-3.3-70b-versatile",0.4);
    }


    private String callGroq(String prompt,String model,double temperature){
        //header
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + groqapiKey);

        //body
        Map<String,Object> body = Map.of(
                "model",model,
                "temperature",temperature,
                "messages", List.of(
                        Map.of("role","user","content",prompt)
                )
        );


        //call
        ResponseEntity<Map> response = restTemplate.postForEntity(
                groqapiUrl, //where to send
                new HttpEntity<>(body,headers), //what to send
                Map.class //what will be returned
        );



        //parse the response
        List<Map> choices = (List<Map>) response.getBody().get("choices");
        Map message = (Map) choices.get(0).get("message");

        return (String) message.get("content");
    }




}
