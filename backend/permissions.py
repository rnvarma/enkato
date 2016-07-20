from rest_framework import permissions


def make_owner_permission(user_field, instructor_field=None, instructor_edit_fields=None):
    """
    :param user_field: foreign key field to user
    :param instructor_field: foreign key path to get to an instructor for (optional) e.g. 'question.video.creator'
    :param instructor_edit_fields: fields that instructor can modify (optional, default none) e.g. ('endorsed',)
    :return: Permission class
    """

    class IsOwner(permissions.BasePermission):

        def has_object_permission(self, request, view, obj):

            if request.method in permissions.SAFE_METHODS:
                return True

            # check if is owner
            current_user = request.user.customuser
            if getattr(obj, user_field).id == current_user.id:
                return True

            # check if is instructor
            if instructor_field:
                if instructor_edit_fields and request.method == 'PATCH':
                    # if instructor fields are set, we ensure the request is only trying to modify them
                    if set(request.data).issubset(set(instructor_edit_fields)):
                        return reduce(getattr, instructor_field.split('.'), obj).id == current_user.id
                elif request.method == 'DELETE':
                    return reduce(getattr, instructor_field.split('.'), obj).id == current_user.id

            return False

    return IsOwner
