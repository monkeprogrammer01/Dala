from rest_framework import serializers
from nation.models import Nation, NationImage

class NationImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = NationImage
        fields = ["id", "image"]

class NationSerializer(serializers.ModelSerializer):
    images = NationImageSerializer(many=True, read_only=True)
    class Meta:
        model = Nation
        fields = "__all__"