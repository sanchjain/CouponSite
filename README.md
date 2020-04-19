Find the live version of the site here : http://34.67.108.253:8000/

<img width="1280" alt="Screen Shot 2020-04-18 at 11 37 27 PM" src="https://user-images.githubusercontent.com/54800651/79653188-86eb4380-81cf-11ea-8975-23f6d68bbed2.png">

To run this site locally:

1. Download the git repo
2. Run 'python3 -m venv myvenv' in terminal/command line
3. Run 'pip install -r requirements.txt' in terminal/command line
4. Run 'python3 manage.py runserver' and go to localhost:8000 or 127.0.0.1:8000 to view the site.


The site is simple coupon site. People can login as a User or Company.

A user can view coupon codes and share them with links. They cannot can create coupons or delete them unlike companies but can search for coupons by Company Name, Coupon Title and Coupon Description.

A company can create coupons and view thier coupons. They can also delete thier coupons. They get all user and company previliges.

There is a common login page where a company can select the option of acting as a company. Users are restricted from entering company urls with the help of decorators and hiding of links.

