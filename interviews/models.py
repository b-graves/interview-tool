from django.db import models
from django.contrib.auth.models import User

class Plan(models.Model):
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(User, related_name="plans", on_delete=models.CASCADE, null=True)
    duration = models.IntegerField(default=60)
    permitRecording = models.BooleanField(default=True)
    automaticRecording = models.BooleanField(default=False)
    biasReflection = models.BooleanField(default=False)
    view = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Group(models.Model):
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(User, related_name="component_groups", on_delete=models.CASCADE, null=True)
    plan = models.ForeignKey(Plan, related_name="component_groups", on_delete=models.CASCADE, null=True)
    color = models.IntegerField(default=0)

class Component(models.Model):
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(User, related_name="components", on_delete=models.CASCADE, null=True)
    plan = models.ForeignKey(Plan, related_name="components", on_delete=models.CASCADE, null=True)
    group = models.ForeignKey(Group, related_name="components", on_delete=models.CASCADE, null=True)
    priority = models.IntegerField(default=0)

class Participant(models.Model):
    name = models.CharField(max_length=1000)
    owner = models.ForeignKey(User, related_name="participants", on_delete=models.CASCADE, null=True)
    plan = models.ForeignKey(Plan, related_name="participants", on_delete=models.CASCADE, null=True)
    complete = models.BooleanField(default=False)
    duration = models.IntegerField(default=-1)

class Response(models.Model):
    owner = models.ForeignKey(User, related_name="responses", on_delete=models.CASCADE, null=True)
    participant = models.ForeignKey(Participant, related_name="responses", on_delete=models.CASCADE, null=True)
    component = models.ForeignKey(Component, related_name="responses", on_delete=models.CASCADE, null=True)
    link_note = models.IntegerField(default=None, null=True)
    moment = models.IntegerField(default=-1)
    linked = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Note(models.Model):
    text = models.TextField(default="", blank=True)
    owner = models.ForeignKey(User, related_name="notes", on_delete=models.CASCADE, null=True)
    participant = models.ForeignKey(Participant, related_name="notes", on_delete=models.CASCADE, null=True)
    response = models.ForeignKey(Response, related_name="notes", on_delete=models.CASCADE, null=True)
    moment = models.IntegerField(default=-1)
    level = models.IntegerField(default=0)
    order = models.FloatField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Recording(models.Model):
    blobURL = models.TextField()
    audio =  models.FileField(upload_to="audio", blank=True)
    owner = models.ForeignKey(User, related_name="recordings", on_delete=models.CASCADE, null=True)
    participant = models.ForeignKey(Participant, related_name="recordings", on_delete=models.CASCADE, null=True)
    start = models.IntegerField()
    stop = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class BiasDeclaration(models.Model):
    text = models.TextField(default="", blank=True)
    owner = models.ForeignKey(User, related_name="bias_declarations", on_delete=models.CASCADE, null=True)
    participant = models.ForeignKey(Participant, related_name="bias_declarations", on_delete=models.CASCADE, null=True)
    component = models.ForeignKey(Component, related_name="bias_declarations", on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class BiasReflection(models.Model):
    text = models.TextField(default="", blank=True)
    owner = models.ForeignKey(User, related_name="bias_reflections", on_delete=models.CASCADE, null=True)
    participant = models.ForeignKey(Participant, related_name="bias_reflections", on_delete=models.CASCADE, null=True)
    component = models.ForeignKey(Component, related_name="bias_reflections", on_delete=models.CASCADE, null=True)
    confirmed_expectations = models.IntegerField(default=None, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Theme(models.Model):
    name = models.CharField(max_length=1000)
    owner = models.ForeignKey(User, related_name="themes", on_delete=models.CASCADE, null=True)
    plan = models.ForeignKey(Plan, related_name="themes", on_delete=models.CASCADE, null=True)

class CodingType(models.Model):
    name = models.CharField(max_length=1000)
    owner = models.ForeignKey(User, related_name="coding_types", on_delete=models.CASCADE, null=True)
    plan = models.ForeignKey(Plan, related_name="coding_types", on_delete=models.CASCADE, null=True)
    theme = models.ForeignKey(Theme, related_name="coding_types", on_delete=models.CASCADE, null=True)

class Coding(models.Model):
    owner = models.ForeignKey(User, related_name="codings", on_delete=models.CASCADE, null=True)
    codingtype = models.ForeignKey(CodingType, related_name="codings", on_delete=models.CASCADE, null=True)
    response = models.ForeignKey(Response, related_name="codings", on_delete=models.CASCADE, null=True)

class DataTagType(models.Model):
    name = models.CharField(max_length=1000)

class DataTag(models.Model):
    name = models.CharField(max_length=1000)
    tag_type = models.ForeignKey(DataTagType, related_name="tags", on_delete=models.CASCADE, null=True)
    response = models.ForeignKey(Response, related_name="data_tags", on_delete=models.CASCADE, null=True)
