package com.miniproject.palace.service;

import com.miniproject.palace.model.PalaceInfo;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.ByteArrayInputStream;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@Service
public class HeritageApiService {

    private static final String API_URL = "https://www.heritage.go.kr/heri/gungDetail/gogungListOpenApi.do";
    private final RestTemplate restTemplate = new RestTemplate();

    public List<PalaceInfo> getPalaceList(int gungNumber) {
        String url = API_URL + "?gung_number=" + gungNumber;
        String xmlResponse = restTemplate.getForObject(url, String.class);
        return parseXml(xmlResponse);
    }

    private List<PalaceInfo> parseXml(String xml) {
        List<PalaceInfo> result = new ArrayList<>();
        if (xml == null || xml.isBlank()) return result;

        try {
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            DocumentBuilder builder = factory.newDocumentBuilder();
            Document doc = builder.parse(new ByteArrayInputStream(xml.getBytes(StandardCharsets.UTF_8)));
            doc.getDocumentElement().normalize();

            NodeList lists = doc.getElementsByTagName("list");
            for (int i = 0; i < lists.getLength(); i++) {
                Element el = (Element) lists.item(i);
                PalaceInfo info = new PalaceInfo();
                info.setSerialNumber(getText(el, "serial_number"));
                info.setGungNumber(getText(el, "gung_number"));
                info.setDetailCode(getText(el, "detail_code"));
                info.setContentsKor(getText(el, "contents_kor"));
                info.setExplanationKor(getText(el, "explanation_kor"));
                info.setImgUrl(getText(el, "imgUrl"));
                info.setLink(getText(el, "link"));
                result.add(info);
            }
        } catch (Exception e) {
            throw new RuntimeException("Heritage API XML 파싱 실패: " + e.getMessage(), e);
        }

        return result;
    }

    private String getText(Element parent, String tagName) {
        NodeList nodes = parent.getElementsByTagName(tagName);
        if (nodes.getLength() == 0) return "";
        return nodes.item(0).getTextContent().trim();
    }
}
