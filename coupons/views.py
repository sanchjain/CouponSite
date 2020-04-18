from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .models import Coupon
from django.utils import timezone
from .decorators import allowed_users


# Create your views here.
@login_required
@allowed_users(allowed_roles=['Company'])
def create(request):
    if request.method == "POST":
        if request.POST['title'] and request.POST['summary'] and request.POST['validity'] and request.POST['code']:
            coupon = Coupon()
            coupon.coupon_title = request.POST['title']
            coupon.coupon_summary = request.POST['summary']
            coupon.new_coupon_validity = request.POST['validity']
            coupon.coupon_code = request.POST['code']
            coupon.coupon_pubdate = timezone.datetime.now()
            coupon.coupon_user = request.user
            coupon.save()
            return redirect('homepage')
        else:
            return render(request, 'coupons/create.html', {'error': 'All fields are required.'})
    return render(request, 'coupons/create.html')

@login_required()
@allowed_users(allowed_roles=['Company'])
def mycoupons(request):
    current_user = request.user
    coupons = Coupon.objects.filter(coupon_user = current_user)
    return render(request, 'coupons/mycoupons.html', {'coupons': coupons})