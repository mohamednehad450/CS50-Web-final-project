from django.contrib import admin
from todo.models import Todo, Step, Tag


class TodoAdmin(admin.ModelAdmin):
    list_display = ("user", "title", "checked",
                    "tag_label", "date", "steps_count", "id")

    def tag_label(self, obj):
        if obj.tag:
            return obj.tag.label
        else:
            return None

    def steps_count(self, obj):
        return obj.steps.count()


class TagAdmin(admin.ModelAdmin):
    list_display = ("label", "user", "color", "id")


class StepAdmin(admin.ModelAdmin):
    list_display = ("title", "todo_title", "checked", "id")

    def todo_title(self, obj):
        return obj.todo.title


# Register your models here.
admin.site.register(Todo, TodoAdmin)
admin.site.register(Step, StepAdmin)
admin.site.register(Tag, TagAdmin)
