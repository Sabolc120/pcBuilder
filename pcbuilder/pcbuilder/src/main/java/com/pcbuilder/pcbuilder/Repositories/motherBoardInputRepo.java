package com.pcbuilder.pcbuilder.Repositories;

import com.pcbuilder.pcbuilder.Models.motherBoardModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface motherBoardInputRepo extends JpaRepository<motherBoardModel, Long> {

    @Query(value = "SELECT * FROM mother_board_model " +
            "WHERE socket = :socket " +
            "AND ( " +
            "(pcie = :pcie) " +
            "OR (pcie LIKE '3.0%' AND :pcie LIKE '4.0%') " +
            "OR (:pcie LIKE '%8x' AND pcie LIKE '%16x') " +
            "OR (pcie LIKE '%8x' AND :pcie LIKE '%16x') " +
            ")",
            nativeQuery = true)
    List<motherBoardModel> filterMotherBoards(@Param(value="socket") String socket,
                                              @Param(value = "pcie") String pcie);

    @Query(value = "SELECT * FROM mother_board_model WHERE socket = :socket", nativeQuery = true)
    List<motherBoardModel> filterOfficeMotherBoards(@Param(value="socket") String socket);


}
