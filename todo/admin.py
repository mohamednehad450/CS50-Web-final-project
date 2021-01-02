from django.contrib import admin
from todo.models import Todo, Step, Tag


class TodoAdmin(admin.ModelAdmin):
    list_display = ("title", "checked",
                    "tag_label", "date", "steps_count", "id")

    def tag_label(self, obj):
        return obj.tag.label

    def steps_count(self, obj):
        return obj.steps.count()


class TagAdmin(admin.ModelAdmin):
    list_display = ("label", "color", "id")


class StepAdmin(admin.ModelAdmin):
    list_display = ("title", "todo_title", "checked", "id")

    def todo_title(self, obj):
        return obj.todo.title


# Register your models here.
admin.site.register(Todo, TodoAdmin)
admin.site.register(Step, StepAdmin)
admin.site.register(Tag, TagAdmin)
