from django.shortcuts import render
from food.models import Food

def home(req):
    if req.method == 'POST':
        list = req.POST
        Food.objects.create(name=list['name'], shelf=list['shelf'], quantity=list['quantity'], required=list['required'], consum=list['consum'], until=list['until'], category=list['category'])
        print('Backend!')
    all_items = Food.objects.all()
    context = {'all_items': all_items}
    return render(req, 'index.html', context)