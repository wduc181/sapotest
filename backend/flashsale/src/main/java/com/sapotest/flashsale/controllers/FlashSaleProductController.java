package com.sapotest.flashsale.controllers;

import com.sapotest.flashsale.dtos.ApiResponse;
import com.sapotest.flashsale.dtos.requests.PlaceOrderRequest;
import com.sapotest.flashsale.dtos.responses.FlashSaleProductResponse;
import com.sapotest.flashsale.dtos.responses.PlaceOrderResponse;
import com.sapotest.flashsale.services.FlashSaleOrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
	@RequestMapping("/api/v1/flash-sale")
@RequiredArgsConstructor
public class FlashSaleProductController {
	private final FlashSaleOrderService flashSaleOrderService;

	@GetMapping("/products")
	public ResponseEntity<ApiResponse<List<FlashSaleProductResponse>>> getProducts() {
		List<FlashSaleProductResponse> products = flashSaleOrderService.getFlashSaleProducts();

		return ResponseEntity
				.ok(ApiResponse.success("Get flash sale products successfully", products));
	}

	@PostMapping("/orders")
	public ResponseEntity<ApiResponse<PlaceOrderResponse>> placeOrder(
			@Valid @RequestBody PlaceOrderRequest request
	) {
		PlaceOrderResponse result = flashSaleOrderService.placeOrder(request);

		return ResponseEntity
				.status(HttpStatus.CREATED)
				.body(ApiResponse.success("Order created successfully", result));
	}
}
