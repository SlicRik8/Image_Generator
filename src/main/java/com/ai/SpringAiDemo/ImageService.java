package com.ai.SpringAiDemo;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

import java.util.Base64;
import java.util.List;
import java.util.Map;


@Service
public class ImageService {


    @Value("${huggingface.api.key}")
    private String hfApiKey;


    @Value("${huggingface.api.url}")
    private String hfApiUrl;


    private final RestTemplate restTemplate = new RestTemplate();

    public String generateImage(String prompt){
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization","Bearer "+hfApiKey);
        headers.setAccept(List.of(MediaType.IMAGE_JPEG));


        //body
        Map<String,Object> body = Map.of("inputs",prompt);


        //call
        ResponseEntity<byte[]> response = restTemplate.postForEntity(
                hfApiUrl,
                new HttpEntity<>(body,headers),
                byte[].class
        );

//        convert bytes to base 64(String) so it can be displayed on frontend
        byte[] imageBytes = response.getBody();
        return Base64.getEncoder().encodeToString(imageBytes);




    }




}
