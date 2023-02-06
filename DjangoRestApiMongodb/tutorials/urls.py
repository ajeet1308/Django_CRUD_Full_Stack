from django.urls import path
from tutorials.views1 import tutorialList, tutorialDetail, tutorialListPublished

urlpatterns = [
    path('api/tutorials',tutorialList.TutorialList.as_view(), name='tutorial-list'),
    path('api/tutorials/<int:pk>',tutorialDetail.TutorialDetail.as_view(), name='tutorial-detail'),
    # path('api/tutorials/published',views.tutorial_list_published),
    path('api/tutorials/published',tutorialListPublished.TutorialListPublished.as_view(),name='tutorial-list-published'),
]
