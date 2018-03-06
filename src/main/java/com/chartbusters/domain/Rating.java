package com.chartbusters.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Rating.
 */
@Entity
@Table(name = "rating")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "rating")
public class Rating implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "rating_value")
    private Double ratingValue;

    @Column(name = "review_count")
    private Long reviewCount;

    @Column(name = "has_review")
    private Boolean hasReview;

    @OneToOne
    @JoinColumn(unique = true)
    private Review rating;

    @OneToMany(mappedBy = "rating")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<RatingAttr> ratings = new HashSet<>();

    @ManyToOne
    private User user;

    // jhipster-needle-entity-add-field - Jhipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getRatingValue() {
        return ratingValue;
    }

    public Rating ratingValue(Double ratingValue) {
        this.ratingValue = ratingValue;
        return this;
    }

    public void setRatingValue(Double ratingValue) {
        this.ratingValue = ratingValue;
    }

    public Long getReviewCount() {
        return reviewCount;
    }

    public Rating reviewCount(Long reviewCount) {
        this.reviewCount = reviewCount;
        return this;
    }

    public void setReviewCount(Long reviewCount) {
        this.reviewCount = reviewCount;
    }

    public Boolean isHasReview() {
        return hasReview;
    }

    public Rating hasReview(Boolean hasReview) {
        this.hasReview = hasReview;
        return this;
    }

    public void setHasReview(Boolean hasReview) {
        this.hasReview = hasReview;
    }

    public Review getRating() {
        return rating;
    }

    public Rating rating(Review review) {
        this.rating = review;
        return this;
    }

    public void setRating(Review review) {
        this.rating = review;
    }

    public Set<RatingAttr> getRatings() {
        return ratings;
    }

    public Rating ratings(Set<RatingAttr> ratingAttrs) {
        this.ratings = ratingAttrs;
        return this;
    }

    public Rating addRating(RatingAttr ratingAttr) {
        this.ratings.add(ratingAttr);
        ratingAttr.setRating(this);
        return this;
    }

    public Rating removeRating(RatingAttr ratingAttr) {
        this.ratings.remove(ratingAttr);
        ratingAttr.setRating(null);
        return this;
    }

    public void setRatings(Set<RatingAttr> ratingAttrs) {
        this.ratings = ratingAttrs;
    }

    public User getUser() {
        return user;
    }

    public Rating user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
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
        Rating rating = (Rating) o;
        if (rating.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), rating.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Rating{" +
            "id=" + getId() +
            ", ratingValue='" + getRatingValue() + "'" +
            ", reviewCount='" + getReviewCount() + "'" +
            ", hasReview='" + isHasReview() + "'" +
            "}";
    }
}
