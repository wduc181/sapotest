package com.sapotest.flashsale.dtos.requests;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PlaceOrderRequest {
    @NotNull(message = "userId can't be null")
    @JsonProperty("user_id")
    private Long userId;

    @NotNull(message = "productId can't be null")
    @JsonProperty("product_id")
    private Long productId;

    @NotNull(message = "quantity can't be null")
    @Min(value = 1, message = "quantity must be greater than 0")
    private Integer quantity;
}
