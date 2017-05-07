from rest_framework.routers import DefaultRouter
from django.conf.urls import include, url

from apps.api.views import StoreViewSet

router = DefaultRouter()

router.register('stores', StoreViewSet, base_name='store')


urlpatterns = [
    url('^', include(router.urls)),
]