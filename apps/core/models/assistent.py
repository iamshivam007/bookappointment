from django.db import models
from django.contrib.auth.models import User

from django_extensions.db.models import TimeStampedModel
from phonenumber_field.modelfields import PhoneNumberField
from multiselectfield.db.fields import MultiSelectField
from django.utils.encoding import python_2_unicode_compatible


from utils.choices import *


@python_2_unicode_compatible
class PersonalAssistant(TimeStampedModel):
    user = models.OneToOneField(User)
    phone_number = PhoneNumberField()
    image = models.ImageField(upload_to="photos/", blank=True, default="photos/default_photo.jpg")
    available_days = MultiSelectField(choices=WEEK_DAYS_CHOICES, blank=True, null=True)
    start_time = models.TimeField(blank=True, null=True)
    end_time = models.TimeField(blank=True, null=True)

    def __str__(self):
        return "{0}-{1}".format(self.user, self.phone_number)


@python_2_unicode_compatible
class ServiceSubscription(TimeStampedModel):
    personal_assistant = models.ForeignKey("core.PersonalAssistant")
    service = models.ForeignKey("core.Service")
    is_approved = models.BooleanField(default=False)

    class Meta:
        unique_together = (
            ('personal_assistant', 'service'),
        )

    def __str__(self):
        return "{0}-{1}-{2}".format(self.personal_assistant, self.service, self.is_approved)


@python_2_unicode_compatible
class RoleSubscription(TimeStampedModel):
    personal_assistant = models.ForeignKey("core.PersonalAssistant")
    role = models.ForeignKey("core.Role")
    is_approved = models.BooleanField(default=False)

    class Meta:
        unique_together = (
            ('personal_assistant', 'role'),
        )

    def __str__(self):
        return "{0}-{1}-{2}".format(self.personal_assistant, self.role, self.is_approved)


class StoreSubscription(TimeStampedModel):
    personal_assistant = models.ForeignKey("core.PersonalAssistant")
    store = models.ForeignKey("core.Store")
    is_approved = models.BooleanField(default=False)

    class Meta:
        unique_together = (
            ('personal_assistant', 'store'),
        )

    def __str__(self):
        return "{0}-{1}-{2}".format(self.personal_assistant, self.store, self.is_approved)
