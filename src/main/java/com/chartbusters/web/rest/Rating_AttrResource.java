package com.chartbusters.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.chartbusters.domain.Rating_Attr;

import com.chartbusters.repository.Rating_AttrRepository;
import com.chartbusters.repository.search.Rating_AttrSearchRepository;
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
 * REST controller for managing Rating_Attr.
 */
@RestController
@RequestMapping("/api")
public class Rating_AttrResource {

    private final Logger log = LoggerFactory.getLogger(Rating_AttrResource.class);

    private static final String ENTITY_NAME = "rating_Attr";

    private final Rating_AttrRepository rating_AttrRepository;

    private final Rating_AttrSearchRepository rating_AttrSearchRepository;

    public Rating_AttrResource(Rating_AttrRepository rating_AttrRepository, Rating_AttrSearchRepository rating_AttrSearchRepository) {
        this.rating_AttrRepository = rating_AttrRepository;
        this.rating_AttrSearchRepository = rating_AttrSearchRepository;
    }

    /**
     * POST  /rating-attrs : Create a new rating_Attr.
     *
     * @param rating_Attr the rating_Attr to create
     * @return the ResponseEntity with status 201 (Created) and with body the new rating_Attr, or with status 400 (Bad Request) if the rating_Attr has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/rating-attrs")
    @Timed
    public ResponseEntity<Rating_Attr> createRating_Attr(@RequestBody Rating_Attr rating_Attr) throws URISyntaxException {
        log.debug("REST request to save Rating_Attr : {}", rating_Attr);
        if (rating_Attr.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new rating_Attr cannot already have an ID")).body(null);
        }
        Rating_Attr result = rating_AttrRepository.save(rating_Attr);
        rating_AttrSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/rating-attrs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /rating-attrs : Updates an existing rating_Attr.
     *
     * @param rating_Attr the rating_Attr to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated rating_Attr,
     * or with status 400 (Bad Request) if the rating_Attr is not valid,
     * or with status 500 (Internal Server Error) if the rating_Attr couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/rating-attrs")
    @Timed
    public ResponseEntity<Rating_Attr> updateRating_Attr(@RequestBody Rating_Attr rating_Attr) throws URISyntaxException {
        log.debug("REST request to update Rating_Attr : {}", rating_Attr);
        if (rating_Attr.getId() == null) {
            return createRating_Attr(rating_Attr);
        }
        Rating_Attr result = rating_AttrRepository.save(rating_Attr);
        rating_AttrSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, rating_Attr.getId().toString()))
            .body(result);
    }

    /**
     * GET  /rating-attrs : get all the rating_Attrs.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of rating_Attrs in body
     */
    @GetMapping("/rating-attrs")
    @Timed
    public List<Rating_Attr> getAllRating_Attrs() {
        log.debug("REST request to get all Rating_Attrs");
        return rating_AttrRepository.findAll();
        }

    /**
     * GET  /rating-attrs/:id : get the "id" rating_Attr.
     *
     * @param id the id of the rating_Attr to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the rating_Attr, or with status 404 (Not Found)
     */
    @GetMapping("/rating-attrs/{id}")
    @Timed
    public ResponseEntity<Rating_Attr> getRating_Attr(@PathVariable Long id) {
        log.debug("REST request to get Rating_Attr : {}", id);
        Rating_Attr rating_Attr = rating_AttrRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(rating_Attr));
    }

    /**
     * DELETE  /rating-attrs/:id : delete the "id" rating_Attr.
     *
     * @param id the id of the rating_Attr to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/rating-attrs/{id}")
    @Timed
    public ResponseEntity<Void> deleteRating_Attr(@PathVariable Long id) {
        log.debug("REST request to delete Rating_Attr : {}", id);
        rating_AttrRepository.delete(id);
        rating_AttrSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/rating-attrs?query=:query : search for the rating_Attr corresponding
     * to the query.
     *
     * @param query the query of the rating_Attr search
     * @return the result of the search
     */
    @GetMapping("/_search/rating-attrs")
    @Timed
    public List<Rating_Attr> searchRating_Attrs(@RequestParam String query) {
        log.debug("REST request to search Rating_Attrs for query {}", query);
        return StreamSupport
            .stream(rating_AttrSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
