from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status, generics

from tutorials.models import Tutorial
from tutorials.serializers import TutorialSerializer





class TutorialList(generics.ListAPIView):
    queryset = Tutorial.objects.all();
    serializer_class = TutorialSerializer
    
    def get(self, request, *args, **kwargs):
        try:
            tutorial_data = self.get_queryset()
            title = request.GET.get('title',None)
            if title is not None:
                tutorials = tutorial_data.filter(title__icontains = title)
            else:
                return JsonResponse({'message':'That title do not exists'})
            final_serializer = self.serializer_class(tutorials, many=True)
            return JsonResponse(final_serializer.data,safe=False)
    
        except Exception as e:
            print(e)
            return JsonResponse({'message':'Something went wrong'})
    
    
    def post(self, request, *args, **kwargs):
        try:
            tutorial_incoming_data = JSONParser().parse(request)
            serializer = self.serializer_class(data = tutorial_incoming_data)
            if serializer.is_valid():
                serializer.save()
                final_tutorial_data = self.get_queryset()
                final_serializer = self.serializer_class(final_tutorial_data, many=True)
                return JsonResponse(final_serializer.data, status=status.HTTP_201_CREATED, safe=False)
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            return JsonResponse({'message':'Something went wrong'})
    
    
    def delete(self, request, *args, **kwargs):
        try:
            count = self.queryset.delete()
            return JsonResponse({'message':'{} Tutorials were deleted successfully!'.format(count[0])})
        
        except Exception as e:
            return JsonResponse({'message':'Something went wrong'})
