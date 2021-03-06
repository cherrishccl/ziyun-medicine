package com.oxchains.pharmacy.domain;

import lombok.Data;

import javax.persistence.*;

/**
 * @author aiet
 */
@Entity
@Data
public class FabricToken {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(length = 512)
  private String token;

  @OneToOne
  @JoinColumn(name = "user")
  private User user;

}
