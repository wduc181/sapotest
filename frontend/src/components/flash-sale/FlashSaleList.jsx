import { useMemo, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AlertCircle, CheckCircle2, LoaderCircle, ShoppingCart } from 'lucide-react'
import { getFlashSaleProducts, placeFlashSaleOrder } from '../../services/flashSale.service'
import { cn } from '../../lib/cn'

const FLASH_SALE_PRODUCT_NAME = 'Sản phẩm flash sale'
const FLASH_SALE_ORIGINAL_PRICE = 1000000

function formatCurrency(value) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(value)
}

function FlashSaleList() {
  const [notice, setNotice] = useState({ type: '', message: '' })
  const [userId, setUserId] = useState(1)
  const [quantity, setQuantity] = useState(1)
  const queryClient = useQueryClient()

  const productsQuery = useQuery({
    queryKey: ['flash-sale-products'],
    queryFn: getFlashSaleProducts,
  })

  const buyNowMutation = useMutation({
    mutationFn: placeFlashSaleOrder,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['flash-sale-products'] })

      setNotice({
        type: 'success',
        message: response?.message || 'Đặt hàng thành công.',
      })
    },
    onError: (error) => {
      const fallback = 'Đặt hàng thất bại, vui lòng thử lại.'
      const backendMessage = error?.response?.data?.message
      setNotice({ type: 'error', message: backendMessage || fallback })
    },
  })

  const products = useMemo(() => productsQuery.data || [], [productsQuery.data])

  if (productsQuery.isLoading) {
    return (
      <div className="flex items-center gap-2 rounded-2xl border border-border bg-muted p-4 text-sm">
        <LoaderCircle className="h-4 w-4 animate-spin" />
        Đang tải danh sách sản phẩm...
      </div>
    )
  }

  if (productsQuery.isError) {
    return (
      <div className="rounded-2xl border border-destructive/20 bg-destructive/10 p-4 text-sm text-destructive">
        Không thể tải danh sách sản phẩm.
      </div>
    )
  }

  return (
    <section className="space-y-4">
      {notice.message ? (
        <div
          className={cn(
            'flex items-center gap-2 rounded-2xl border p-3 text-sm',
            notice.type === 'success'
              ? 'border-success/30 bg-success/10 text-success'
              : 'border-destructive/30 bg-destructive/10 text-destructive',
          )}
        >
          {notice.type === 'success' ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : (
            <AlertCircle className="h-4 w-4" />
          )}
          {notice.message}
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex items-center gap-3 rounded-xl border border-border bg-background p-2 text-sm shadow-card">
          <span className="font-medium text-foreground/80">User ID</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="h-8 w-8 rounded-lg border border-border text-base font-bold text-foreground transition hover:bg-muted"
              onClick={() => setUserId((prev) => Math.max(1, prev - 1))}
            >
              -
            </button>
            <span className="min-w-10 text-center font-semibold text-primary">{userId}</span>
            <button
              type="button"
              className="h-8 w-8 rounded-lg border border-border text-base font-bold text-foreground transition hover:bg-muted"
              onClick={() => setUserId((prev) => prev + 1)}
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {products.map((product) => (
          <article
            key={product.id}
            className="rounded-2xl border border-border bg-background p-4 shadow-card md:p-5"
          >
            <h3 className="text-base font-bold text-primary md:text-lg">
              {FLASH_SALE_PRODUCT_NAME}
            </h3>

            <div className="mt-3 space-y-1 text-sm">
              <p className="text-foreground/70">
                Giá gốc:{' '}
                <span className="line-through">{formatCurrency(FLASH_SALE_ORIGINAL_PRICE)}</span>
              </p>
              <p className="text-lg font-bold text-accent">Giá sale: {formatCurrency(product.salePrice)}</p>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 text-sm">
              <div className="flex items-center justify-between rounded-xl border border-border p-2">
                <span className="font-medium text-foreground/80">Số lượng mua</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="h-8 w-8 rounded-lg border border-border text-base font-bold text-foreground transition hover:bg-muted"
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  >
                    -
                  </button>
                  <span className="min-w-10 text-center font-semibold text-primary">{quantity}</span>
                  <button
                    type="button"
                    className="h-8 w-8 rounded-lg border border-border text-base font-bold text-foreground transition hover:bg-muted"
                    onClick={() => setQuantity((prev) => prev + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-background transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={buyNowMutation.isPending}
              onClick={() => {
                setNotice({ type: '', message: '' })
                buyNowMutation.mutate({
                  userId,
                  productId: product.id,
                  quantity,
                })
              }}
            >
              {buyNowMutation.isPending ? (
                <LoaderCircle className="h-4 w-4 animate-spin" />
              ) : (
                <ShoppingCart className="h-4 w-4" />
              )}
              Mua ngay
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}

export default FlashSaleList
