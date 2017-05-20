from django.db import models
from django.contrib.auth.models import User

from django_extensions.db.models import TimeStampedModel
from phonenumber_field.modelfields import PhoneNumberField

from utils.choices import APPOINTMENT_STATUS_CHOICES


class Shopper(TimeStampedModel):
    user = models.OneToOneField(User)
    phone_number = PhoneNumberField()
    image = models.ImageField(upload_to="photos/", blank=True, default="photos/default_photo.jpg")
    allergies = models.CharField(max_length=200, blank=True, null=True)
    brand_preferred = models.CharField(max_length=200, blank=True, null=True)
    instruction = models.TextField(blank=True, null=True)

    def __str__(self):
        return "{0}-{1}".format(self.user, self.phone_number)


class Registry(TimeStampedModel):
    shopper = models.ForeignKey("core.Shopper")
    service = models.ForeignKey("core.Service")

    class Meta:
        unique_together = (
            ('shopper', 'service')
        )

    def __str__(self):
        return "{0}-{1}".format(self.shopper, self.service)


class Appointment(TimeStampedModel):
    shopper = models.ForeignKey("core.Shopper")
    store = models.ForeignKey("core.Store")
    service = models.ForeignKey("core.Service")
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    status = models.CharField(max_length=15, choices=APPOINTMENT_STATUS_CHOICES, default="Under Process")
    hour_consumed = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return "{0}-{1}-{2}".format(self.shopper, self.store, self.service)


class AppointmentShip(TimeStampedModel):
    appointment = models.ForeignKey("core.Appointment")
    personal_assistant = models.ForeignKey("core.PersonalAssistant")
    status = models.CharField(max_length=15, choices=APPOINTMENT_STATUS_CHOICES, default="Under Process")
    remark = models.TextField()

    def __str__(self):
        return "{0}-{1}-{2}".format(self.appointment, self.personal_assistant, self.status)
