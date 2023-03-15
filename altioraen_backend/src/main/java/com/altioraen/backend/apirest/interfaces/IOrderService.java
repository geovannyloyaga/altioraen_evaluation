package com.altioraen.backend.apirest.interfaces;

import com.altioraen.backend.apirest.dto.OrderDto;
import com.altioraen.backend.apirest.dto.ResponseDto;
import com.altioraen.backend.apirest.dto.ResponseListDto;
import com.altioraen.backend.apirest.entities.Order;

public interface IOrderService {

	public ResponseDto<Order> save(Order order);
	
	public ResponseDto<Order> update(Order order);
	
	public ResponseListDto<Order> getOrderList();
	
	public ResponseListDto<OrderDto> getOrderListByClientId(Long clientId);
}
