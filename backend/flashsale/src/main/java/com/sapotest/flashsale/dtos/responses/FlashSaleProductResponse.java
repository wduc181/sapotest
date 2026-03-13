package com.sapotest.flashsale.dtos.responses;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
@Builder
public class FlashSaleProductResponse {
    private final Long id;
    private final String name;
    private final BigDecimal originalPrice;
    private final BigDecimal salePrice;
    private final Integer remainingStock;
}
