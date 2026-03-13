package com.sapotest.flashsale.dtos.responses;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Builder
public class PlaceOrderResponse {
    private final String orderId;
    private final Long userId;
    private final Long productId;
    private final String productName;
    private final Integer quantity;
    private final BigDecimal unitPrice;
    private final BigDecimal totalPrice;
    private final Integer remainingStock;
    private final LocalDateTime createdAt;
}
