package com.pcbuilder.pcbuilder.Repositories;

import com.pcbuilder.pcbuilder.Models.gpuModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface gpuInputRepo extends JpaRepository<gpuModel, Long> {

    @Query(value = "SELECT * FROM gpu_model WHERE passmark_score BETWEEN :passMarkPoints AND :maxMargin AND vram >= :vram", nativeQuery = true)
    List<gpuModel> filterOutGpus(@Param(value="passMarkPoints") int passMarkPoints, @Param("maxMargin") int maxMargin,
                                 @Param(value="vram") int vram);
}
