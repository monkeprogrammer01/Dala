from django.urls import path, include

from AIQuestion.views import AIChatView

app_name="aiChat"
urlpatterns = [
    path("ask", AIChatView.as_view(), name="ask")
]