package com.miniproject.palace.controller;

import com.miniproject.palace.model.Palace;
import com.miniproject.palace.model.PalaceInfo;
import com.miniproject.palace.service.HeritageApiService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class PalaceController {

    private static final List<Palace> PALACES = List.of(
        new Palace(1, "경복궁", "Gyeongbokgung", 37.5796, 126.9770, "서울 종로구 사직로 161", "#C0392B"),
        new Palace(2, "창덕궁", "Changdeokgung",  37.5793, 126.9910, "서울 종로구 율곡로 99",  "#27AE60"),
        new Palace(3, "창경궁", "Changgyeonggung", 37.5793, 126.9946, "서울 종로구 창경궁로 185", "#2980B9"),
        new Palace(4, "덕수궁", "Deoksugung",      37.5657, 126.9752, "서울 중구 세종대로 99",   "#E67E22"),
        new Palace(5, "종묘",   "Jongmyo",          37.5750, 126.9940, "서울 종로구 종로 157",    "#8E44AD")
    );

    private final HeritageApiService heritageApiService;

    @Value("${kakao.maps.api.key}")
    private String kakaoApiKey;

    public PalaceController(HeritageApiService heritageApiService) {
        this.heritageApiService = heritageApiService;
    }

    @GetMapping("/")
    public String index(Model model) {
        model.addAttribute("palaces", PALACES);
        model.addAttribute("kakaoKey", kakaoApiKey);
        return "index";
    }

    @GetMapping("/api/palace/{gungNumber}")
    @ResponseBody
    public List<PalaceInfo> getPalaceInfo(@PathVariable int gungNumber) {
        return heritageApiService.getPalaceList(gungNumber);
    }
}
