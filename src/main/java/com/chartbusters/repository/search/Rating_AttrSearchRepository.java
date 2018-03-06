package com.chartbusters.repository.search;

import com.chartbusters.domain.Rating_Attr;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Rating_Attr entity.
 */
public interface Rating_AttrSearchRepository extends ElasticsearchRepository<Rating_Attr, Long> {
}
