package com.sapotest.flashsale.services;

import com.sapotest.flashsale.dtos.requests.PlaceOrderRequest;
import com.sapotest.flashsale.dtos.responses.FlashSaleProductResponse;
import com.sapotest.flashsale.dtos.responses.PlaceOrderResponse;

import java.util.List;

public interface FlashSaleOrderService {
    List<FlashSaleProductResponse> getFlashSaleProducts();

    PlaceOrderResponse placeOrder(PlaceOrderRequest request);
}
