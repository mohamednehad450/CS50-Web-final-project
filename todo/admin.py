from django.contrib import admin
from todo.models import Todo, Step, Tag, PomodoroInterval, Habit, HabitEntry


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


class PomodoroIntervalAdmin(admin.ModelAdmin):
    list_display = ("user", "todo_title", "startDate",
                    "endDate", "defaultDuration")

    def todo_title(self, obj):
        if obj.todo:
            return obj.todo.title
        else:
            return None


# Register your models here.
admin.site.register(Todo, TodoAdmin)
admin.site.register(Step, StepAdmin)
admin.site.register(Tag, TagAdmin)
admin.site.register(PomodoroInterval, PomodoroIntervalAdmin)
admin.site.register(HabitEntry)
admin.site.register(Habit)
