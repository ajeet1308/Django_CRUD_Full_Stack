from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status, generics

from tutorials.models import Tutorial
from tutorials.serializers import TutorialSerializer
from rest_framework.decorators import api_view

# Create your views here.






# @api_view(['GET','POST','DELETE'])
# def tutorial_list(request):
#     #GET list of tutorials,POST a new tutorials, DELETE all tutorials
#     try:
        
#         if request.method == 'POST':
#             tutorial_data = JSONParser().parse(request)
#             tutorial_serializer = TutorialSerializer(data = tutorial_data)
#             if tutorial_serializer.is_valid():
#                 tutorial_serializer.save()
#                 temp_tutorial_data = Tutorial.objects.all();
#                 temp_tutorial_data_serializer = TutorialSerializer(temp_tutorial_data,many=True);
#                 return JsonResponse(temp_tutorial_data_serializer.data,status=status.HTTP_201_CREATED,safe=False)
#             return JsonResponse(tutorial_serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        
        
#         elif request.method == 'GET':
#             tutorial_data = Tutorial.objects.all()
            
#             title = request.GET.get('title',None)
#             if title is not None:
#                 tutorials = tutorial_data.filter(title__icontains = title)
#             else:
#                 return JsonResponse({'message':'That title do not exists'})
                
#             tutorials_serializer = TutorialSerializer(tutorials,many=True)
#             return JsonResponse(tutorials_serializer.data,safe=False)
        
        
#         elif request.method == 'DELETE':
#             count = Tutorial.objects.all().delete()
#             return JsonResponse({'message':'{} Tutorials were deleted successfully!'.format(count[0])})
    
#     except Exception as e:
#         return JsonResponse({'message':'Something went wrong'})
        
    
    
    
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
        
            



# @api_view(['GET','PUT','DELETE'])
# def tutorial_detail(request,pk):
#     # find tutorial by pk (id)
#     try:
#         tutorial_data = Tutorial.objects.get(pk=pk)
        
#         if request.method == 'GET':
#             tutorial_serializer = TutorialSerializer(tutorial_data)
#             return JsonResponse(tutorial_serializer.data)
        
#         elif request.method == 'DELETE':
#             count = tutorial_data.delete()
#             temp_tutorial_data = Tutorial.objects.all()
#             temp_tutorials_serializer = TutorialSerializer(temp_tutorial_data,many=True)
#             return JsonResponse(temp_tutorials_serializer.data,safe=False)
        
#         elif request.method == 'PUT':
#             tutorial_incoming_data = JSONParser().parse(request)
#             tutorial_serializer = TutorialSerializer(tutorial_data,data=tutorial_incoming_data)
#             if tutorial_serializer.is_valid():
#                 tutorial_serializer.save()
#                 temp_tutorial_data = Tutorial.objects.all()
#                 temp_tutorials_serializer = TutorialSerializer(temp_tutorial_data,many=True)
#                 return JsonResponse(temp_tutorials_serializer.data,safe=False,status=status.HTTP_201_CREATED)
#             return JsonResponse(tutorial_serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
#     except Tutorial.DoesNotExist:
#         return JsonResponse({'message':'The tutorial does not exist'})
    
    

class TutorialDetail(generics.ListAPIView):
    queryset = Tutorial.objects.all()
    serializer_class = TutorialSerializer
    
    
    def get(self, request, *args, **kwargs):
        try:
            tutorial_data = self.queryset.get(pk=kwargs['pk'])
            serializer = self.serializer_class(tutorial_data)
            return JsonResponse(serializer.data)
        except Tutorial.DoesNotExist:
            return JsonResponse({'message':'This article does not exist'})
        
        
    def delete(self, request, *args, **kwargs):
        try:
            
            tutorial_data = self.queryset.get(pk=kwargs['pk'])
            count = tutorial_data.delete()
            final_tutorial_data = self.get_queryset()
            serializer = self.serializer_class(final_tutorial_data, many=True)
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
                return JsonResponse(final_serializer.data, safe=False)
            
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        except Tutorial.DoesNotExist:
            
            return JsonResponse({'message':'This article does not exist'})
    
    
        






# @api_view(['GET'])
# def tutorial_list_published(request):
#     # GET all published tutorials
#     tutorial_data = Tutorial.objects.all()
#     tutorial_serializer = TutorialSerializer(tutorial_data,many=True)
#     return JsonResponse(tutorial_serializer.data,safe=False)

class TutorialListPublished(generics.ListAPIView):
    queryset = Tutorial.objects.all()
    serializer_class = TutorialSerializer
    
    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset,many=True)
        return JsonResponse(serializer.data, safe=False)
    