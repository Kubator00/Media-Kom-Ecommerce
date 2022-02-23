export default {
    server: 'http://192.168.1.50:3010/',
    users: {
        login: 'users/login',
        account: 'users/myaccount',
        orders: 'users/orders',
        cart: 'users/cart',
    },
    orders: {
        new: 'orders/new',
        details: 'orders/details'
    },
    cart: {
        changeAmount: 'cart/editamount',
        add: 'cart/add',
    },
    admin: {
        allOrders: 'admin/allorders',
        newStatus: 'admin/order/newstatus',
        details: 'admin/orders/details'
    },
    search: 'search'

}