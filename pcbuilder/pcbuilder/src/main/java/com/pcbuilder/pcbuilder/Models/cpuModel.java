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
public class cpuModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long identifierCpu;

    private Integer cores;

    private String manuFacTech;

    private String cpuName;

    private Integer tdp;

    private Integer releaseDate;

    private Boolean amdOrIntel;

    private String platform;

    private Integer passMarkPoints;

    private Integer cpuPriceUSD;

}
