// rbac.js - Role-Based Access Control for Advertisement App
export const permissions = [
    {
        role: 'user',
        actions: [
            'get_profile',
            'update_profile',
            'view_adverts',        // Ability to view adverts
            'contact_vendor'       // Ability to contact vendors
        ]
    },
    {
        role: 'vendor',
        actions: [
            'get_profile',
            'update_profile',
            'add_advert',           // Ability to add a new advert
            'update_advert',        // Ability to update their own adverts
            'delete_advert',        // Ability to delete their own adverts
            'view_adverts',         // Ability to view all adverts
            'manage_own_adverts'    // Manage adverts posted by the vendor
        ]
    }
]