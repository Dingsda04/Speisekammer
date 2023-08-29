from django.shortcuts import render
from food.models import Food

def home(req):
    all_items = Food.objects.all()
    context = {'all_items': all_items}
    for row in context['all_items']:
        print(row.name)
    return render(req, 'index.html', context)