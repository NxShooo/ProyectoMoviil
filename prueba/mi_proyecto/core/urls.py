
from django.urls import path , include
from core import views
from rest_framework import routers
from .views import CustomTokenObtainPairView



routers = routers.DefaultRouter()
routers.register(r'Usuarios',views.usuarioViewSet)

urlpatterns = [
    path('',include(routers.urls)),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
]


