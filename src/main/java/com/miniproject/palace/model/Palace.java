package com.miniproject.palace.model;

public class Palace {
    private final int id;
    private final String name;
    private final String nameEn;
    private final double lat;
    private final double lng;
    private final String address;
    private final String color;

    public Palace(int id, String name, String nameEn, double lat, double lng, String address, String color) {
        this.id = id;
        this.name = name;
        this.nameEn = nameEn;
        this.lat = lat;
        this.lng = lng;
        this.address = address;
        this.color = color;
    }

    public int getId() { return id; }
    public String getName() { return name; }
    public String getNameEn() { return nameEn; }
    public double getLat() { return lat; }
    public double getLng() { return lng; }
    public String getAddress() { return address; }
    public String getColor() { return color; }
}
