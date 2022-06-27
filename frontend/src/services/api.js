export default {
    server: 'http://localhost:3010/',
    users: {
        login: 'users/login',
        register: 'users/register',
        token: 'users/token',
        orders: 'users/orders',
        cart: 'users/cart',
        account: 'users/account',
        change: {
            email: 'users/change/email',
            password: 'users/change/password',
        }
    },
    orders: {
        new: 'orders/new',
        details: 'orders/details'

    },
    cart: {
        changeAmount: 'cart/edit',
        add: 'cart/add',
    },
    admin: {
        allOrders: 'admin/order/all',
        newStatus: 'admin/order/status',
        details: 'admin/order/details',
        addProduct: 'admin/product/add',
        deleteProduct: 'admin/product/delete',
        editProduct: 'admin/product/edit',
    },
    search: 'search',
    delivery: {
        types: 'delivery/types',
    },
    products: {
        details: 'products/details',
        recommended: 'products/recommended'
    }

}