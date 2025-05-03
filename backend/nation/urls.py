from django.urls import path
from nation.views import NationView, SelectedNationView

app_name = "nation"

urlpatterns = [
    path("", NationView.as_view(), name="nations"),
    path("<str:slug>/", SelectedNationView.as_view(), name="nation")
]