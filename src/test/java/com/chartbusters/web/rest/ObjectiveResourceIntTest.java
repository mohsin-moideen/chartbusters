package com.chartbusters.web.rest;

import com.chartbusters.ChartbustersApp;

import com.chartbusters.domain.Objective;
import com.chartbusters.repository.ObjectiveRepository;
import com.chartbusters.repository.search.ObjectiveSearchRepository;
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
 * Test class for the ObjectiveResource REST controller.
 *
 * @see ObjectiveResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ChartbustersApp.class)
public class ObjectiveResourceIntTest {

    private static final Long DEFAULT_POINTS = 1L;
    private static final Long UPDATED_POINTS = 2L;

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Boolean DEFAULT_COMPLETED = false;
    private static final Boolean UPDATED_COMPLETED = true;

    @Autowired
    private ObjectiveRepository objectiveRepository;

    @Autowired
    private ObjectiveSearchRepository objectiveSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restObjectiveMockMvc;

    private Objective objective;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ObjectiveResource objectiveResource = new ObjectiveResource(objectiveRepository, objectiveSearchRepository);
        this.restObjectiveMockMvc = MockMvcBuilders.standaloneSetup(objectiveResource)
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
    public static Objective createEntity(EntityManager em) {
        Objective objective = new Objective()
            .points(DEFAULT_POINTS)
            .description(DEFAULT_DESCRIPTION)
            .completed(DEFAULT_COMPLETED);
        return objective;
    }

    @Before
    public void initTest() {
        objectiveSearchRepository.deleteAll();
        objective = createEntity(em);
    }

    @Test
    @Transactional
    public void createObjective() throws Exception {
        int databaseSizeBeforeCreate = objectiveRepository.findAll().size();

        // Create the Objective
        restObjectiveMockMvc.perform(post("/api/objectives")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(objective)))
            .andExpect(status().isCreated());

        // Validate the Objective in the database
        List<Objective> objectiveList = objectiveRepository.findAll();
        assertThat(objectiveList).hasSize(databaseSizeBeforeCreate + 1);
        Objective testObjective = objectiveList.get(objectiveList.size() - 1);
        assertThat(testObjective.getPoints()).isEqualTo(DEFAULT_POINTS);
        assertThat(testObjective.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testObjective.isCompleted()).isEqualTo(DEFAULT_COMPLETED);

        // Validate the Objective in Elasticsearch
        Objective objectiveEs = objectiveSearchRepository.findOne(testObjective.getId());
        assertThat(objectiveEs).isEqualToComparingFieldByField(testObjective);
    }

    @Test
    @Transactional
    public void createObjectiveWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = objectiveRepository.findAll().size();

        // Create the Objective with an existing ID
        objective.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restObjectiveMockMvc.perform(post("/api/objectives")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(objective)))
            .andExpect(status().isBadRequest());

        // Validate the Objective in the database
        List<Objective> objectiveList = objectiveRepository.findAll();
        assertThat(objectiveList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllObjectives() throws Exception {
        // Initialize the database
        objectiveRepository.saveAndFlush(objective);

        // Get all the objectiveList
        restObjectiveMockMvc.perform(get("/api/objectives?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(objective.getId().intValue())))
            .andExpect(jsonPath("$.[*].points").value(hasItem(DEFAULT_POINTS.intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].completed").value(hasItem(DEFAULT_COMPLETED.booleanValue())));
    }

    @Test
    @Transactional
    public void getObjective() throws Exception {
        // Initialize the database
        objectiveRepository.saveAndFlush(objective);

        // Get the objective
        restObjectiveMockMvc.perform(get("/api/objectives/{id}", objective.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(objective.getId().intValue()))
            .andExpect(jsonPath("$.points").value(DEFAULT_POINTS.intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.completed").value(DEFAULT_COMPLETED.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingObjective() throws Exception {
        // Get the objective
        restObjectiveMockMvc.perform(get("/api/objectives/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateObjective() throws Exception {
        // Initialize the database
        objectiveRepository.saveAndFlush(objective);
        objectiveSearchRepository.save(objective);
        int databaseSizeBeforeUpdate = objectiveRepository.findAll().size();

        // Update the objective
        Objective updatedObjective = objectiveRepository.findOne(objective.getId());
        updatedObjective
            .points(UPDATED_POINTS)
            .description(UPDATED_DESCRIPTION)
            .completed(UPDATED_COMPLETED);

        restObjectiveMockMvc.perform(put("/api/objectives")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedObjective)))
            .andExpect(status().isOk());

        // Validate the Objective in the database
        List<Objective> objectiveList = objectiveRepository.findAll();
        assertThat(objectiveList).hasSize(databaseSizeBeforeUpdate);
        Objective testObjective = objectiveList.get(objectiveList.size() - 1);
        assertThat(testObjective.getPoints()).isEqualTo(UPDATED_POINTS);
        assertThat(testObjective.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testObjective.isCompleted()).isEqualTo(UPDATED_COMPLETED);

        // Validate the Objective in Elasticsearch
        Objective objectiveEs = objectiveSearchRepository.findOne(testObjective.getId());
        assertThat(objectiveEs).isEqualToComparingFieldByField(testObjective);
    }

    @Test
    @Transactional
    public void updateNonExistingObjective() throws Exception {
        int databaseSizeBeforeUpdate = objectiveRepository.findAll().size();

        // Create the Objective

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restObjectiveMockMvc.perform(put("/api/objectives")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(objective)))
            .andExpect(status().isCreated());

        // Validate the Objective in the database
        List<Objective> objectiveList = objectiveRepository.findAll();
        assertThat(objectiveList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteObjective() throws Exception {
        // Initialize the database
        objectiveRepository.saveAndFlush(objective);
        objectiveSearchRepository.save(objective);
        int databaseSizeBeforeDelete = objectiveRepository.findAll().size();

        // Get the objective
        restObjectiveMockMvc.perform(delete("/api/objectives/{id}", objective.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean objectiveExistsInEs = objectiveSearchRepository.exists(objective.getId());
        assertThat(objectiveExistsInEs).isFalse();

        // Validate the database is empty
        List<Objective> objectiveList = objectiveRepository.findAll();
        assertThat(objectiveList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchObjective() throws Exception {
        // Initialize the database
        objectiveRepository.saveAndFlush(objective);
        objectiveSearchRepository.save(objective);

        // Search the objective
        restObjectiveMockMvc.perform(get("/api/_search/objectives?query=id:" + objective.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(objective.getId().intValue())))
            .andExpect(jsonPath("$.[*].points").value(hasItem(DEFAULT_POINTS.intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].completed").value(hasItem(DEFAULT_COMPLETED.booleanValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Objective.class);
        Objective objective1 = new Objective();
        objective1.setId(1L);
        Objective objective2 = new Objective();
        objective2.setId(objective1.getId());
        assertThat(objective1).isEqualTo(objective2);
        objective2.setId(2L);
        assertThat(objective1).isNotEqualTo(objective2);
        objective1.setId(null);
        assertThat(objective1).isNotEqualTo(objective2);
    }
}
