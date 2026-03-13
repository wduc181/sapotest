package com.sapotest.flashsale.services;

import com.sapotest.flashsale.dtos.requests.PlaceOrderRequest;
import com.sapotest.flashsale.dtos.responses.FlashSaleProductResponse;
import com.sapotest.flashsale.dtos.responses.PlaceOrderResponse;
import com.sapotest.flashsale.entities.Order;
import com.sapotest.flashsale.entities.Product;
import com.sapotest.flashsale.exceptions.DataNotFoundException;
import com.sapotest.flashsale.exceptions.InvalidParamException;
import com.sapotest.flashsale.repositories.OrderRepository;
import com.sapotest.flashsale.repositories.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FlashSaleOrderServiceImpl implements FlashSaleOrderService {
    @Value("${app.order.max-quantity-per-user}")
    private int maxBuyQuantityPerUser;

    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;

        @Override
        @Transactional(readOnly = true)
        public List<FlashSaleProductResponse> getFlashSaleProducts() {
        return productRepository.findAll()
            .stream()
            .map(product -> FlashSaleProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .originalPrice(product.getPrice())
                .salePrice(product.getPrice())
                .remainingStock(product.getStock())
                .build())
            .toList();
        }

    @Override
    @Transactional
    public PlaceOrderResponse placeOrder(PlaceOrderRequest request) {
        Product product = productRepository.findByIdForUpdate(request.getProductId())
                .orElseThrow(() -> new DataNotFoundException("Product not found"));

        int orderedQuantity = orderRepository
                .sumOrderedQuantityByUserAndProduct(request.getUserId(), request.getProductId());

        int requestedQuantity = request.getQuantity();
        int totalAfterOrder = orderedQuantity + requestedQuantity;

        if (totalAfterOrder > maxBuyQuantityPerUser) {
            throw new InvalidParamException("Purchase limit exceeded: maximum " + maxBuyQuantityPerUser + " items per user");
        }

        if (product.getStock() < requestedQuantity) {
            throw new InvalidParamException("Insufficient stock");
        }

        product.setStock(product.getStock() - requestedQuantity);
        productRepository.save(product);

        LocalDateTime now = LocalDateTime.now();

        Order order = new Order();
        order.setId(UUID.randomUUID().toString());
        order.setUserId(request.getUserId());
        order.setProductId(request.getProductId());
        order.setQuantity(requestedQuantity);

        orderRepository.save(order);

        BigDecimal totalPrice = product.getPrice().multiply(BigDecimal.valueOf(requestedQuantity));

        return PlaceOrderResponse.builder()
                .orderId(order.getId())
                .userId(order.getUserId())
                .productId(order.getProductId())
                .productName(product.getName())
                .quantity(order.getQuantity())
                .unitPrice(product.getPrice())
                .totalPrice(totalPrice)
                .remainingStock(product.getStock())
                .createdAt(now)
                .build();
    }
}
