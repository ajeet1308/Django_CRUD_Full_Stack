import json
from tutorials.redis_conn import redis_conn

from django.http.response import JsonResponse
from rest_framework import generics

from tutorials.models import Tutorial
from tutorials.serializers import TutorialSerializer

class TutorialListPublished(generics.ListAPIView):
    queryset = Tutorial.objects.all()
    serializer_class = TutorialSerializer
    cache_key = "tutorial_list_published"
    
    def get(self, request, *args, **kwargs):
        cached_data = redis_conn.get(self.cache_key)
        if cached_data:
            print("cached data")
            return JsonResponse(json.loads(cached_data), safe=False)
        
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset,many=True)
        redis_conn.set(self.cache_key,json.dumps(serializer.data))
        print("Data from database")
        return JsonResponse(serializer.data, safe=False)
