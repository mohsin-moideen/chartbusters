package com.chartbusters.repository.search;

import com.chartbusters.domain.Product_Attr;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Product_Attr entity.
 */
public interface Product_AttrSearchRepository extends ElasticsearchRepository<Product_Attr, Long> {
}
