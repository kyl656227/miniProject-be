package com.miniproject.palace.model;

public class PalaceInfo {
    private String serialNumber;
    private String gungNumber;
    private String detailCode;
    private String contentsKor;
    private String explanationKor;
    private String imgUrl;
    private String link;

    public PalaceInfo() {}

    public String getSerialNumber() { return serialNumber; }
    public void setSerialNumber(String serialNumber) { this.serialNumber = serialNumber; }

    public String getGungNumber() { return gungNumber; }
    public void setGungNumber(String gungNumber) { this.gungNumber = gungNumber; }

    public String getDetailCode() { return detailCode; }
    public void setDetailCode(String detailCode) { this.detailCode = detailCode; }

    public String getContentsKor() { return contentsKor; }
    public void setContentsKor(String contentsKor) { this.contentsKor = contentsKor; }

    public String getExplanationKor() { return explanationKor; }
    public void setExplanationKor(String explanationKor) { this.explanationKor = explanationKor; }

    public String getImgUrl() { return imgUrl; }
    public void setImgUrl(String imgUrl) { this.imgUrl = imgUrl; }

    public String getLink() { return link; }
    public void setLink(String link) { this.link = link; }
}
