package com.pcbuilder.pcbuilder.Repositories;

import com.pcbuilder.pcbuilder.Models.cpuModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface cpuInputRepo extends JpaRepository<cpuModel, Long> {

    //This will be the last part of the flow where the service calls the querry
    @Query(value = "SELECT * FROM cpu_model WHERE pass_mark_points BETWEEN :passMarkPoints AND :maxMargin AND amd_or_intel = :amdOrIntel", nativeQuery = true)
    List<cpuModel> filterOutCpu(@Param(value = "passMarkPoints") int passMarkPoints, @Param("amdOrIntel") boolean amdOrIntel, int maxMargin);

    @Query(value = "SELECT * FROM cpu_model WHERE pass_mark_points BETWEEN :passMarkPoints AND :maxMargin AND amd_or_intel = :amdOrIntel AND (cpu_name LIKE '%G' OR cpu_name  LIKE '%K' OR cpu_name  NOT LIKE '%F' AND cpu_name  NOT LIKE '%KF')", nativeQuery = true)
    List<cpuModel> filterIntegratedGpuCpu(@Param(value = "passMarkPoints") int passMarkPoints, @Param("amdOrIntel") boolean amdOrIntel, int maxMargin);

}
