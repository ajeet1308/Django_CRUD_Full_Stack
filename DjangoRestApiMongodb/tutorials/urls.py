from django.urls import path
from . import views

urlpatterns = [
    path('api/tutorials',views.TutorialList.as_view(), name='tutorial-list'),
    path('api/tutorials/<int:pk>',views.TutorialDetail.as_view(), name='tutorial-detail'),
    # path('api/tutorials/published',views.tutorial_list_published),
    path('api/tutorials/published',views.TutorialListPublished.as_view(),name='tutorial-list-published'),
]
