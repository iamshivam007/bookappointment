from django.contrib import admin

from apps.core.models import *


@admin.register(Shopper)
class ShopperAdmin(admin.ModelAdmin):
    list_display = [f.name for f in Shopper._meta.fields]


@admin.register(Registry)
class RegistryAdmin(admin.ModelAdmin):
    list_display = [f.name for f in Registry._meta.fields]


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = [f.name for f in Appointment._meta.fields]


@admin.register(AppointmentShip)
class AppointmentShip(admin.ModelAdmin):
    list_display = [f.name for f in AppointmentShip._meta.fields]


@admin.register(StoreAdmin)
class StoreAdminAdmin(admin.ModelAdmin):
    list_display = [f.name for f in StoreAdmin._meta.fields]


@admin.register(PersonalAssistant)
class PersonalAssistantAdmin(admin.ModelAdmin):
    list_display = [f.name for f in PersonalAssistant._meta.fields]


@admin.register(Store)
class StoreAdmin(admin.ModelAdmin):
    list_display = [f.name for f in Store._meta.fields]
