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
public class motherBoardModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long motherBoardId;

    private String motherBoardName;

    private int price;

    private String socket;

    private String generation;

    private String pcie;

}
