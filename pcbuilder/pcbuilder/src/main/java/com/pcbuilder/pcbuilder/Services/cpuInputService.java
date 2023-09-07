package com.pcbuilder.pcbuilder.Services;

import com.pcbuilder.pcbuilder.Models.cpuModel;
import com.pcbuilder.pcbuilder.Repositories.cpuInputRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class cpuInputService {
    @Autowired
    private cpuInputRepo cpuInputRepo;

    //We should be able to filter out the right CPUs, this will be the 2.nd part of the flow starting from the controller.
    public List<cpuModel> listOfCpus(String pcType, String cpuDemand, boolean amdOrIntel){
        int neededPassMarkPoint = 0;
        try{
            if(pcType.equals("Gamer")){
                if(cpuDemand.equals("Low")) neededPassMarkPoint = 8000;
                else if(cpuDemand.equals("Medium")) neededPassMarkPoint = 11000;
                else if(cpuDemand.equals("High")) neededPassMarkPoint = 13000;
                else if(cpuDemand.equals("Ultra")) neededPassMarkPoint = 17000;
                else{
                    System.out.println("Something went wrong with getting the needed String for CPU Points demand, in Gamer");
                }
            }
            else if(pcType.equals("Office")){
                neededPassMarkPoint = 2000;
                return cpuInputRepo.filterIntegratedGpuCpu(neededPassMarkPoint, amdOrIntel, neededPassMarkPoint + 3000);
            }
            else if(pcType.equals("Casual")){
                if(cpuDemand.equals("Low")) neededPassMarkPoint = 6000;
                else if(cpuDemand.equals("Medium")) neededPassMarkPoint = 9000;
                else if(cpuDemand.equals("High")) neededPassMarkPoint = 11000;
                else if(cpuDemand.equals("Ultra")) neededPassMarkPoint = 13000;
                else{
                    System.out.println("Something went wrong with getting the needed String for CPU Points demand, in Casual.");
                }
            }
            else if(pcType.equals("Work")){
                neededPassMarkPoint = 20000;
            }
        }
        catch(Exception e){
            System.out.println("Something went wrong with deciding the PC specs in CPU, cpuInputService, listOfCpus function.");
        }
        int maxMargin = 0;
        if(pcType.equals("Gamer") || pcType.equals("Office") || pcType.equals("Casual")) maxMargin = neededPassMarkPoint + 4000;
        else maxMargin = neededPassMarkPoint + 50000;

        return cpuInputRepo.filterOutCpu(neededPassMarkPoint, amdOrIntel, maxMargin);
    }
}
