## 1. Bài test Sapo Internship program

## 2. Cấu trúc thư mục

```text
sapotest/
├── backend/
│   └── flashsale/
│       └── src/main/java/com/sapotest/flashsale/
│           ├── controllers/
│           │   └── FlashSaleProductController.java
│           ├── services/
│           │   ├── FlashSaleOrderService.java
│           │   └── FlashSaleOrderServiceImpl.java
│           ├── repositories/
│           │   └── ProductRepository.java
│           └── ...
└── frontend/
    └── src/
        ├── components/
        │   ├── flash-sale/
        │   │   └── FlashSaleList.jsx
        │   └── layout/
        │       └── MainLayout.jsx
        ├── pages/
        │   └── FlashSalePage.jsx
        ├── routes/
        │   └── AppRouter.jsx
        └── services/
            ├── axiosClient.js
            └── flashSale.service.js
```

Ghi chú nhanh:
- Component chính frontend: `frontend/src/components/flash-sale/FlashSaleList.jsx`
- Controller backend: `backend/flashsale/src/main/java/com/sapotest/flashsale/controllers/FlashSaleProductController.java`
- Service backend: `backend/flashsale/src/main/java/com/sapotest/flashsale/services/`

## 3. Cách chạy

### 3.1 Yêu cầu môi trường
- Java 17+
- Node.js 18+ (khuyến nghị)
- PostgreSQL
- npm

### 3.2 Chạy backend (Spring Boot)
1. Tạo database PostgreSQL, ví dụ: `flashsale_db`.
2. Mở file cấu hình: `backend/flashsale/src/main/resources/application.yaml`.
3. Cập nhật thông tin DB (`url`, `username`, `password`) của máy bạn (ở trong application mình mặc định là account là postgres và mật khẩu là 1).
4. Chạy backend:

```bash
cd backend/flashsale
./mvnw spring-boot:run
```

Backend mặc định chạy ở `http://localhost:8080`.

### 3.3 Chạy frontend (React + Vite)
1. Cài thư viện cần thiết:

```bash
cd frontend
npm install
```

2. Chạy môi trường dev:

```bash
npm run dev
```

Frontend mặc định chạy ở `http://localhost:5173`.

### 3.4 Build nhanh

Frontend:

```bash
cd frontend
npm run lint
npm run build
```

Backend (compile):

```bash
cd backend/flashsale
./mvnw -DskipTests compile
```
