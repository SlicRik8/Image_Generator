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

    @GetMapping("ask-ai")
    public String getResponse(@RequestParam String prompt){
        return chatService.getResponse(prompt);
    }


    @GetMapping("ask-ai-options")
    public String getResponseOptions(@RequestParam String prompt){
        return chatService.getResponseOptions(prompt);
    }


    @GetMapping("generate-image")
    public String generateImage(@RequestParam String prompt){
        return imageService.generateImage(prompt);
    }


}
