
from django.conf.urls import url, include
from django.contrib import admin
from django.views.static import serve
from django.conf import settings

from utils.views import IndexView, TPLView


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/', include('apps.api.urls'))
]


# Templates View
urlpatterns += [
    url(r'^$', IndexView.as_view()),
    url(r'^tpl/(?P<tpl_name>.*)', TPLView.as_view()),
    url(r'^', include('django.contrib.auth.urls')),
]

urlpatterns += [
    url(
        r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}
    ),
]
