from django.urls import path, include

import mainpage.views
from .views import (
    coupon_details,
    coupon_delete
)

urlpatterns = [
    path('signup', mainpage.views.signup, name = 'signup'),
    path('login', mainpage.views.login, name='login'),
    path('', mainpage.views.homepage, name = 'homepage'),
    path('logout', mainpage.views.logout, name='logout'),
    path('coupons/<int:id>/', coupon_details, name = 'coupon-details'),
    path('coupons/<int:id>/delete/', coupon_delete, name='coupon-delete'),
]