from django.shortcuts import render
from django.core.cache import cache

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status, generics

from tutorials.models import Tutorial
from tutorials.serializers import TutorialSerializer



class TutorialListPublished(generics.ListAPIView):
    queryset = Tutorial.objects.all()
    serializer_class = TutorialSerializer
    
    def get(self, request, *args, **kwargs):
        cache_key = "tutorial_list_published"
        cached_data = cache.get(cache_key)
        if cached_data:
            print("cached data")
            return JsonResponse(cached_data, safe=False)
        
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset,many=True)
        cache.set(cache_key, serializer.data)
        print("Data from database")
        return JsonResponse(serializer.data, safe=False)
