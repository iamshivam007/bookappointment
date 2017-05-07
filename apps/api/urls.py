from django.conf.urls import include, url

from rest_framework.routers import DefaultRouter
from rest_auth import views as rest_auth_views

from apps.api.views import StoreViewSet, SignUPView, UserViewSet

router = DefaultRouter()

router.register('stores', StoreViewSet, base_name='store')
router.register('users', UserViewSet, base_name='signup')


urlpatterns = [
    url('^', include(router.urls)),
]

urlpatterns += [
    url(r'^login/$', rest_auth_views.LoginView.as_view(), name='login'),
    url(r'^logout/$', rest_auth_views.LogoutView.as_view(), name='logout'),
    url(r'^signup/$', SignUPView.as_view(), name='signup'),
]
