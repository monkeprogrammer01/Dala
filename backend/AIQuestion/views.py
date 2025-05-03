from django.shortcuts import render
import requests
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST
import os
from dotenv import load_dotenv
from rest_framework.views import APIView

load_dotenv()

class AIChatView(APIView):
    def post(self, request):
        question = request.data.get("question")
        nation_info = request.data.get("nation_info")
        if not question:
            return Response({"error": "No question provided"}, status=HTTP_400_BAD_REQUEST)
        url = "https://api.intelligence.io.solutions/api/v1/chat/completions"

        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {os.getenv("AI_SECURITY_KEY")}",

        }
        data = {
            "model": "deepseek-ai/DeepSeek-R1",
            "messages": [
                {
                    "role": "system",
                    "content": f"Ты — умный и лаконичный AI-помощник на сайте, посвящённом этническим народам мира. Пользователи могут задавать вопросы, связанные с конкретным народом, его историей, языком, культурой и традициями. Если вопрос не по теме, вежливо скажи, что можешь помочь только по народам. Вот информация о народе, которую нужно учитывать при ответе:\n{nation_info}"

                },
                {
                    "role": "user",
                    "content": question
                }
            ]
        }
        response = requests.post(url, headers=headers, json=data)
        text = response.json()["choices"][0]["message"]["content"]
        answer = text.split("</think>\n\n")[-1]
        return Response({"answer": answer})