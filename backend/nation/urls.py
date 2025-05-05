from django.urls import path
from nation.views import NationView, SelectedNationView, SuggestionView

app_name = "nation"

urlpatterns = [
    path("", NationView.as_view(), name="nations"),
    path("<str:slug>/", SelectedNationView.as_view(), name="nation"),
    path("add", SuggestionView.as_view(), name="add_opinion")
]