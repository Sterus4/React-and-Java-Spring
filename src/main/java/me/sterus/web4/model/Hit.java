package me.sterus.web4.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "hits")
@NoArgsConstructor
@Data
public class Hit {

    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Double x;

    @Column(nullable = false)
    private Double y;
    @Column(nullable = false)
    private Double r;

    @Column(nullable = false)
    private Boolean isHit;

    @Column(nullable = false)
    private String date;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public Hit(Double x, Double y, Double r, Boolean isHit, String date, User user) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.isHit = isHit;
        this.date = date;
        this.user = user;
    }
}
