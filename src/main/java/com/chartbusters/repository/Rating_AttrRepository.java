package com.chartbusters.repository;

import com.chartbusters.domain.Rating_Attr;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Rating_Attr entity.
 */
@SuppressWarnings("unused")
@Repository
public interface Rating_AttrRepository extends JpaRepository<Rating_Attr, Long> {

}
