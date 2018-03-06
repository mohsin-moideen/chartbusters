package com.chartbusters.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.chartbusters.domain.Objective;

import com.chartbusters.repository.ObjectiveRepository;
import com.chartbusters.repository.search.ObjectiveSearchRepository;
import com.chartbusters.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Objective.
 */
@RestController
@RequestMapping("/api")
public class ObjectiveResource {

    private final Logger log = LoggerFactory.getLogger(ObjectiveResource.class);

    private static final String ENTITY_NAME = "objective";

    private final ObjectiveRepository objectiveRepository;

    private final ObjectiveSearchRepository objectiveSearchRepository;

    public ObjectiveResource(ObjectiveRepository objectiveRepository, ObjectiveSearchRepository objectiveSearchRepository) {
        this.objectiveRepository = objectiveRepository;
        this.objectiveSearchRepository = objectiveSearchRepository;
    }

    /**
     * POST  /objectives : Create a new objective.
     *
     * @param objective the objective to create
     * @return the ResponseEntity with status 201 (Created) and with body the new objective, or with status 400 (Bad Request) if the objective has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/objectives")
    @Timed
    public ResponseEntity<Objective> createObjective(@RequestBody Objective objective) throws URISyntaxException {
        log.debug("REST request to save Objective : {}", objective);
        if (objective.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new objective cannot already have an ID")).body(null);
        }
        Objective result = objectiveRepository.save(objective);
        objectiveSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/objectives/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /objectives : Updates an existing objective.
     *
     * @param objective the objective to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated objective,
     * or with status 400 (Bad Request) if the objective is not valid,
     * or with status 500 (Internal Server Error) if the objective couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/objectives")
    @Timed
    public ResponseEntity<Objective> updateObjective(@RequestBody Objective objective) throws URISyntaxException {
        log.debug("REST request to update Objective : {}", objective);
        if (objective.getId() == null) {
            return createObjective(objective);
        }
        Objective result = objectiveRepository.save(objective);
        objectiveSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, objective.getId().toString()))
            .body(result);
    }

    /**
     * GET  /objectives : get all the objectives.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of objectives in body
     */
    @GetMapping("/objectives")
    @Timed
    public List<Objective> getAllObjectives() {
        log.debug("REST request to get all Objectives");
        return objectiveRepository.findAll();
        }

    /**
     * GET  /objectives/:id : get the "id" objective.
     *
     * @param id the id of the objective to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the objective, or with status 404 (Not Found)
     */
    @GetMapping("/objectives/{id}")
    @Timed
    public ResponseEntity<Objective> getObjective(@PathVariable Long id) {
        log.debug("REST request to get Objective : {}", id);
        Objective objective = objectiveRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(objective));
    }

    /**
     * DELETE  /objectives/:id : delete the "id" objective.
     *
     * @param id the id of the objective to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/objectives/{id}")
    @Timed
    public ResponseEntity<Void> deleteObjective(@PathVariable Long id) {
        log.debug("REST request to delete Objective : {}", id);
        objectiveRepository.delete(id);
        objectiveSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/objectives?query=:query : search for the objective corresponding
     * to the query.
     *
     * @param query the query of the objective search
     * @return the result of the search
     */
    @GetMapping("/_search/objectives")
    @Timed
    public List<Objective> searchObjectives(@RequestParam String query) {
        log.debug("REST request to search Objectives for query {}", query);
        return StreamSupport
            .stream(objectiveSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
