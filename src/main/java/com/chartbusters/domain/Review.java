package com.chartbusters.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A Review.
 */
@Entity
@Table(name = "review")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "review")
public class Review implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "author")
    private String author;

    @Column(name = "title")
    private String title;

    @Column(name = "date_published")
    private Instant datePublished;

    @Column(name = "review_body")
    private String reviewBody;

    // jhipster-needle-entity-add-field - Jhipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAuthor() {
        return author;
    }

    public Review author(String author) {
        this.author = author;
        return this;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getTitle() {
        return title;
    }

    public Review title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Instant getDatePublished() {
        return datePublished;
    }

    public Review datePublished(Instant datePublished) {
        this.datePublished = datePublished;
        return this;
    }

    public void setDatePublished(Instant datePublished) {
        this.datePublished = datePublished;
    }

    public String getReviewBody() {
        return reviewBody;
    }

    public Review reviewBody(String reviewBody) {
        this.reviewBody = reviewBody;
        return this;
    }

    public void setReviewBody(String reviewBody) {
        this.reviewBody = reviewBody;
    }
    // jhipster-needle-entity-add-getters-setters - Jhipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Review review = (Review) o;
        if (review.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), review.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Review{" +
            "id=" + getId() +
            ", author='" + getAuthor() + "'" +
            ", title='" + getTitle() + "'" +
            ", datePublished='" + getDatePublished() + "'" +
            ", reviewBody='" + getReviewBody() + "'" +
            "}";
    }
}
