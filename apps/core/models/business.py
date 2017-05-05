from django.db import models

from django_extensions.db.models import TimeStampedModel
from multiselectfield.db.fields import MultiSelectField

from utils.choices import *


class Store(TimeStampedModel):
    name = models.CharField(max_length=30)
    address = models.CharField(max_length=50)
    services = models.ManyToManyField("core.Service")
    buffer_time = models.IntegerField(default=30)
    opening_time = models.TimeField()
    closing_time = models.TimeField()
    working_days = MultiSelectField(choices=WEEK_DAYS_CHOICES)

    class Meta:
        unique_together = (
            ('name', 'address'),
        )

    def __str__(self):
        return "{0}-{1}".format(self.name, self.address)


class Service(TimeStampedModel):
    name = models.CharField(max_length=30, unique=True)
    price = models.IntegerField()
    time_duration = models.IntegerField()

    def __str__(self):
        return "{0}-{1}".format(self.name, self.price)


class Skill(TimeStampedModel):
    name = models.CharField(max_length=30, unique=True)


class Role(TimeStampedModel):
    name = models.CharField(max_length=30, unique=True)

    def __str__(self):
        return "{0}".format(self.name)


class SkillRoleRelation(TimeStampedModel):
    role = models.ForeignKey("core.Role")
    skill = models.ForeignKey("core.Skill")
    commission = models.IntegerField()

    class Meta:
        unique_together = (
            ('role', 'skill'),
        )

    def __str__(self):
        return "{0}-{1}-{2}".format(self.role, self.skill, self.commission)
