export default {
    server: 'http://localhost:3010/',
    users: {
        login: 'users/login',
        register: 'users/register',
        token: 'users/token',
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
    search: 'search',
    delivery: {
        types: 'delivery/types',
    }

}