import base64
import binascii
import imghdr
import uuid

from django.utils import six
from django.core.files.base import ContentFile

from rest_framework.serializers import ImageField, ValidationError

from message import *


def values_from_queryset(object):
    return object.values()[0]

ALLOWED_IMAGE_TYPES = (
    "jpeg",
    "jpg",
    "png",
    "gif"
)


EMPTY_VALUES = (None, '', [], (), {})


class Base64ImageField(ImageField):

    def to_internal_value(self, base64_data):
        # Check if this is a base64 string
        if base64_data in EMPTY_VALUES:
            return None

        if isinstance(base64_data, six.string_types):
            # Strip base64 header.
            if ';base64,' in base64_data:
                header, base64_data = base64_data.split(';base64,')

            # Try to decode the file. Return validation error if it fails.
            try:
                decoded_file = base64.b64decode(base64_data)
            except (TypeError, binascii.Error):
                raise ValidationError(_(INVALID_IMAGE_ERROR_MSG))
            # Generate file name:
            file_name = str(uuid.uuid4())[:12]  # 12 characters are more than enough.
            # Get the file name extension:
            file_extension = self.get_file_extension(file_name, decoded_file)
            if file_extension not in ALLOWED_IMAGE_TYPES:
                raise ValidationError(_(INVALID_IMAGE_FORMAT_ERROR_MSG))
            complete_file_name = file_name + "." + file_extension
            data = ContentFile(decoded_file, name=complete_file_name)
            return super(Base64ImageField, self).to_internal_value(data)
        raise ValidationError(_(INVALID_IMAGE_ERROR_MSG))

    def get_file_extension(self, filename, decoded_file):
        extension = imghdr.what(filename, decoded_file)
        extension = "jpg" if extension == "jpeg" else extension
        return extension