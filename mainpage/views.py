import urllib.parse
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.models import User, Group
from django.contrib import auth
from coupons.models import Coupon
from django.db.models import Q


def homepage(request):
    coupons = Coupon.objects.all()
    query = request.GET.get("q")
    if query:
        coupons = coupons.filter(
            Q(coupon_title__icontains=query)|
            Q(coupon_user__username__icontains=query)|
            Q(coupon_summary__icontains=query)
        ).distinct()
    return render(request, 'mainpage/home.html', {'coupons': coupons})


def signup(request):
    if request.method == 'POST':
        if request.POST['dropdown'] == "Company":
            try:
                user = User.objects.get(username=request.POST['name'])
                return render(request, 'mainpage/signup.html', {'error':'Company has already been registered'})
            except User.DoesNotExist:
                user = User.objects.create_user(request.POST['name'], password=request.POST['pwd1'])
                group = Group.objects.get(name = "Company")
                user.groups.add(group)
                auth.login(request, user)
                return redirect('mycoupons')

        else:
            try:
                user = User.objects.get(username=request.POST['name'])
                return render(request, 'mainpage/signup.html', {'error':'Please select a different username'})
            except User.DoesNotExist:
                user = User.objects.create_user(request.POST['name'], password=request.POST['pwd1'])
                group = Group.objects.get(name = "User")
                user.groups.add(group)
                auth.login(request, user)
                return redirect('homepage')

    else:
        return render(request, 'mainpage/signup.html')


def login(request):
    if request.method == 'POST':
        user = auth.authenticate(username=request.POST['username'], password=request.POST['password'])
        if user is not None:
            auth.login(request, user)
            if request.user.groups == "Company":
                return redirect('mycoupons')
            else:
                return redirect('homepage')
        else:
            return render(request, 'mainpage/login.html', {'error': 'incorrect username and password'})

    else:
        return render(request, 'mainpage/login.html')


def logout(request):
    if request.method == "POST":
        auth.logout(request)
        return redirect('homepage')


def coupon_details(request, id):
    obj = get_object_or_404(Coupon, id=id)
    return render(request, 'mainpage/coupon_detail.html', {'object': obj})


def coupon_delete(request, id):
    obj = get_object_or_404(Coupon, id=id)
    if request.method == "POST":
        obj.delete()
        return redirect('mycoupons')
    context = {"object": obj}
    return render(request, "mainpage/coupon_delete.html", context)