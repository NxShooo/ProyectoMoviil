from rest_framework import viewsets
from .serializer import usariosSerializer
from .models import Usuarios
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer



class usuarioViewSet(viewsets.ModelViewSet):
  queryset = Usuarios.objects.all()
  serializer_class = usariosSerializer


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Agrega información adicional al token, si lo deseas
        token['nomuser'] = user.nomuser
        return token

    def validate(self, attrs):
        # Puedes verificar cualquier lógica adicional antes de devolver el token
        data = super().validate(attrs)

        # Agrega cualquier información adicional al resultado de la validación
        data['nomuser'] = self.user.nomuser
        return data

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer 

