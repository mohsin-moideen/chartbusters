package com.chartbusters.web.rest;

import com.chartbusters.ChartbustersApp;

import com.chartbusters.domain.Product_Attr;
import com.chartbusters.repository.Product_AttrRepository;
import com.chartbusters.repository.search.Product_AttrSearchRepository;
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
 * Test class for the Product_AttrResource REST controller.
 *
 * @see Product_AttrResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ChartbustersApp.class)
public class Product_AttrResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_VALUE = "AAAAAAAAAA";
    private static final String UPDATED_VALUE = "BBBBBBBBBB";

    @Autowired
    private Product_AttrRepository product_AttrRepository;

    @Autowired
    private Product_AttrSearchRepository product_AttrSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restProduct_AttrMockMvc;

    private Product_Attr product_Attr;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final Product_AttrResource product_AttrResource = new Product_AttrResource(product_AttrRepository, product_AttrSearchRepository);
        this.restProduct_AttrMockMvc = MockMvcBuilders.standaloneSetup(product_AttrResource)
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
    public static Product_Attr createEntity(EntityManager em) {
        Product_Attr product_Attr = new Product_Attr()
            .name(DEFAULT_NAME)
            .value(DEFAULT_VALUE);
        return product_Attr;
    }

    @Before
    public void initTest() {
        product_AttrSearchRepository.deleteAll();
        product_Attr = createEntity(em);
    }

    @Test
    @Transactional
    public void createProduct_Attr() throws Exception {
        int databaseSizeBeforeCreate = product_AttrRepository.findAll().size();

        // Create the Product_Attr
        restProduct_AttrMockMvc.perform(post("/api/product-attrs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(product_Attr)))
            .andExpect(status().isCreated());

        // Validate the Product_Attr in the database
        List<Product_Attr> product_AttrList = product_AttrRepository.findAll();
        assertThat(product_AttrList).hasSize(databaseSizeBeforeCreate + 1);
        Product_Attr testProduct_Attr = product_AttrList.get(product_AttrList.size() - 1);
        assertThat(testProduct_Attr.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testProduct_Attr.getValue()).isEqualTo(DEFAULT_VALUE);

        // Validate the Product_Attr in Elasticsearch
        Product_Attr product_AttrEs = product_AttrSearchRepository.findOne(testProduct_Attr.getId());
        assertThat(product_AttrEs).isEqualToComparingFieldByField(testProduct_Attr);
    }

    @Test
    @Transactional
    public void createProduct_AttrWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = product_AttrRepository.findAll().size();

        // Create the Product_Attr with an existing ID
        product_Attr.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProduct_AttrMockMvc.perform(post("/api/product-attrs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(product_Attr)))
            .andExpect(status().isBadRequest());

        // Validate the Product_Attr in the database
        List<Product_Attr> product_AttrList = product_AttrRepository.findAll();
        assertThat(product_AttrList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllProduct_Attrs() throws Exception {
        // Initialize the database
        product_AttrRepository.saveAndFlush(product_Attr);

        // Get all the product_AttrList
        restProduct_AttrMockMvc.perform(get("/api/product-attrs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(product_Attr.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].value").value(hasItem(DEFAULT_VALUE.toString())));
    }

    @Test
    @Transactional
    public void getProduct_Attr() throws Exception {
        // Initialize the database
        product_AttrRepository.saveAndFlush(product_Attr);

        // Get the product_Attr
        restProduct_AttrMockMvc.perform(get("/api/product-attrs/{id}", product_Attr.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(product_Attr.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.value").value(DEFAULT_VALUE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingProduct_Attr() throws Exception {
        // Get the product_Attr
        restProduct_AttrMockMvc.perform(get("/api/product-attrs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProduct_Attr() throws Exception {
        // Initialize the database
        product_AttrRepository.saveAndFlush(product_Attr);
        product_AttrSearchRepository.save(product_Attr);
        int databaseSizeBeforeUpdate = product_AttrRepository.findAll().size();

        // Update the product_Attr
        Product_Attr updatedProduct_Attr = product_AttrRepository.findOne(product_Attr.getId());
        updatedProduct_Attr
            .name(UPDATED_NAME)
            .value(UPDATED_VALUE);

        restProduct_AttrMockMvc.perform(put("/api/product-attrs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedProduct_Attr)))
            .andExpect(status().isOk());

        // Validate the Product_Attr in the database
        List<Product_Attr> product_AttrList = product_AttrRepository.findAll();
        assertThat(product_AttrList).hasSize(databaseSizeBeforeUpdate);
        Product_Attr testProduct_Attr = product_AttrList.get(product_AttrList.size() - 1);
        assertThat(testProduct_Attr.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testProduct_Attr.getValue()).isEqualTo(UPDATED_VALUE);

        // Validate the Product_Attr in Elasticsearch
        Product_Attr product_AttrEs = product_AttrSearchRepository.findOne(testProduct_Attr.getId());
        assertThat(product_AttrEs).isEqualToComparingFieldByField(testProduct_Attr);
    }

    @Test
    @Transactional
    public void updateNonExistingProduct_Attr() throws Exception {
        int databaseSizeBeforeUpdate = product_AttrRepository.findAll().size();

        // Create the Product_Attr

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restProduct_AttrMockMvc.perform(put("/api/product-attrs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(product_Attr)))
            .andExpect(status().isCreated());

        // Validate the Product_Attr in the database
        List<Product_Attr> product_AttrList = product_AttrRepository.findAll();
        assertThat(product_AttrList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteProduct_Attr() throws Exception {
        // Initialize the database
        product_AttrRepository.saveAndFlush(product_Attr);
        product_AttrSearchRepository.save(product_Attr);
        int databaseSizeBeforeDelete = product_AttrRepository.findAll().size();

        // Get the product_Attr
        restProduct_AttrMockMvc.perform(delete("/api/product-attrs/{id}", product_Attr.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean product_AttrExistsInEs = product_AttrSearchRepository.exists(product_Attr.getId());
        assertThat(product_AttrExistsInEs).isFalse();

        // Validate the database is empty
        List<Product_Attr> product_AttrList = product_AttrRepository.findAll();
        assertThat(product_AttrList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchProduct_Attr() throws Exception {
        // Initialize the database
        product_AttrRepository.saveAndFlush(product_Attr);
        product_AttrSearchRepository.save(product_Attr);

        // Search the product_Attr
        restProduct_AttrMockMvc.perform(get("/api/_search/product-attrs?query=id:" + product_Attr.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(product_Attr.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].value").value(hasItem(DEFAULT_VALUE.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Product_Attr.class);
        Product_Attr product_Attr1 = new Product_Attr();
        product_Attr1.setId(1L);
        Product_Attr product_Attr2 = new Product_Attr();
        product_Attr2.setId(product_Attr1.getId());
        assertThat(product_Attr1).isEqualTo(product_Attr2);
        product_Attr2.setId(2L);
        assertThat(product_Attr1).isNotEqualTo(product_Attr2);
        product_Attr1.setId(null);
        assertThat(product_Attr1).isNotEqualTo(product_Attr2);
    }
}
