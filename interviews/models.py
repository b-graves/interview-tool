from django.db import models
from django.contrib.auth.models import User

class Plan(models.Model):
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(User, related_name="plans", on_delete=models.CASCADE, null=True)
    duration = models.IntegerField(default=60)

class Component(models.Model):
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(User, related_name="components", on_delete=models.CASCADE, null=True)
    plan = models.ForeignKey(Plan, related_name="components", on_delete=models.CASCADE, null=True)
    color = models.IntegerField(default=0)

class Participant(models.Model):
    name = models.CharField(max_length=1000)
    owner = models.ForeignKey(User, related_name="participants", on_delete=models.CASCADE, null=True)
    plan = models.ForeignKey(Plan, related_name="participants", on_delete=models.CASCADE, null=True)

class Response(models.Model):
    name = models.CharField(max_length=10000)
    interview = models.ForeignKey(Participant, related_name="responses", on_delete=models.CASCADE, null=True)
    component = models.ForeignKey(Component, related_name="responses", on_delete=models.CASCADE, null=True)

class BiasDeclaration(models.Model):
    name = models.CharField(max_length=10000)
    interview = models.ForeignKey(Participant, related_name="bias_declarations", on_delete=models.CASCADE, null=True)
    component = models.ForeignKey(Component, related_name="bias_declarations", on_delete=models.CASCADE, null=True)

class BiasReflection(models.Model):
    name = models.CharField(max_length=10000)
    interview = models.ForeignKey(Participant, related_name="bias_reflections", on_delete=models.CASCADE, null=True)
    component = models.ForeignKey(Component, related_name="bias_reflections", on_delete=models.CASCADE, null=True)

class InsightTagType(models.Model):
    name = models.CharField(max_length=1000)
    plan = models.ForeignKey(Plan, related_name="insight_tag_types", on_delete=models.CASCADE, null=True)

class InsightTag(models.Model):
    name = models.CharField(max_length=1000)
    tag_type = models.ForeignKey(InsightTagType, related_name="tags", on_delete=models.CASCADE, null=True)
    response = models.ForeignKey(Response, related_name="insight_tags", on_delete=models.CASCADE, null=True)

class DataTagType(models.Model):
    name = models.CharField(max_length=1000)

class DataTag(models.Model):
    name = models.CharField(max_length=1000)
    tag_type = models.ForeignKey(DataTagType, related_name="tags", on_delete=models.CASCADE, null=True)
    response = models.ForeignKey(Response, related_name="data_tags", on_delete=models.CASCADE, null=True)
