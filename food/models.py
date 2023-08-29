from django.db import models

# Create your models here.
class Food(models.Model):
    name = models.CharField(max_length=200)
    shelf = models.CharField(max_length=200)
    quantity = models.DecimalField(default=0, decimal_places=0, max_digits=256)
    required = models.DecimalField(default=0, decimal_places=0, max_digits=256)
    consum = models.FloatField(default=0)
    until = models.FloatField(default=0)
    category = models.CharField(max_length=200)

    def __str__(self):
        return self.name