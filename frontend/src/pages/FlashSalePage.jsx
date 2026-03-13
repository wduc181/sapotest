import FlashSaleList from '../components/flash-sale/FlashSaleList'

function FlashSalePage() {
  return (
    <section className="space-y-2 grid grid-cols-1 gap-4 md:grid-cols-2">
      <h1 className="text-2xl font-black tracking-tight text-primary md:text-3xl">
        Danh sách sản phẩm Flash Sale
      </h1>
      <br />
      <FlashSaleList />
    </section>
  )
}

export default FlashSalePage
