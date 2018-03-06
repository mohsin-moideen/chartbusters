package com.chartbusters.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.chartbusters.domain.Product_Attr;

import com.chartbusters.repository.Product_AttrRepository;
import com.chartbusters.repository.search.Product_AttrSearchRepository;
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
 * REST controller for managing Product_Attr.
 */
@RestController
@RequestMapping("/api")
public class Product_AttrResource {

    private final Logger log = LoggerFactory.getLogger(Product_AttrResource.class);

    private static final String ENTITY_NAME = "product_Attr";

    private final Product_AttrRepository product_AttrRepository;

    private final Product_AttrSearchRepository product_AttrSearchRepository;

    public Product_AttrResource(Product_AttrRepository product_AttrRepository, Product_AttrSearchRepository product_AttrSearchRepository) {
        this.product_AttrRepository = product_AttrRepository;
        this.product_AttrSearchRepository = product_AttrSearchRepository;
    }

    /**
     * POST  /product-attrs : Create a new product_Attr.
     *
     * @param product_Attr the product_Attr to create
     * @return the ResponseEntity with status 201 (Created) and with body the new product_Attr, or with status 400 (Bad Request) if the product_Attr has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/product-attrs")
    @Timed
    public ResponseEntity<Product_Attr> createProduct_Attr(@RequestBody Product_Attr product_Attr) throws URISyntaxException {
        log.debug("REST request to save Product_Attr : {}", product_Attr);
        if (product_Attr.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new product_Attr cannot already have an ID")).body(null);
        }
        Product_Attr result = product_AttrRepository.save(product_Attr);
        product_AttrSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/product-attrs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /product-attrs : Updates an existing product_Attr.
     *
     * @param product_Attr the product_Attr to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated product_Attr,
     * or with status 400 (Bad Request) if the product_Attr is not valid,
     * or with status 500 (Internal Server Error) if the product_Attr couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/product-attrs")
    @Timed
    public ResponseEntity<Product_Attr> updateProduct_Attr(@RequestBody Product_Attr product_Attr) throws URISyntaxException {
        log.debug("REST request to update Product_Attr : {}", product_Attr);
        if (product_Attr.getId() == null) {
            return createProduct_Attr(product_Attr);
        }
        Product_Attr result = product_AttrRepository.save(product_Attr);
        product_AttrSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, product_Attr.getId().toString()))
            .body(result);
    }

    /**
     * GET  /product-attrs : get all the product_Attrs.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of product_Attrs in body
     */
    @GetMapping("/product-attrs")
    @Timed
    public List<Product_Attr> getAllProduct_Attrs() {
        log.debug("REST request to get all Product_Attrs");
        return product_AttrRepository.findAll();
        }

    /**
     * GET  /product-attrs/:id : get the "id" product_Attr.
     *
     * @param id the id of the product_Attr to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the product_Attr, or with status 404 (Not Found)
     */
    @GetMapping("/product-attrs/{id}")
    @Timed
    public ResponseEntity<Product_Attr> getProduct_Attr(@PathVariable Long id) {
        log.debug("REST request to get Product_Attr : {}", id);
        Product_Attr product_Attr = product_AttrRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(product_Attr));
    }

    /**
     * DELETE  /product-attrs/:id : delete the "id" product_Attr.
     *
     * @param id the id of the product_Attr to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/product-attrs/{id}")
    @Timed
    public ResponseEntity<Void> deleteProduct_Attr(@PathVariable Long id) {
        log.debug("REST request to delete Product_Attr : {}", id);
        product_AttrRepository.delete(id);
        product_AttrSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/product-attrs?query=:query : search for the product_Attr corresponding
     * to the query.
     *
     * @param query the query of the product_Attr search
     * @return the result of the search
     */
    @GetMapping("/_search/product-attrs")
    @Timed
    public List<Product_Attr> searchProduct_Attrs(@RequestParam String query) {
        log.debug("REST request to search Product_Attrs for query {}", query);
        return StreamSupport
            .stream(product_AttrSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
