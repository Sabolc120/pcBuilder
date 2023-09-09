package com.pcbuilder.pcbuilder.Services;


import com.pcbuilder.pcbuilder.Models.motherBoardModel;
import com.pcbuilder.pcbuilder.Repositories.motherBoardInputRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class motherBoardInputService {

    @Autowired
    private motherBoardInputRepo motherBoardInputRepo;

    public List<motherBoardModel> filterOutMotherBoards(String cpuSocket, String pcie, String pcType){
        if(pcType.equals("Office")){
            return motherBoardInputRepo.filterOfficeMotherBoards(cpuSocket);
        }
        else{
            return motherBoardInputRepo.filterMotherBoards(cpuSocket, pcie);
        }
    }
}
