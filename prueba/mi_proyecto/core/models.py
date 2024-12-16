from django.db import models

# Create your models here.

class  Usuarios (models.Model):
    nomcompleto = models.CharField(max_length=100)
    nomuser = models.CharField(max_length=100)
    password= models.CharField(max_length=60)
    correo = models.CharField(max_length=100)
    newpassword = models.CharField(max_length=150)