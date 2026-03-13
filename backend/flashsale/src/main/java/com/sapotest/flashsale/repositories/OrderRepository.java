package com.sapotest.flashsale.repositories;

import com.sapotest.flashsale.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface OrderRepository extends JpaRepository<Order, String> {
    @Query("select coalesce(sum(o.quantity), 0) from Order o where o.userId = :userId and o.productId = :productId")
    Integer sumOrderedQuantityByUserAndProduct(@Param("userId") Long userId,
                                               @Param("productId") Long productId);
}
