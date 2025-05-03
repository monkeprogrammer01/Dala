from tracemalloc import get_object_traceback

from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from nation.models import Nation

from nation.serializers import NationSerializer


class NationView(APIView):
    def get(self, request):
        nations = Nation.objects.all()
        serializer = NationSerializer(nations, many=True)
        return Response(serializer.data)

class SelectedNationView(APIView):
    def get(self, request, slug):
        nation = get_object_or_404(Nation, slug=slug)
        serializer = NationSerializer(nation)
        return Response(serializer.data)