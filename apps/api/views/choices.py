from rest_framework.viewsets import GenericViewSet
from rest_framework.decorators import list_route
from rest_framework.response import Response

from utils.choices import WEEK_DAYS_CHOICES


class ChoicesViewSet(GenericViewSet):

    @list_route(methods=("GET",))
    def days_choices(self, request, *args, **kwargs):
        __response__ = []
        for key, value in WEEK_DAYS_CHOICES:
            __response__.append({'key': key, 'value': value})
        return Response({'choices': __response__})
