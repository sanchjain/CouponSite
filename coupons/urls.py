from django.urls import path, include

import coupons.views

urlpatterns = [
    path('createcoupon', coupons.views.create, name = 'create'),
    path('mycoupons', coupons.views.mycoupons, name = 'mycoupons')
]