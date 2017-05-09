from django.conf.urls import include, url
from rest_auth import views as rest_auth_views
from rest_framework.routers import DefaultRouter

from apps.api.views import *

router = DefaultRouter()

router.register('stores', StoreViewSet, base_name='store')
router.register('storesadmin', StoreAdminViewSet, base_name='store_admin')
router.register('services', ServiceViewSet, base_name='service')
router.register('roles', RoleViewSet, base_name='role')
router.register('skills', SkillViewSet, base_name='skill')
router.register('skillrolerelation', SkillRoleRelationViewSet, base_name='skill_role_relation')
router.register('personalassistents', PersonalAssistantViewSet, base_name='personal_assistant')
router.register('servicesubscriptions', ServiceSubscriptionViewSet, base_name='service_subscription')
router.register('rolesubscriptions', RoleSubscriptionViewSet, base_name='role_subscription')
router.register('storesubscriptions', StoreSubscriptionViewSet, base_name='store_subscription')
router.register('shoppers', ShopperViewSet, base_name='shopper')
router.register('appointments', AppointmentViewSet, base_name='appointment')
router.register('appointmentships', AppointmentShipViewSet, base_name='appointmentship')
router.register('registries', RegistryViewSet, base_name='registry')
router.register('users', UserViewSet, base_name='users')


urlpatterns = [
    url('^', include(router.urls)),
]

urlpatterns += [
    url(r'^login/$', rest_auth_views.LoginView.as_view(), name='login'),
    url(r'^logout/$', rest_auth_views.LogoutView.as_view(), name='logout'),
    url(r'^signup/$', SignUPView.as_view(), name='signup'),
    # Using default view but using custom serializer PasswordResetSerializer
    url(r'^password/reset/$', rest_auth_views.PasswordResetView.as_view(), name='password_reset'),
    # Using default view and serializer
    url(r'^password/reset/confirm/$', rest_auth_views.PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
]

