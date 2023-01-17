
export const paymentStatus = {
    PAID: true,
    UNPAID: false,
}

export const deliveryStatus = {
    WAIT_PAYMENT: 'Menunggu Pembayaran',
    INIT: 'Penjual Sedang Menyiapkan Barang/Jasa',
    ON_DELIVERY: 'Pesanan Sedang Dalam Pengiriman',
    SUCCESS: 'Pesanan Sudah Diterima dan Success'
}

export const transactionsStatus = {
    INIT: 'I',
    SUCCESS: 'S',
    CANCELLED: 'C',
    EXPIRED: 'E',
    REFUND: 'R',
    IN_PROGRESS: 'IP'
}