package com.chartbusters.repository;

import com.chartbusters.domain.Product_Attr;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Product_Attr entity.
 */
@SuppressWarnings("unused")
@Repository
public interface Product_AttrRepository extends JpaRepository<Product_Attr, Long> {

}
