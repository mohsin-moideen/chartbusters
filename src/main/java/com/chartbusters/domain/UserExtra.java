package com.chartbusters.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A UserExtra.
 */
@Entity
@Table(name = "user_extra")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "userextra")
public class UserExtra implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "points")
    private Long points;

    @Column(name = "jhi_level")
    private Long level;

    @Column(name = "number_of_ratings")
    private Long numberOfRatings;

    @Column(name = "number_of_reviews")
    private Long numberOfReviews;

    // jhipster-needle-entity-add-field - Jhipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPoints() {
        return points;
    }

    public UserExtra points(Long points) {
        this.points = points;
        return this;
    }

    public void setPoints(Long points) {
        this.points = points;
    }

    public Long getLevel() {
        return level;
    }

    public UserExtra level(Long level) {
        this.level = level;
        return this;
    }

    public void setLevel(Long level) {
        this.level = level;
    }

    public Long getNumberOfRatings() {
        return numberOfRatings;
    }

    public UserExtra numberOfRatings(Long numberOfRatings) {
        this.numberOfRatings = numberOfRatings;
        return this;
    }

    public void setNumberOfRatings(Long numberOfRatings) {
        this.numberOfRatings = numberOfRatings;
    }

    public Long getNumberOfReviews() {
        return numberOfReviews;
    }

    public UserExtra numberOfReviews(Long numberOfReviews) {
        this.numberOfReviews = numberOfReviews;
        return this;
    }

    public void setNumberOfReviews(Long numberOfReviews) {
        this.numberOfReviews = numberOfReviews;
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
        UserExtra userExtra = (UserExtra) o;
        if (userExtra.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), userExtra.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UserExtra{" +
            "id=" + getId() +
            ", points='" + getPoints() + "'" +
            ", level='" + getLevel() + "'" +
            ", numberOfRatings='" + getNumberOfRatings() + "'" +
            ", numberOfReviews='" + getNumberOfReviews() + "'" +
            "}";
    }
}
