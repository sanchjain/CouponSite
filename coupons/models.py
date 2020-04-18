from django.db import models
from django.contrib.auth.models import User
from django.urls import reverse
from django.utils import timezone

# Create your models here.
class Coupon(models.Model):
    coupon_title = models.CharField(max_length=100)
    coupon_summary = models.TextField(max_length=400)
    coupon_pubdate = models.DateTimeField(default=timezone.now)
    new_coupon_validity = models.DateField(default = (timezone.now() + timezone.timedelta(days=1)))
    coupon_code = models.CharField(max_length=100, default = '-')
    coupon_user = models.ForeignKey(User, on_delete = models.CASCADE, null = True)

    def __str__(self):
        return self.coupon_title

    def get_absolute_url(self):
        return reverse("coupon-details", kwargs={"id": self.id})

    def get_delete_url(self):
        return reverse("coupon-delete", kwargs={"id": self.id})

    def pubdate(self):
        return self.coupon_pubdate.strftime('%b %e %Y')

    def code(self):
        return self.coupon_code
