package com.pcbuilder.pcbuilder.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class gpuModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long gpuIdentifier;

    private String gpuName;

    private int vram;

    private int consumption;

    private int releaseDate;

    private int passmarkScore;

    private String PCIE;

    private int price;
}
