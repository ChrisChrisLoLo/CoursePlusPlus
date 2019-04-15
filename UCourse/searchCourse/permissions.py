from rest_framework import permissions

class IsOwner(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to access the object
    """
    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user