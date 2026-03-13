import axiosClient from './axiosClient'

export async function getFlashSaleProducts() {
  const response = await axiosClient.get('/flash-sale/products')
  return response.data?.data || []
}

export async function placeFlashSaleOrder({ userId, productId, quantity }) {
  const payload = {
    user_id: userId,
    product_id: productId,
    quantity,
  }

  const response = await axiosClient.post('/flash-sale/orders', payload)
  return response.data
}
