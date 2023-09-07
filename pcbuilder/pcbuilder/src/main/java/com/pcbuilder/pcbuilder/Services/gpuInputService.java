package com.pcbuilder.pcbuilder.Services;

import com.pcbuilder.pcbuilder.Models.gpuModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class gpuInputService {

    @Autowired
    private com.pcbuilder.pcbuilder.Repositories.gpuInputRepo gpuInputRepo;

    public List<gpuModel> filterOutGpus(String resolution, String gpuDemand, String pcType){
        int neededPassMarkPoints = 0;
        int neededVram = 0;
        int maxMargin = 0;
        if(pcType.equals("Gaming") || pcType.equals("Casual")) {
            if (resolution.equals("1920x1080")) {
                //FULLHD
                switch (gpuDemand) {
                    case "Ultra" -> {
                        neededPassMarkPoints = 13000;
                        neededVram = 8;
                    }
                    case "High" -> {
                        neededPassMarkPoints = 10000;
                        neededVram = 6;
                    }
                    case "Medium" -> {
                        neededPassMarkPoints = 8000;
                        neededVram = 4;
                    }
                    case "Low" -> {
                        neededPassMarkPoints = 5000;
                        neededVram = 2;
                    }
                }
            } else if (resolution.equals("2560x1440")) {
                //QHD
                switch (gpuDemand) {
                    case "Ultra" -> {
                        neededPassMarkPoints = 20000;
                        neededVram = 12;
                    }
                    case "High" -> {
                        neededPassMarkPoints = 18000;
                        neededVram = 8;
                    }
                    case "Medium" -> {
                        neededPassMarkPoints = 16000;
                        neededVram = 8;
                    }
                    case "Low" -> {
                        neededPassMarkPoints = 14000;
                        neededVram = 6;
                    }
                }
            } else if(resolution.equals("3840x2160")) {
                switch (gpuDemand) {
                    //4K
                    case "Ultra" -> {
                        neededPassMarkPoints = 31000;
                        neededVram = 12;
                    }
                    case "High" -> {
                        neededPassMarkPoints = 28000;
                        neededVram = 12;
                    }
                    case "Medium" -> {
                        neededPassMarkPoints = 25000;
                        neededVram = 10;
                    }
                    case "Low" -> {
                        neededPassMarkPoints = 19000;
                        neededVram = 8;
                    }
                }
            }
        }
        else if(pcType.equals("Work")){
            neededPassMarkPoints = 20000; //Or higher
            neededVram = 12;
        }
        else if(pcType.equals("Office")){
            System.out.println("Office PC wont need GPU, only an integrated graphics card.");
        }
        else{
            System.out.println("Something went wrong with picking the PcType in Gpufiltering.");
        }
        if(pcType.equals("Casual")) maxMargin = neededPassMarkPoints + 5000;
        else if(pcType.equals("Work")) maxMargin = neededPassMarkPoints + 200000;
        else if(pcType.equals("Gaming")) maxMargin = neededPassMarkPoints + 10000;
        return gpuInputRepo.filterOutGpus(neededPassMarkPoints, maxMargin, neededVram);
    }
}
