from django.db import models

class Nation(models.Model):
    name = models.CharField("Название народа", max_length=64, unique=True)
    slug = models.SlugField("Slug", unique=True, blank=True, null=True)
    description = models.TextField("Описание", default="Описание отсутствует")
    history = models.TextField("История", default="История отсутствует")
    culture = models.TextField("Культура", blank=True)
    language = models.CharField("Язык", max_length=64, blank=True)
    religion = models.CharField("Религия", max_length=64, blank=True)
    population = models.CharField("Численность", max_length=64, blank=True)
    position = models.JSONField("Координаты", default=list)
    def __str__(self):
        return self.name

class NationImage(models.Model):
    nation = models.ForeignKey(Nation, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to="nation_images/")