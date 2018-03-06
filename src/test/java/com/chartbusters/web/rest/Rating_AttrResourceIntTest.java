package com.chartbusters.web.rest;

import com.chartbusters.ChartbustersApp;

import com.chartbusters.domain.Rating_Attr;
import com.chartbusters.repository.Rating_AttrRepository;
import com.chartbusters.repository.search.Rating_AttrSearchRepository;
import com.chartbusters.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the Rating_AttrResource REST controller.
 *
 * @see Rating_AttrResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ChartbustersApp.class)
public class Rating_AttrResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_VALUE = "AAAAAAAAAA";
    private static final String UPDATED_VALUE = "BBBBBBBBBB";

    @Autowired
    private Rating_AttrRepository rating_AttrRepository;

    @Autowired
    private Rating_AttrSearchRepository rating_AttrSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restRating_AttrMockMvc;

    private Rating_Attr rating_Attr;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final Rating_AttrResource rating_AttrResource = new Rating_AttrResource(rating_AttrRepository, rating_AttrSearchRepository);
        this.restRating_AttrMockMvc = MockMvcBuilders.standaloneSetup(rating_AttrResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Rating_Attr createEntity(EntityManager em) {
        Rating_Attr rating_Attr = new Rating_Attr()
            .name(DEFAULT_NAME)
            .value(DEFAULT_VALUE);
        return rating_Attr;
    }

    @Before
    public void initTest() {
        rating_AttrSearchRepository.deleteAll();
        rating_Attr = createEntity(em);
    }

    @Test
    @Transactional
    public void createRating_Attr() throws Exception {
        int databaseSizeBeforeCreate = rating_AttrRepository.findAll().size();

        // Create the Rating_Attr
        restRating_AttrMockMvc.perform(post("/api/rating-attrs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rating_Attr)))
            .andExpect(status().isCreated());

        // Validate the Rating_Attr in the database
        List<Rating_Attr> rating_AttrList = rating_AttrRepository.findAll();
        assertThat(rating_AttrList).hasSize(databaseSizeBeforeCreate + 1);
        Rating_Attr testRating_Attr = rating_AttrList.get(rating_AttrList.size() - 1);
        assertThat(testRating_Attr.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testRating_Attr.getValue()).isEqualTo(DEFAULT_VALUE);

        // Validate the Rating_Attr in Elasticsearch
        Rating_Attr rating_AttrEs = rating_AttrSearchRepository.findOne(testRating_Attr.getId());
        assertThat(rating_AttrEs).isEqualToComparingFieldByField(testRating_Attr);
    }

    @Test
    @Transactional
    public void createRating_AttrWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = rating_AttrRepository.findAll().size();

        // Create the Rating_Attr with an existing ID
        rating_Attr.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRating_AttrMockMvc.perform(post("/api/rating-attrs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rating_Attr)))
            .andExpect(status().isBadRequest());

        // Validate the Rating_Attr in the database
        List<Rating_Attr> rating_AttrList = rating_AttrRepository.findAll();
        assertThat(rating_AttrList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllRating_Attrs() throws Exception {
        // Initialize the database
        rating_AttrRepository.saveAndFlush(rating_Attr);

        // Get all the rating_AttrList
        restRating_AttrMockMvc.perform(get("/api/rating-attrs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(rating_Attr.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].value").value(hasItem(DEFAULT_VALUE.toString())));
    }

    @Test
    @Transactional
    public void getRating_Attr() throws Exception {
        // Initialize the database
        rating_AttrRepository.saveAndFlush(rating_Attr);

        // Get the rating_Attr
        restRating_AttrMockMvc.perform(get("/api/rating-attrs/{id}", rating_Attr.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(rating_Attr.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.value").value(DEFAULT_VALUE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingRating_Attr() throws Exception {
        // Get the rating_Attr
        restRating_AttrMockMvc.perform(get("/api/rating-attrs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRating_Attr() throws Exception {
        // Initialize the database
        rating_AttrRepository.saveAndFlush(rating_Attr);
        rating_AttrSearchRepository.save(rating_Attr);
        int databaseSizeBeforeUpdate = rating_AttrRepository.findAll().size();

        // Update the rating_Attr
        Rating_Attr updatedRating_Attr = rating_AttrRepository.findOne(rating_Attr.getId());
        updatedRating_Attr
            .name(UPDATED_NAME)
            .value(UPDATED_VALUE);

        restRating_AttrMockMvc.perform(put("/api/rating-attrs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRating_Attr)))
            .andExpect(status().isOk());

        // Validate the Rating_Attr in the database
        List<Rating_Attr> rating_AttrList = rating_AttrRepository.findAll();
        assertThat(rating_AttrList).hasSize(databaseSizeBeforeUpdate);
        Rating_Attr testRating_Attr = rating_AttrList.get(rating_AttrList.size() - 1);
        assertThat(testRating_Attr.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testRating_Attr.getValue()).isEqualTo(UPDATED_VALUE);

        // Validate the Rating_Attr in Elasticsearch
        Rating_Attr rating_AttrEs = rating_AttrSearchRepository.findOne(testRating_Attr.getId());
        assertThat(rating_AttrEs).isEqualToComparingFieldByField(testRating_Attr);
    }

    @Test
    @Transactional
    public void updateNonExistingRating_Attr() throws Exception {
        int databaseSizeBeforeUpdate = rating_AttrRepository.findAll().size();

        // Create the Rating_Attr

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restRating_AttrMockMvc.perform(put("/api/rating-attrs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rating_Attr)))
            .andExpect(status().isCreated());

        // Validate the Rating_Attr in the database
        List<Rating_Attr> rating_AttrList = rating_AttrRepository.findAll();
        assertThat(rating_AttrList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteRating_Attr() throws Exception {
        // Initialize the database
        rating_AttrRepository.saveAndFlush(rating_Attr);
        rating_AttrSearchRepository.save(rating_Attr);
        int databaseSizeBeforeDelete = rating_AttrRepository.findAll().size();

        // Get the rating_Attr
        restRating_AttrMockMvc.perform(delete("/api/rating-attrs/{id}", rating_Attr.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean rating_AttrExistsInEs = rating_AttrSearchRepository.exists(rating_Attr.getId());
        assertThat(rating_AttrExistsInEs).isFalse();

        // Validate the database is empty
        List<Rating_Attr> rating_AttrList = rating_AttrRepository.findAll();
        assertThat(rating_AttrList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchRating_Attr() throws Exception {
        // Initialize the database
        rating_AttrRepository.saveAndFlush(rating_Attr);
        rating_AttrSearchRepository.save(rating_Attr);

        // Search the rating_Attr
        restRating_AttrMockMvc.perform(get("/api/_search/rating-attrs?query=id:" + rating_Attr.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(rating_Attr.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].value").value(hasItem(DEFAULT_VALUE.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Rating_Attr.class);
        Rating_Attr rating_Attr1 = new Rating_Attr();
        rating_Attr1.setId(1L);
        Rating_Attr rating_Attr2 = new Rating_Attr();
        rating_Attr2.setId(rating_Attr1.getId());
        assertThat(rating_Attr1).isEqualTo(rating_Attr2);
        rating_Attr2.setId(2L);
        assertThat(rating_Attr1).isNotEqualTo(rating_Attr2);
        rating_Attr1.setId(null);
        assertThat(rating_Attr1).isNotEqualTo(rating_Attr2);
    }
}
