package com.pcbuilder.pcbuilder.Controllers;

import com.pcbuilder.pcbuilder.Models.cpuModel;
import com.pcbuilder.pcbuilder.Models.gpuModel;
import com.pcbuilder.pcbuilder.Models.motherBoardModel;
import com.pcbuilder.pcbuilder.Services.cpuInputService;
import com.pcbuilder.pcbuilder.Services.gpuInputService;
import com.pcbuilder.pcbuilder.Services.motherBoardInputService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(allowedHeaders = "*",origins = "*")
public class mainControllers {
    @Autowired
    private cpuInputService cpuInputService;
    //This will be the first part of the flow where the controller calls the service.
    @Autowired
    private gpuInputService gpuInputService;

    @Autowired
    private motherBoardInputService motherBoardInputService;

    @GetMapping("/cpuInput")
    public List<cpuModel> filterOutCpu(@RequestParam(value = "pcType") String pcType, @RequestParam("amdOrIntel") boolean amdOrIntel,
                                       @RequestParam("cpuDemand") String cpuDemand){
        return cpuInputService.listOfCpus(pcType, cpuDemand, amdOrIntel);//pctype, graphicsdemand, amdorintel
    }
    @GetMapping("/gpuInput")
    public List<gpuModel> filterOutGpus(@RequestParam(value = "resolution") String resolution, @RequestParam("gpuDemand") String gpuDemand,
                                        @RequestParam("pcType") String pcType){
        return gpuInputService.filterOutGpus(resolution, gpuDemand, pcType);
    }
    @GetMapping("/motherBoardInput")
    public List<motherBoardModel> filterOutMotherBoards(@RequestParam(value = "socket") String socket, @RequestParam("pcie") String pcie){
        return motherBoardInputService.filterOutMotherBoards(socket, pcie);
    }
}
