package com.chartbusters.repository.search;

import com.chartbusters.domain.Objective;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Objective entity.
 */
public interface ObjectiveSearchRepository extends ElasticsearchRepository<Objective, Long> {
}
