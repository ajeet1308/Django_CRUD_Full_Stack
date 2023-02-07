import json
from tutorials.redis_conn import redis_conn

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status, generics

from tutorials.models import Tutorial
from tutorials.serializers import TutorialSerializer



class TutorialDetail(generics.ListAPIView):
    queryset = Tutorial.objects.all()
    serializer_class = TutorialSerializer
    cache_key = 'tutorial_list_published'
    
    def get(self, request, *args, **kwargs):
        try:
            tutorial_data = self.queryset.get(pk=kwargs['pk'])
            serializer = self.serializer_class(tutorial_data)
            redis_conn.set(self.cache_key, json.dumps(serializer.data))
            return JsonResponse(serializer.data)
        except Tutorial.DoesNotExist:
            return JsonResponse({'message':'This article does not exist'})
        
        
    def delete(self, request, *args, **kwargs):
        try:
            
            tutorial_data = self.queryset.get(pk=kwargs['pk'])
            count = tutorial_data.delete()
            final_tutorial_data = self.get_queryset()
            serializer = self.serializer_class(final_tutorial_data, many=True)
            redis_conn.set(self.cache_key, json.dumps(serializer.data))
            return JsonResponse(serializer.data, safe=False)
        
        except Tutorial.DoesNotExist:
            
            return JsonResponse({'message':'This article does not exist'})
    
    def put(self, request, *args, **kwargs):
        try:
            
            tutorial_data = self.queryset.get(pk=kwargs['pk'])
            tutorial_incoming_data = JSONParser().parse(request)
            serializer = self.serializer_class(tutorial_data, data=tutorial_incoming_data)
            
            if serializer.is_valid():
                serializer.save()
                final_tutorial_data = self.get_queryset()
                final_serializer = self.serializer_class(final_tutorial_data, many=True)
                redis_conn.set(self.cache_key, json.dumps(final_serializer.data))
                return JsonResponse(final_serializer.data, safe=False)
            
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        except Tutorial.DoesNotExist:
            
            return JsonResponse({'message':'This article does not exist'})
